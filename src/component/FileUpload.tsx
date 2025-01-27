import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCapsule, fragmentStore, screenShot } from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";

export default function FileUpload() {
  const AlertFunction = useAlertFunction();
  const activeCapsuleValue = useRecoilValue(activeCapsule);
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const [startUploading, setStartUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
const [screenShotfile, setScreenShot] = useRecoilState(screenShot);

useEffect(() => {
    if(screenShotfile){
    upload(screenShotfile)
  }
}, [screenShotfile])
async function upload(file: File) {
  setStartUploading(true);
  if (!file) {
    AlertFunction(true, errorRed, "No file selected", 1000);
    setStartUploading(false);
    return;
  }

  // Create base64 URL
  const reader = new FileReader();
  reader.readAsDataURL(file);
  
  reader.onload = () => {
    const base64Url = reader.result as string;
    const { name, type } = file;
    let fileType = type.split("/")[0];
    if (fileType === "image") fileType = "image";
    else if (fileType === "video") fileType = "video";
    else fileType = type;
    const tempId = `temp-${Date.now()}`;
    const newTextFragment = {
      fragment_id: tempId,
      capsule_id: activeCapsuleValue,
      size: null,
      fragment_type: fileType,
      tag: "",
      reminder: false,
      download_count: 0,
      url: base64Url, // Set the base64 URL here
      text_content: null,
      file_name: name,
      created_at: new Date().toUTCString(),
      updated_at: null,
      is_deleted: false,
    };

    setFragmentStore([newTextFragment, ...fragmentStoreState]);
    getPresignedUrl(file, tempId);
  };
}


  async function getPresignedUrl(file: File,tempId?:string) {
    const { name, size } = file;
    try {
      const { data: { url }, status } = await axios.put(
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
        uploadOnS3(url, file,tempId);
      }
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error,tempId);
    }
  }

  async function uploadOnS3(presignedUrl: string, file: File,tempId?:string) {
    try {
      const { status } = await axios.put(presignedUrl, file, {
        headers: { "Content-Type": "application/octet-stream" },
      });
      if (status === 200) {
        saveInDb(file,tempId);
        setStartUploading(false);
      }
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error,tempId);
    }
  }

  async function saveInDb(file: File,tempId?:string) {
    const { name, size:fileSize, type } = file;
    let fileType = type.split("/")[0];
    if (fileType === "image") fileType = "image";
    else if (fileType === "video") fileType = "video";
    else fileType = type;

    try {
      const { data: { data:{fragment_id,size,url}, message }, status } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/files`,
        {
          capsuleId: activeCapsuleValue,
          size: fileSize,
          tag: "",
          fileType: fileType,
          fileName: name,
        },
        {
          withCredentials: true,
        }
      );
      if (status === 201) {
        setFragmentStore(prevStore => 
          prevStore.map(fragment => 
            fragment.fragment_id === tempId 
              ? {...fragment, fragment_id, size,url}
              : fragment
          )
        );
        
        AlertFunction(true, successGreen, message, 1000);
        if(screenShotfile){
          setScreenShot(null);
        }
      }
    } catch (error) {
      handleAxiosError(error,tempId);
    }
  }

  function handleAxiosError(error: unknown,tempId?:string) {
    setFragmentStore(prevStore => 
      prevStore.filter(fragment => fragment.fragment_id !== tempId)
    );
    if (axios.isAxiosError(error)) {
      const { status, response, message } = error;
      if (status === 500) {
        AlertFunction(true, errorRed, "Something went wrong! Please try again", 2000);
      } else if (message === "Network Error") {
        AlertFunction(true, errorRed, "No Internet", 2000);
      } else {
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(true);
  }

  function handleDragLeave() {
    setDragActive(false);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      upload(files[0]); // Upload the first file for simplicity
    }
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${
        dragActive ? "border-blue-500 bg-blue-100" : "border-gray-300"
      } h-12 w-12 flex justify-center items-center`}
    >
      <label htmlFor="fileinput" className="cursor-pointer">
        {startUploading ? <icons.UploadIcon /> : <icons.SelectFilesIcon />}
      </label>
      <input
        id="fileinput"
        type="file"
        accept="*/*"
        onChange={(e) => e.target.files && upload(e.target.files[0])}
        className="hidden"
      />
    </div>
  );
}
