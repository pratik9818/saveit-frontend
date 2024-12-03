import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  activeCapsule,
  activeFrgamentText,
  fragmentStore,
} from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
import Loader from "./Loader";

export default function EditFragmentText() {
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const textArea = useRef<HTMLTextAreaElement | null>(null);
  const activeCapsuleId = useRecoilValue(activeCapsule);
  const AlertFunction = useAlertFunction()
  const [updateing ,setUpdateing] = useState<boolean>(false)
  const activeEditFragmentTextId = useRecoilValue(activeFrgamentText);
  const findFragmentDetail = fragmentStoreState.find(
    (fragment) => fragment.fragment_id == activeEditFragmentTextId
  );
  const keySet = ["Shift", "Enter"];
  let storeEnterKey: string[] = [];
  const [textValue, setTextValue] = useState<string>(
    findFragmentDetail?.text_content || ''
  );
  useEffect(() => {
    if (textArea.current) {
      textArea.current.focus();
    }
  }, []);
  function editText() {
    if (textArea.current) {
      setTextValue(textArea.current.value);
    }
  }
  async function saveText(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    const key = e.key;
    storeEnterKey.push(key);
    if (keySet[0] != storeEnterKey[0] && key == "Enter") {
      e.preventDefault()
      saveInDb();
    }
  }
  async function saveInDb() {
    if(!textValue.length) return  AlertFunction(true, errorRed, 'Plese type something first', 3000);
    setUpdateing(true)
    storeEnterKey = [];
    try {
      const {
        status,
        data: { message },
      } = await axios.put(
        `${DOMAIN}/api/${API_VERSION}/fragments/text`,
        {
          textContent: textValue,
          fragmentId: activeEditFragmentTextId,
          capsuleId: activeCapsuleId,
        },
        {
          withCredentials: true,
        }
      );
      if (status === 200) {
        setFragmentStore((prevFragment) =>
          prevFragment.map((fragment) =>
            fragment.fragment_id === activeEditFragmentTextId
              ? {
                  ...fragment,
                  text_content: textValue,
                  updated_at: new Date().toISOString(),
                }
              : fragment
          )
        );
        // setActiveEditFragmentTextId(null);
        setUpdateing(false)
        AlertFunction(true, successGreen, message, 3000);
      }
    } catch (error) {
      setUpdateing(false)
      if (axios.isAxiosError(error)) {
        const { status, response ,message} = error;
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
  function saveTextOnClick() {
    saveInDb();
  }
  return (
    <div className="h-[100%] w-[70%] flex flex-col justify-center mx-auto ">
      <textarea
        ref={textArea}
        value={textValue}
        onKeyDown={(e) => saveText(e)}
        onChange={editText}
        className="w-[100%] h-[80%] p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      ></textarea>
      <button className="border w-24 h-10 p-2 rounded-md my-2 bg-blue-500 relative" onClick={saveTextOnClick}>{updateing ? <Loader width={20} height={20} top={'8px'} left={'38px'}/> :'update'}</button>
    </div>
  );
}
