import { useRecoilState, useRecoilValue } from "recoil";
import { activeCapsule, fragmentStore, newFragmentNote } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";
import { useState } from "react";
interface loadingtype {
  loading : boolean
}
export default function  SaveFragment({loading}:loadingtype) {
  const AlertFunction = useAlertFunction()
  const [newNote, setNewNote] = useRecoilState(newFragmentNote);
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const activeCapsuleId = useRecoilValue(activeCapsule);
  const [startUploading , setStartUploading] = useState<boolean>(false)
  async function saveNote() {
    if(!newNote.length) return AlertFunction(true, errorRed, 'Please write first', 1000);
    setStartUploading(true)
    const tempId = `temp-${Date.now()}`;
      const newTextFragment = {
        fragment_id: tempId,
        capsule_id: activeCapsuleId,
        size: null, //it should not here that is in client side ----ALERT
        fragment_type: "text",
        tag: "",
        reminder: false,
        download_count: 0,
        url: null,
        text_content: newNote,
        file_name: null,
        created_at: new Date().toUTCString(),
        updated_at: null,
        is_deleted: false,
      };
      setFragmentStore([newTextFragment, ...fragmentStoreState]);
      setNewNote("");
    try {
      const { data:{data:{fragment_id,size},message} ,status } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/text`,
        {
          capsuleId: activeCapsuleId,
          tag: "",
          textContent: newNote,
        },
        { withCredentials: true }
      );
      if (status == 201) {
        setFragmentStore((prevStore) =>
          prevStore.map((fragment) =>
            fragment.fragment_id === tempId
              ? { ...fragment, fragment_id, size }
              : fragment
          )
        );
    AlertFunction(true, successGreen, message, 1000);
    setStartUploading(false)
      }
    } catch (error) {
      setStartUploading(false)
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
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }

  // return <button onClick={saveNote}>save</button>;
  return <div className="w-12 h-12 flex justify-center items-center" onClick={saveNote}>{startUploading || loading ? <icons.UploadIcon/>:<icons.AddTextIcon/>}</div>
}
