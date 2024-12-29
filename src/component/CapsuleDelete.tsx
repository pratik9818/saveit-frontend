import { useRecoilState, useSetRecoilState } from "recoil";
import { capsuleActionModalId, capsulesStore } from "../recoil/Store";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useState } from "react";
import useAlertFunction from "../hooks/AlertFunction";

export default function CapsuleDelete() {
  const setCapsulesState = useSetRecoilState(capsulesStore);
  // const capsuleActionModalIdValue = useRecoilValue(capsuleActionModalId)
  const [capsuleActionModalIdValue, setCapsuleActionModalId] =
    useRecoilState(capsuleActionModalId);
  const AlertFunction = useAlertFunction();
  const [loading, setLoading] = useState(false);

  async function deletecapsule() {
    setLoading(true);
    try {
      const res = await axios.delete(`${DOMAIN}/api/${API_VERSION}/capsules`, {
        data: {
          capsuleIds: [capsuleActionModalIdValue],
        },
        withCredentials: true,
      });
      console.log(res);
      const { status } = res;
      if (status === 200) {
        setCapsuleActionModalId(null);
        setCapsulesState((prevState) =>
          prevState.filter(
            (capsule) => capsule.capsule_id !== capsuleActionModalIdValue
          )
        );
        AlertFunction(true, successGreen, "Deleted", 2000);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        const { status, response ,message} = error;
        if (status == 500) {
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            3000
          );
          return;
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
        AlertFunction(true, errorRed, response?.data.message, 3000);
      }
    }
  }
  return (
    <button className="bg-gray-300 p-[4px] rounded-sm w-[90%] absolute top-0" onClick={deletecapsule}>
      {!loading ? "Delete" : "Deleting.."}
    </button>
  );
}
