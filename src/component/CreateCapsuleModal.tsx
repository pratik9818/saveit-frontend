import { useRecoilState, useSetRecoilState } from "recoil";
import { alertState, capsulesStore, isAlert, isCreateCapsuleModalOpen } from "../recoil/Store";
import { useState } from "react";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";

export default function CreateCapsuleModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isCreateCapsuleModalOpen
  );
  const setIsalert = useSetRecoilState(isAlert)
  const setAlertState = useSetRecoilState(alertState)
  const [inputState, setInputState] = useState<string>("");
  const [capsulesState,setCapsulesState] = useRecoilState(capsulesStore)
  function hidemodal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "modal") setIsModalOpen(false);
  }
  function inputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }
  async function saveNewCapsule() {
    if (!inputState.length) {
      
      setIsalert(true);
      setAlertState({
        color:errorRed,
        alertName:'Please type capsule name',
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
      const newcapsule = {
        capsule_id:result.data.capsule_id,
        user_id:'null', //it should not here that is in client side ----ALERT
        capsule_name:inputState,
        capsule_size:0,
        created_at:new Date(), //it is not coming in utc 
        updated_at:new Date().toUTCString(),
        is_deleted:false
      }
      setCapsulesState([newcapsule,...capsulesState])
      setIsModalOpen(false)
      setInputState("")
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
