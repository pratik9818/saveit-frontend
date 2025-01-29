import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { activeCapsule, fragmentStore, screenShot } from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";
interface FragmentResponse {
  fragment_id: string;
  size: number;
  url: string;
}
export default function FileUpload() {
  const AlertFunction = useAlertFunction();
  const activeCapsuleValue = useRecoilValue(activeCapsule);
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const [startUploading, setStartUploading] = useState<boolean>(false);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [screenShotfile, setScreenShot] = useRecoilState(screenShot);

  useEffect(() => {
    if(screenShotfile){
      upload([screenShotfile]);
    }
  }, [screenShotfile]);

  async function upload(files: File[]) {
    setStartUploading(true);
    if (!files.length) {
      AlertFunction(true, errorRed, "No files selected", 1000);
      setStartUploading(false);
      return;
    }

    const tempFragments = await Promise.all(files.map(async (file) => {
      const base64Url = await createBase64(file);
      const { name, type } = file;
      let fileType = type.split("/")[0];
      if (fileType === "image") fileType = "image";
      else if (fileType === "video") fileType = "video";
      else fileType = type;
      
      const tempId = `temp-${Date.now()}-${name}`;
      return {
        fragment_id: tempId,
        capsule_id: activeCapsuleValue,
        size: null,
        fragment_type: fileType,
        tag: "",
        reminder: false,
        download_count: 0,
        url: base64Url,
        text_content: null,
        file_name: name,
        created_at: new Date().toUTCString(),
        updated_at: null,
        is_deleted: false,
      };
    }));

    setFragmentStore([...tempFragments, ...fragmentStoreState]);
    getPresignedUrl(files, tempFragments.map(f => f.fragment_id));
  }

  function createBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  }

  async function getPresignedUrl(files: File[], tempIds: string[]) {
    try {
      const { data: { presignedUrls }, status } = await axios.put(
        `${DOMAIN}/api/${API_VERSION}/presignedurl/upload`,
        {
          size: files.reduce((acc, file) => acc + file.size, 0),
          fileCount: files.length,
          fileNames: files.map(f => f.name),
        },
        {
          withCredentials: true,
        }
      );
      console.log(presignedUrls);
      
      if (status === 200) {
        await uploadOnS3(presignedUrls, files, tempIds);
      }
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error, tempIds);
    }
  }

  async function uploadOnS3(presignedUrls: string[], files: File[], tempIds: string[]) {
    try {
      await Promise.all(files.map(async (file, index) => {
        await axios.put(presignedUrls[index], file, {
          headers: { "Content-Type": "application/octet-stream" },
        });
      }));
      
      await saveInDb(files, tempIds);
      setStartUploading(false);
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error, tempIds);
    }
  }

  async function saveInDb(files: File[], tempIds: string[]) {
    const fileObjects = files.map(file => {
      const { name, size, type } = file;
      let fileType = type.split("/")[0];
      if (fileType === "image") fileType = "image";
      else if (fileType === "video") fileType = "video";
      else fileType = type;

      return {
        capsuleId: activeCapsuleValue,
        size: size,
        tag: "",
        fileType: fileType,
        fileName: name,
      };
    });
    
    try {
      const { data: { data: fragments, message }, status } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/files`,
        {fileObjects},
        {
          withCredentials: true,
        }
      );

      if (status === 201) {
        setFragmentStore(prevStore => {
          const updatedStore = [...prevStore];
          fragments.forEach((fragment: FragmentResponse, index: number) => {
            const storeIndex = updatedStore.findIndex(f => f.fragment_id === tempIds[index]);
            if (storeIndex !== -1) {
              updatedStore[storeIndex] = {
                ...updatedStore[storeIndex],
                fragment_id: fragment.fragment_id,
                size: fragment.size,
                url: fragment.url
              };
            }
          });
          return updatedStore;
        });

        AlertFunction(true, successGreen, message, 1000);
        if(screenShotfile) {
          setScreenShot(null);
        }
      }
    } catch (error) {
      handleAxiosError(error, tempIds);
    }
  }

  function handleAxiosError(error: unknown, tempIds: string[]) {
    setFragmentStore(prevStore => 
      prevStore.filter(fragment => !tempIds.includes(fragment.fragment_id))
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
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      upload(files);
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
        multiple
        onChange={(e) => e.target.files && upload(Array.from(e.target.files))}
        className="hidden"
      />
    </div>
  );
}
