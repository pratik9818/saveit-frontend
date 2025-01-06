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
const screenShotfile = useRecoilValue(screenShot);

useEffect(() => {
    if(screenShotfile){
    upload(screenShotfile)
  }
}, [screenShotfile])
  async function upload(file: File) {
    setStartUploading(true);
    if (!file) {
      AlertFunction(true, errorRed, "No file selected", 4000);
      setStartUploading(false);
      return;
    }
    getPresignedUrl(file);
  }

  async function getPresignedUrl(file: File) {
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
        uploadOnS3(url, file);
      }
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error);
    }
  }

  async function uploadOnS3(presignedUrl: string, file: File) {
    try {
      const { status } = await axios.put(presignedUrl, file, {
        headers: { "Content-Type": "application/octet-stream" },
      });
      if (status === 200) {
        saveInDb(file);
        setStartUploading(false);
      }
    } catch (error) {
      setStartUploading(false);
      handleAxiosError(error);
    }
  }

  async function saveInDb(file: File) {
    const { name, size, type } = file;
    let fileType = type.split("/")[0];
    if (fileType === "image") fileType = "image";
    else if (fileType === "video") fileType = "video";
    else fileType = type;

    try {
      const { data: { data, message }, status } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/files`,
        {
          capsuleId: activeCapsuleValue,
          size: size,
          tag: "",
          fileType: fileType,
          fileName: name,
        },
        {
          withCredentials: true,
        }
      );
      if (status === 201) {
        const newTextFragment = {
          fragment_id: data.fragment_id,
          capsule_id: activeCapsuleValue,
          size: data.size,
          fragment_type: fileType,
          tag: "",
          reminder: false,
          download_count: 0,
          url: data.url,
          text_content: null,
          file_name: name,
          created_at: new Date().toUTCString(),
          updated_at: null,
          is_deleted: false,
        };
        setFragmentStore([newTextFragment, ...fragmentStoreState]);
        AlertFunction(true, successGreen, message, 4000);
      }
    } catch (error) {
      handleAxiosError(error);
    }
  }

  function handleAxiosError(error: unknown){
    if (axios.isAxiosError(error)) {
      const { status, response, message } = error;
      if (status === 500) {
        AlertFunction(true, errorRed, "Something went wrong! Please try again", 4000);
      } else if (message === "Network Error") {
        AlertFunction(true, errorRed, "No Internet", 4000);
      } else {
        AlertFunction(true, errorRed, response?.data?.message, 4000);
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
      }`}
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
