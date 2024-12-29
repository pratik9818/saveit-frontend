import { useState } from "react";
import { fragmentType } from "../types/Types";
import FragmentAction from "./FragmentAction";
import { useSetRecoilState } from "recoil";
import { activeFrgamentText } from "../recoil/Store";
import icons from "../utils/Icons";
import { breakFragmentPixel, fragmentDimensionAbove700px, fragmentDimensionBelow700px } from "../utils/Constant";

interface fragmentChildProps {
  fragmentdetails: fragmentType;
  clientwidth:number
}
export default function FragmentChild({ fragmentdetails,clientwidth }: fragmentChildProps) {
  const [isHide, setIsHide] = useState<boolean>(false);
  const setActiveEditFragmentText = useSetRecoilState(activeFrgamentText);
  let fragmentDimension;
  let fragmentMargin = 'ml-auto'
  if(clientwidth > breakFragmentPixel) fragmentDimension = fragmentDimensionAbove700px
  else {
    fragmentDimension = fragmentDimensionBelow700px
    fragmentMargin = 'ml-none'
  }

  function fragmentElement() {
    if (fragmentdetails.fragment_type == "text") {
      return (
        <p className="whitespace-pre-wrap break-words">
          {fragmentdetails.text_content}
        </p>
      );
    } else if (fragmentdetails.fragment_type == "video") {
      return <video controls className="w-[100%] h-[100%]" src={fragmentdetails?.url || ''}></video>;
    } else if (fragmentdetails.fragment_type == "image") {
      return <img className="w-[100%] h-[100%] object-contain" src={fragmentdetails?.url || ''} />;
    } else {
      return <div className="flex mt-6">{<icons.FileIcon/>} {fragmentdetails.file_name?.substring(0,150)}</div>
    }
  }
  const getFragmentsDimension = fragmentDimension.find(
    (element) => {
      if (element.fragmentType == fragmentdetails.fragment_type) {
        return true; // Found the matching fragment
      } else if (element.fragmentType == 'docs') {
        return true; // Fallback to 'docs' type
      }
    }
  );
  
  const minWidth = getFragmentsDimension?.width;
  const minHeight = getFragmentsDimension?.height;
  function showAction() {
    setIsHide(true);
    setActiveEditFragmentText(fragmentdetails.fragment_id);
  }
  function hideAction() {
    setIsHide(false);
    // setActiveEditFragmentText(null)
  }
  return (
    <div
      key={fragmentdetails.fragment_id}
      className={`bg-gray-300 shadow-md rounded-sm m-6 text-left ${fragmentMargin} max-w-xl py-2 px-4 relative`}
      style={{ minWidth, minHeight }}
      onMouseEnter={showAction}
      onMouseLeave={hideAction}
    >
      
      {fragmentElement()}
      {fragmentdetails?.tag && (
        <div className="flex w-[100%] absolute -bottom-6 bg-gray-200 shadow-md rounded-sm p-1 right-0 outline-none">
          <icons.TagIcon /> {fragmentdetails?.tag.substring(0, 20)}
        </div>
      )}
      {isHide && <FragmentAction fragmentdetails={fragmentdetails} />}
    </div>
  );
}
