import { useRecoilState, useSetRecoilState } from "recoil";
import { activeCapsule, capsuleActionModalId, capsulesStore } from "../recoil/Store";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useState } from "react";
import useAlertFunction from "../hooks/AlertFunction";

export default function CapsuleDelete() {
  const setCapsulesState = useSetRecoilState(capsulesStore);
  // const capsuleActionModalIdValue = useRecoilValue(capsuleActionModalId)
  const [activeCapsuleValue,setActiveCapsule] = useRecoilState(activeCapsule);
  const [capsuleActionModalIdValue, setCapsuleActionModalId] =
    useRecoilState(capsuleActionModalId);
  const AlertFunction = useAlertFunction();
  const [loading, setLoading] = useState(false);

  async function deletecapsule() {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if(!confirmed)return
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
        const isthisActiveCapulse = capsuleActionModalIdValue == activeCapsuleValue
        if(isthisActiveCapulse){
          setActiveCapsule(null)
        }
        AlertFunction(true, successGreen, "Deleted", 1000);
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
            2000
          );
          return;
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 2000);
          return
        }
        AlertFunction(true, errorRed, response?.data.message, 1000);
      }
    }
  }
  return (
    <button className="bg-gray-200 p-[4px] rounded-md w-[90%]" onClick={deletecapsule}>
      {!loading ? "Delete" : "Deleting.."}
    </button>
  );
}
