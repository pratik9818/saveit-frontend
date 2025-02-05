import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeCapsule,
  expandNoteModal,
  fragmentStore,
  newFragmentNote,
  selectedFragmentCountToUpload,
  uploadedFragmentCount,
} from "../recoil/Store";
import { useRef } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import useAlertFunction from "../hooks/AlertFunction";
import SaveFragment from "./SaveFragment";
interface textareaHeightInterface {
  textareaHeight: string;
  postion?: string;
}
export default function NoteInput({
  textareaHeight,
  postion = "flex-row",
}: textareaHeightInterface) {
  const AlertFunction = useAlertFunction();
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const [expandNoteModalValue, setExpandNoteModalValue] =
    useRecoilState(expandNoteModal);
  const [newNote, setNewNote] = useRecoilState(newFragmentNote);
  const currentValue = useRef<HTMLTextAreaElement | null>(null);
  const activeCapsuleId = useRecoilValue(activeCapsule);
  const setUploadedFragmentCount = useSetRecoilState(uploadedFragmentCount);
      const setSelectedFragmentCount = useSetRecoilState(selectedFragmentCountToUpload);
  const keySet = ["Shift", "Enter"];
  let storeEnterKey: string[] = [];
  function writeNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setNewNote(value);
  }

  async function saveNote(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = e.key;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    storeEnterKey.push(key);
    if (isMobile && key === "Enter") {
      storeEnterKey = [];
      return;
    }

    if (!isMobile && keySet[0] != storeEnterKey[0] && key == "Enter") {
      e.preventDefault();
      if (!newNote.length)
        return AlertFunction(true, errorRed, "Please write first", 1000);
      setSelectedFragmentCount(0)
      setUploadedFragmentCount(0)
      setSelectedFragmentCount(1);

      storeEnterKey = [];
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
      if (expandNoteModalValue) setExpandNoteModalValue(false);
      try {
      setUploadedFragmentCount((prevCount) => prevCount + 1);
        setUploadedFragmentCount((prevCount) => prevCount + 1);
        const {
          data: {
            data: { fragment_id, size },
            message,
          },
          status,
        } = await axios.post(
          `${DOMAIN}/api/${API_VERSION}/fragments/text`,
          {
            capsuleId: activeCapsuleId,
            tag: "",
            textContent: newNote,
          },
          { withCredentials: true }
        );

        if (status == 201) {
        setUploadedFragmentCount((prevCount) => prevCount + 1);
        setUploadedFragmentCount((prevCount) => prevCount + 1);

          setFragmentStore((prevStore) =>
            prevStore.map((fragment) =>
              fragment.fragment_id === tempId
                ? { ...fragment, fragment_id, size }
                : fragment
            )
          );

          AlertFunction(true, successGreen, message, 1000);
          
        }
      } catch (error) {
        setSelectedFragmentCount(0);
        setFragmentStore((prevStore) =>
          prevStore.filter((fragment) => fragment.fragment_id !== tempId)
        );
        setUploadedFragmentCount(0);


        if (axios.isAxiosError(error)) {
          const { status, response, message } = error;
          if (status == 500) {
            AlertFunction(
              true,
              errorRed,
              "Something went wrong ! please try again",
              3000
            );
            return;
          } else if (message == "Network Error") {
            AlertFunction(true, errorRed, "No Internet", 2000);
            return;
          }
          AlertFunction(true, errorRed, response?.data?.message, 1000);
        }
      }
    }
  }
  return (
    <div className={`w-[85%] flex ${postion} justify-between items-center`}>
      <textarea
        ref={currentValue}
        value={newNote}
        placeholder="Write here to save"
        onKeyDown={(e) => saveNote(e)}
        onChange={(e) => writeNote(e)}
        style={{ height: textareaHeight }}
        className="w-[100%] p-2 mx-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-100 border-none resize-none z-20 "
      ></textarea>
      <SaveFragment/>
    </div>
  );
}
