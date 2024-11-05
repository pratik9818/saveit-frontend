import { useRecoilState, useSetRecoilState } from "recoil";
import { alertState, isAlert, isCreateCapsuleModalOpen } from "../recoil/Store";
import { useState } from "react";
import { API_VERSION, DOMAIN, errorRed, minCapsulesNameLength, successGreen } from "../utils/Constant";
import axios from "axios";

export default function CreateCapsuleModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isCreateCapsuleModalOpen
  );
  const setIsalert = useSetRecoilState(isAlert)
  const setAlertState = useSetRecoilState(alertState)
  const [inputState, setInputState] = useState<string>("");
  function hidemodal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "modal") setIsModalOpen(false);
  }
  function inputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }
  async function saveNewCapsule() {
    if (!inputState || inputState.length <= minCapsulesNameLength) {
      
      setIsalert(true);
      setAlertState({
        color:errorRed,
        alertName:'Capsule name is not persent or capule name less then 2 words',
        time:4000
      })
      return
    }
    
   try {
    const res = await axios.post(
      `${DOMAIN}/api/${API_VERSION}/capsules`,
      {
        capsuleName: inputState,
      },
      {
        withCredentials: true,
      }
    );
    const result = await res;
    if(result.status === 201){
      setIsalert(true);
      setAlertState({
        color:successGreen,
        alertName:result.data.message,
        time:2000
      })
    }else{
      setIsalert(true);
      setAlertState({
        color:errorRed,
        alertName:'Something went wrong please try again',
        time:2000
      })
    }
   } catch (error) {
    console.log(error);
    
    setIsalert(true);
      setAlertState({
        color:errorRed,
        alertName:'Something went wrong please try again',
        time:2000
      })
   }
  }
  return (
    isModalOpen && (
      <div
        className="border-2 bg-transparent absolute h-[100vh] w-[100vw] flex justify-center items-center"
        onClick={(e) => hidemodal(e)}
        id="modal"
      >
        <div>
          <input
            type="text"
            className="border"
            onChange={(e) => inputValueChange(e)}
            value={inputState}
          />
          <button onClick={saveNewCapsule}>create</button>
        </div>
      </div>
    )
  );
}
