import { useEffect, useRef, useState } from "react";
import { fragmentType } from "../types/Types";
import FragmentAboutModal from "./FragmentAboutModal";
import axios from "axios";
import {
  API_VERSION,
  audioExtensions,
  DOMAIN,
  errorRed,
  imageExtensions,
  successGreen,
  videoExtensions,
} from "../utils/Constant";
import {
  activeFrgamentText,
  fragmentStore,
  isEditTextModalOpen,
} from "../recoil/Store";
import { useSetRecoilState } from "recoil";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";
import CopyText from "./CopyText";
import { useDownloadFile } from "../utils/DownloadFiles";
import { calFragmentSize } from "../utils/CalFragmentSize";

interface fragmentActionProps {
  fragmentdetails: fragmentType;
}
export default function FragmentAction({
  fragmentdetails,
}: fragmentActionProps) {
  const { handleDownload } = useDownloadFile();
  const setFragmentStore = useSetRecoilState(fragmentStore);
  const AlertFunction = useAlertFunction();
  const [hideFragmentAbout, setHideFragmentAbout] = useState<boolean>(false);
  const [editTag, setEditTag] = useState<boolean>(false);
  const [tagValue, setTagValue] = useState<string>(fragmentdetails.tag);
  const setActiveEditFragmentTextId = useSetRecoilState(activeFrgamentText);
  const setIsEditTextModalOpen = useSetRecoilState(isEditTextModalOpen);
  const tagInput = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (tagInput.current) tagInput.current.focus();
  }, [editTag]);
  function showFragmentAbout() {
    setHideFragmentAbout(true);
  }

  function showTag() {
    setEditTag(true);
  }
  function hideTag() {
    setEditTag(false);
  }

  function editTagValue() {
    if (tagInput.current) {
      setTagValue(tagInput.current.value);
      tagInput.current.focus();
    }
  }
  async function saveTagInDb() {
    try {
      const {
        status,
        data: { message },
      } = await axios.put(
        `${DOMAIN}/api/${API_VERSION}/fragments/tag`,
        {
          tag: tagValue,
          fragmentId: fragmentdetails.fragment_id,
          capsuleId: fragmentdetails.capsule_id,
        },
        {
          withCredentials: true,
        }
      );
      if (status == 200) {
        setFragmentStore((prevFragment) =>
          prevFragment.map((fragment) =>
            fragment.fragment_id === fragmentdetails.fragment_id
              ? { ...fragment, tag: tagValue }
              : fragment
          )
        );
        setEditTag(false);
        AlertFunction(true, successGreen, message, 1000);
      }
    } catch (error) {
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

  function saveTag(e: React.KeyboardEvent<HTMLInputElement>) {
    const key = e.key;
    if (key == "Enter") {
      // e.preventDefault();
      saveTagInDb();
    }
  }

  function editText() {
    setActiveEditFragmentTextId(fragmentdetails.fragment_id);
    setIsEditTextModalOpen(true);
  }
  function checkImage_video_audioMedia() {
    if (
      imageExtensions.includes(fragmentdetails.fragment_type) ||
      videoExtensions.includes(fragmentdetails.fragment_type) ||
      audioExtensions.includes(fragmentdetails.fragment_type) ||
      fragmentdetails.fragment_type === "image" ||
      fragmentdetails.fragment_type === "video" ||
      fragmentdetails.fragment_type === "audio"
    ) {
      const fileDetails = {
        fragment_id: fragmentdetails.fragment_id,
        url: fragmentdetails.url || undefined,
        file_name: fragmentdetails.file_name || undefined,
      };
      return (
        <div className="flex items-center justify-between w-[100%]">
          <div onClick={() => handleDownload(fileDetails)}>
            <icons.DownloadIcon width="20px" height="20px"/>
          </div>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span>{calFragmentSize(fragmentdetails.size)}</span>
            <span className="mx-2">•</span>
            <span>{fragmentdetails.fragment_type}</span>
          </div>
        </div>
      );
    } else if (fragmentdetails.fragment_type === "text") {
      const fileDetails = {
        fragment_id: fragmentdetails.fragment_id,
        text_content: fragmentdetails.text_content || undefined,
      };
      return (
        <div onClick={() => handleDownload(fileDetails)}>
          <icons.DownloadIcon width="20px" height="20px"/>
        </div>
      );
    }
  }

  return editTag ? (
    <input
      placeholder="tag"
      ref={tagInput}
      type="text"
      enterKeyHint="done"
      value={tagValue}
      onChange={editTagValue}
      onKeyDown={(e) => saveTag(e)}
      className="w-[100%] absolute -bottom-6 bg-gray-100 shadow-md rounded-sm p-1 right-0 outline-none"
    />
  ) : (
    <div className="flex w-[100%] absolute -bottom-6 bg-gray-100 shadow-md rounded-sm p-1 right-0">
      <button onClick={showFragmentAbout}>
        <icons.AboutIcon />
      </button>
      {fragmentdetails.fragment_type === "text" && (
        <button onClick={editText}>
          {" "}
          <icons.EditTextIcon />
        </button>
      )}
      <button onClick={showTag} onMouseLeave={hideTag}>
        <icons.TagIcon />
      </button>
      {hideFragmentAbout && (
        <FragmentAboutModal fragmentdetails={fragmentdetails} />
      )}
      {checkImage_video_audioMedia()}

      {fragmentdetails.fragment_type === "text" && (
        <CopyText textToCopy={fragmentdetails.text_content} />
      )}
    </div>
  );
}
