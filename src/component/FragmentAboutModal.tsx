import {useRecoilState, useSetRecoilState } from "recoil";
import { fragmentType } from "../types/Types";
import { activeFrgamentText, fragmentStore, selectedFragment } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import { useEffect, useState } from "react";

interface fragmentActionProps {
    fragmentdetails: fragmentType;
  }
export default function FragmentAboutModal({fragmentdetails}:fragmentActionProps) {
  const  [fragmentStoreState ,setFragmentStore] = useRecoilState(fragmentStore);
  const setActiveFrgamentText = useSetRecoilState(activeFrgamentText)
      const [selectedFragmentValue, setSelectedFragment] = useRecoilState(selectedFragment);
  
  const [isDelete ,setIsDelete] = useState<boolean>(false)
  const AlertFunction = useAlertFunction()
  const [indexState , setIndexState] = useState<number>(0)
  useEffect(()=>{
    const index = fragmentStoreState.findIndex(fragment => fragment.fragment_id === fragmentdetails.fragment_id)
    setIndexState(index)
  },[])
  function removeSelectedFragment(){
    setSelectedFragment(prevState => prevState.filter(fragment => fragment.fragment_id !== fragmentdetails.fragment_id))
  }
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
          if(selectedFragmentValue.length)removeSelectedFragment()
          setActiveFrgamentText(null)
          setFragmentStore(prevState =>
              prevState.filter(fragment => fragment.fragment_id !== fragmentdetails.fragment_id)
            );
            AlertFunction(true, successGreen, message, 1000);
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
          AlertFunction(true, errorRed, 'No Internet', 2000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 2000);
      }
      
    }
  }


  return (
   <div className={`absolute z-20 shadow-sm border -left-[0px] w-42 h-auto text-sm p-2 rounded-lg bg-white ${!indexState || indexState == 1 ? '-top-20':'top-0'}`}>
    {/* <div className="m-1">Size : {calFragmentSize(fragmentdetails.size)}</div> */}
    <div className="m-1"> {fragmentdetails.fragment_type !== 'text'? 'File Name : ' +fragmentdetails.file_name :''}</div>
    <div className="m-1">Created : {new Date(fragmentdetails.created_at).toLocaleTimeString() +' '+ new Date(fragmentdetails.created_at).toDateString()}</div>
    {/* <button className="m-1" onClick={handleDownload}> Download</button> */}
    <div className="m-1">{fragmentdetails.updated_at && fragmentdetails.fragment_type == 'text' ? 'Modified :' + new Date(fragmentdetails.updated_at).toLocaleTimeString() + ' ' + new Date(fragmentdetails.updated_at).toDateString():''}</div>
   <button className="bg-red-500 p-[5px] rounded-sm" onClick={deleteFragment}>{isDelete ? 'Deleting':'Delete'}</button>
   </div>
  )
}
