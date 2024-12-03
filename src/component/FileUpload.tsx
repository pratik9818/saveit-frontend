import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCapsule, fragmentStore } from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";
import { useState } from "react";
export default function FileUpload() {
  const AlertFunction = useAlertFunction();
  const activeCapsuleValue = useRecoilValue(activeCapsule);
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const [startUploading , setStartUploading] = useState<boolean>(false)
  async function upload(e: React.ChangeEvent<HTMLInputElement>) {
    setStartUploading(true)
    if (!e.target.files || e.target.files.length === 0) {
      console.log("No file selected");
      AlertFunction(true, errorRed, 'No file selected', 4000);
      setStartUploading(false)
      return;
    }
    const file = e.target.files[0];
    getPresignedUrl(file);
  }

  async function getPresignedUrl(file: File) {
    const { name, size } = file;
    try {
      const {data:{url},status} = await axios.put(
        `${DOMAIN}/api/${API_VERSION}/presignedurl/upload`,
        {
          size: size,
          fileCount: 1,
          fileName: name,
        },
        {
          withCredentials: true,
        }
      );
      if (status === 200) {
        const presignedUrl = url;
        uploadOnS3(presignedUrl, file);
      }
    } catch (error) {
      setStartUploading(false)
      if(axios.isAxiosError(error)){
        const {status,response,message} = error
        if(status == 500){
          AlertFunction(true,errorRed,'Something went wrong ! please try again',4000)
          return
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 4000);
       }
    }
  }

  async function uploadOnS3(presignedUrl: string, file: File) {
    try {
      const { status } = await axios.put(presignedUrl,file, {
        headers: {
          'Content-Type': 'application/octet-stream', // Explicitly set Content-Type
        },
      });
      if (status === 200) {
        saveInDb(file);
        setStartUploading(false)
      }
    } catch (error) {
      setStartUploading(false)
      if(axios.isAxiosError(error)){
        const {status,response,message} = error
        if(status == 500){
          AlertFunction(true,errorRed,'Something went wrong ! please try again',4000)
          return
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 4000);
       }
    }
  }

  async function saveInDb(file: File) {
    const { name, size, type } = file;
    let fileType = type.split('/')[0] 
    if(fileType == 'image') fileType = 'image'
    else if(fileType == 'video') fileType = 'video'
    else fileType = type
    try {
      const {data:{data,message},status} = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/files`,
        {
          capsuleId: activeCapsuleValue,
          size: size,
          tag: "",
          fileType: fileType,
          fileName: name,
        },
        {
          withCredentials: true
        }
      );
      if(status === 201){
        const newTextFragment = {
          fragment_id:data.fragment_id,
          capsule_id:activeCapsuleValue,
          size:data.size, //it should not here that is in client side ----ALERT
          fragment_type:fileType,
          tag:'',
          reminder:false,
          download_count:0,
          url:data.url,
          text_content:null,
          file_name:name,
          created_at:new Date().toUTCString(),
          updated_at:null ,
          is_deleted:false
    }
    setFragmentStore([newTextFragment,...fragmentStoreState])
    AlertFunction(true, successGreen,message, 4000);
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        const {status,response,message} = error
        if(status == 500){
          AlertFunction(true,errorRed,'Something went wrong ! please try again',4000)
          return
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 4000);
       }
    }
  }

  return (
    <div>
      <label htmlFor="fileinput">{startUploading ? <icons.UploadIcon/>:<icons.SelectFilesIcon/>}</label>
      <input
        id="fileinput"
        type="file"
        accept="*/*"
        onChange={(e) => upload(e)}
        className="hidden"
      />
    </div>
  );
}
