import { useRecoilState } from "recoil";
import { capsulesStore, isCreateCapsuleModalOpen } from "../recoil/Store";
import { useState } from "react";
import { API_VERSION, buttonBg, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import Loader from "./Loader";

export default function CreateCapsuleModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isCreateCapsuleModalOpen
  );
  const AlertFunction = useAlertFunction()
  const [inputState, setInputState] = useState<string>("");
  const [capsulesState,setCapsulesState] = useRecoilState(capsulesStore)
  const [isLoading , setIsLoading] = useState<boolean>(false)
  function hidemodal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "modal") setIsModalOpen(false);
  }
  function inputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }
  async function saveNewCapsule() {
    if (!inputState.length) {
      AlertFunction(true,errorRed,'Please type capsule name',4000)
      return
    }
    
   try {
    setIsLoading(true)
    const {data,status} = await axios.post(
      `${DOMAIN}/api/${API_VERSION}/capsules`,
      {
        capsuleName: inputState,
      },
      {
        withCredentials: true,
      }
    );
    
    if(status === 201){
      const newcapsule = {
        capsule_id:data.capsule_id,
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
      setIsLoading(false)
      AlertFunction(true,successGreen,data.message,1000)
    }
   } catch (error) {
    setIsLoading(false)
    if(axios.isAxiosError(error)){
      const {status,response,message} = error
      if(status == 500){
        AlertFunction(true,errorRed,'Something went wrong ! please try again',2000)
        return
      }else if(message == 'Network Error'){
        AlertFunction(true, errorRed, 'No Internet',2000);
        return
      }
        AlertFunction(true,errorRed,response?.data?.message,1000)
     }
   }
  }
  return (
    isModalOpen && (
      <div
        className="bg-transparent absolute h-[100vh] w-[100vw] flex justify-center items-center"
        onClick={(e) => hidemodal(e)}
        id="modal"
      >
        <div className="flex border h-[180px] bg-white items-center px-6 rounded-lg flex-col">
          <h1 className="font-bold text-xl mt-3">Create New Capsule</h1>
          <div className="flex items-center mt-9">
          <input
            type="text"
            className="w-full md:max-w-[400px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-9"
            onChange={(e) => inputValueChange(e)}
            value={inputState}
            placeholder="Enter capsule name"
          />
          <button onClick={saveNewCapsule} className= {`relative text-white px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 ml-3 w-24 h-9 ${buttonBg}`}>{isLoading ? <Loader width={20} height={20} top={'9px'} left={'28px'}/>:'Add'}</button>
          </div>
        </div>
      </div>
    )
  );
}
