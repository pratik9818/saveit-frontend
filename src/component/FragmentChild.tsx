import { useState } from "react";
import { fragmentType } from "../types/Types";
import FragmentAction from "./FragmentAction";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeFrgamentText, selectedFragment } from "../recoil/Store";
import icons from "../utils/Icons";
import { breakFragmentPixel, fragmentDimensionAbove700px, fragmentDimensionBelow700px } from "../utils/Constant";

interface fragmentChildProps {
  fragmentdetails: fragmentType;
  clientwidth:number
}
export default function FragmentChild({ fragmentdetails,clientwidth }: fragmentChildProps) {
  const [isHide, setIsHide] = useState<boolean>(false);
  const setActiveEditFragmentText = useSetRecoilState(activeFrgamentText);
  const [selectedFragmentValue, setSelectedFragment] = useRecoilState(selectedFragment)
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
        <p onClick={multiFragmentSelect} className="whitespace-pre-wrap break-words">
          {fragmentdetails.text_content}
        </p>
      );
    } else if (fragmentdetails.fragment_type == "video") {
      return <video onClick={multiFragmentSelect} controls className="w-[100%] h-[100%]" src={fragmentdetails?.url || ''}></video>;
    } else if (fragmentdetails.fragment_type == "image") {
      return <img onClick={multiFragmentSelect} className="w-[100%] h-[100%] object-contain" src={fragmentdetails?.url || ''} />;
    } else {
      return <div onClick={multiFragmentSelect} className="flex mt-6">{<icons.FileIcon/>} {fragmentdetails.file_name?.substring(0,150)}</div>
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
  function multiFragmentSelect() {
  if(selectedFragmentValue.includes(fragmentdetails)) {
      setSelectedFragment(selectedFragmentValue.filter(fragment => fragment.fragment_id !== fragmentdetails.fragment_id))
    }
    else setSelectedFragment([...selectedFragmentValue,fragmentdetails])
    
  }
  return (
    <div
      key={fragmentdetails.fragment_id}
      className={`bg-gray-300 rounded-sm m-6 text-left ${fragmentMargin} max-w-xl py-2 px-4 relative ${
        selectedFragmentValue.includes(fragmentdetails) ? 'shadow-[0_0_15px_rgba(251,44,133,0.9)]' : 'shadow-md'
      }`}
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
