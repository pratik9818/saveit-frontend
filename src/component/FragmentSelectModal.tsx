import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeCapsule,
  fragmentStore,
  selectedFragment,
} from "../recoil/Store";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useState } from "react";
import useAlertFunction from "../hooks/AlertFunction";

export default function FragmentSelectModal() {
    const [selectedFragmentValue, setSelectedFragment] = useRecoilState(selectedFragment);
  const setFragmentStore = useSetRecoilState(fragmentStore);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const activeCapsuleId = useRecoilValue(activeCapsule);
  const AlertFunction = useAlertFunction();
  async function deleteFragment() {
    setIsDelete(true);
    try {
      const {
        status,
        data: { message },
      } = await axios.delete(`${DOMAIN}/api/${API_VERSION}/fragments`, {
        data: {
          fragmentIds: selectedFragmentValue.map(
            (fragment) => fragment.fragment_id
          ),
          capsuleId: activeCapsuleId,
        },
        withCredentials: true,
      });
      if (status == 200) {
        const selectedIds = new Set(
          selectedFragmentValue.map((f) => f.fragment_id)
        );

        setFragmentStore((prevState) =>
          prevState.filter((fragment) => !selectedIds.has(fragment.fragment_id))
        );

        setSelectedFragment([]);
        AlertFunction(true, successGreen, message, 1000);
        setIsDelete(false);
      }
    } catch (error) {
      setIsDelete(false);
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;
        if (status == 500) {
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            3000
          );
          return;
        } else if (message == "Network Error") {
          AlertFunction(true, errorRed, "No Internet", 2000);
          return;
        }
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }
  function cancel(){
    setSelectedFragment([])
  }
  return selectedFragmentValue.length ? (
    <div className="absolute top-20 md:top-12 z-10 border bg-red-200 rounded-md w-[90%] mx-[5%] md:w-[50%] md:mx-[35%] h-12 flex justify-between items-center">
      <div className="w-24 flex justify-between">
        <span className="ml-3 font-bold text-xl">
          {selectedFragmentValue.length}
        </span>
        <button className="bg-red-500 p-1 rounded-md w-16" onClick={deleteFragment}>
          {isDelete ? "Deleting" : "Delete"}
        </button>
      </div>
      <button className="bg-white p-1 rounded-md w-16 mr-3" onClick={cancel}>Cancel</button>
    </div>
  ) : (
    ""
  );
}
