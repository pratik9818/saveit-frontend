import {useRecoilState, useSetRecoilState } from "recoil";
import { fragmentType } from "../types/Types";
import { activeFrgamentText, fragmentStore, selectedFragment } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import { useEffect, useState } from "react";
import downloadFile from "../utils/DownloadFiles";

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

  async function checkDownloadCount(){
    try {
        const resp = await axios(`${DOMAIN}/api/${API_VERSION}/fragments/files/download?fragmentId=${fragmentdetails.fragment_id}`,{
          withCredentials: true,
        })
        console.log(resp);
        if(fragmentdetails.url && fragmentdetails.file_name)downloadFile(fragmentdetails?.url, fragmentdetails?.file_name,AlertFunction);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;

        if (status == 500) {
          // setUserLogin(true)
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            4000
          );
          return;
        } else if (message == "Network Error") {
          AlertFunction(true, errorRed, "No Internet", 4000);
          return;
        }
        AlertFunction(true, errorRed, response?.data?.message, 4000);
      }
    }
  }
  function formatFileSize(sizeInMB: number | null): string {
    if (!sizeInMB) return '0 Bytes';
    
    if (sizeInMB >= 1) {
      return `${sizeInMB.toFixed(2)} MB`;
    } else if (sizeInMB >= 0.001) {
      return `${(sizeInMB * 1024).toFixed(2)} KB`;
    } else {
      return `${(sizeInMB * 1024 * 1024).toFixed(0)} Bytes`;
    }
  }
  

    function handleDownload(){

    // Example logic to handle different types
    if (fragmentdetails?.url && fragmentdetails?.url.startsWith('http')) {
      // Download remote file (image, video, PDF, etc.)
      checkDownloadCount()
    } else {
      // Download generated text or blob
      const textContent = fragmentdetails.text_content;
      if(textContent) downloadFile(textContent, 'fragment.txt',AlertFunction);
    }
};
  return (
   <div className={`absolute z-20 shadow-sm border -left-[0px] w-42 h-auto text-sm p-2 rounded-lg bg-white ${!indexState || indexState == 1 ? '-top-28':'top-1'}`}>
    <div className="m-1">Size : {formatFileSize(fragmentdetails.size)}</div>
    <div className="m-1">Created : {new Date(fragmentdetails.created_at).toLocaleTimeString() +' '+ new Date(fragmentdetails.created_at).toDateString()}</div>
    <button className="m-1" onClick={handleDownload}> Download</button>
    <div className="m-1">{fragmentdetails.updated_at && fragmentdetails.fragment_type == 'text' ? 'Modified :' + new Date(fragmentdetails.updated_at).toLocaleTimeString() + ' ' + new Date(fragmentdetails.updated_at).toDateString():''}</div>
   <button className="bg-red-500 p-[5px] rounded-sm" onClick={deleteFragment}>{isDelete ? 'Deleting':'Delete'}</button>
   </div>
  )
}
