import {useSetRecoilState } from "recoil";
import { fragmentType } from "../types/Types";
import { activeFrgamentText, fragmentStore } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import { useState } from "react";

interface fragmentActionProps {
    fragmentdetails: fragmentType;
  }
export default function FragmentAboutModal({fragmentdetails}:fragmentActionProps) {
  const  setFragmentStore = useSetRecoilState(fragmentStore);
  const setActiveFrgamentText = useSetRecoilState(activeFrgamentText)
  const [isDelete ,setIsDelete] = useState<boolean>(false)
  const AlertFunction = useAlertFunction()
  async function deleteFragment(){
    setIsDelete(true)
    try {
      const {status,data:{message}} = await axios.delete(`${DOMAIN}/api/${API_VERSION}/fragments`, 
        { 
          data:{
            fragmentIds: [fragmentdetails.fragment_id],
            capsuleId:fragmentdetails.capsule_id
          },
          withCredentials: true
        })
        if(status == 200) {
          setActiveFrgamentText(null)
          setFragmentStore(prevState =>
              prevState.filter(fragment => fragment.fragment_id !== fragmentdetails.fragment_id)
            );
            AlertFunction(true, successGreen, message, 3000);
            setIsDelete(false)
      }
        
    } catch (error) {
      setIsDelete(false)
      if (axios.isAxiosError(error)) {
        const { status, response,message } = error;
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
        AlertFunction(true, errorRed, response?.data?.message, 4000);
      }
      
    }
  }
  return (
   <div className="absolute shadow-sm border -left-[180px] w-42 h-auto text-sm p-2 bg-gray-100">
    <div className="m-1">Size : {fragmentdetails.size} Mb</div>
    <div className="m-1">Created : {new Date(fragmentdetails.created_at).toDateString()}</div>
    {/* <button className="m-1">{fragmentdetails.fragment_type != 'text' ? 'Download':''}</button> */}
    <div className="m-1">{fragmentdetails.updated_at && fragmentdetails.fragment_type == 'text' ? 'Modified :' + new Date(fragmentdetails.updated_at).toDateString():''}</div>
   <button className="bg-red-500 p-[4px] rounded-sm" onClick={deleteFragment}>{isDelete ? 'Deleting':'Delete'}</button>
   </div>
   
  )
}
