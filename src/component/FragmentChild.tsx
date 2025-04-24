import { memo, useMemo, useState } from "react";
import React from "react";
import { fragmentType } from "../types/Types";
import FragmentAction from "./FragmentAction";
import { useRecoilState, useSetRecoilState } from "recoil";
import { activeFrgamentText, selectedFragment } from "../recoil/Store";
import icons from "../utils/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand, faXmark } from "@fortawesome/free-solid-svg-icons";
import {
  audioExtensions,
  breakFragmentPixel,
  fragmentDimensionAbove700px,
  fragmentDimensionBelow700px,
  imageExtensions,
  videoExtensions,
} from "../utils/Constant";
import { calFragmentSize } from "../utils/CalFragmentSize";
import { useDownloadFile } from "../utils/DownloadFiles";

interface FragmentChildProps {
  fragmentdetails: fragmentType;
  clientwidth: number;
}

interface FragmentDimension {
  fragmentType: string | string[];
  width: string;
  height?: string;
}

const useFragmentDimensions = (
  clientwidth: number,
  fragmentType: string
): { dimension: FragmentDimension; fragmentMargin: string } => {
  const fragmentDimension = useMemo(() => {
    const dimensions = clientwidth > breakFragmentPixel
      ? fragmentDimensionAbove700px
      : fragmentDimensionBelow700px;
    
    return {
      dimension: dimensions.find((element: FragmentDimension) => {
        if (Array.isArray(element.fragmentType)) {
          return element.fragmentType.includes(fragmentType.toLowerCase());
        }
        return element.fragmentType === fragmentType.toLowerCase();
      }) || dimensions[dimensions.length - 1],
      fragmentMargin: clientwidth > breakFragmentPixel ? "ml-auto" : "ml-none"
    };
  }, [clientwidth, fragmentType]);

  return fragmentDimension;
};

const getFragmentColor = (fragmentType: string): string => {
  switch (fragmentType) {
    case "text":
      return "bg-emerald-800/20 px-4 py-2";
    case "video":
    case "image":
      return "bg-gray-200";
    default:
      return "bg-emerald-800/20";
  }
};

const isValidUrl = (text: string): boolean => {
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
};

const isValidEmail = (text: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(text);
};

const isNumber = (text: string): boolean => {
  return /^\d+/.test(text);
};

const processTextContent = (text: string) => {
  const lines = text.split('\n');
  return lines.map((line, lineIndex) => {
    const words = line.split(/\s+/);
    const processedWords = words.map((word, index) => {
      if (isValidUrl(word)) {
        return (
          <span key={`${lineIndex}-${index}`}>
            <a 
              href={word.startsWith('http') ? word : `https://${word}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {word}
            </a>
            {' '}
          </span>
        );
      } else if (isValidEmail(word)) {
        return (
          <span key={`${lineIndex}-${index}`}>
            <a 
              href={`mailto:${word}`}
              className="text-blue-600 hover:underline"
              onClick={(e) => e.stopPropagation()}
            >
              {word}
            </a>
            {' '}
          </span>
        );
      } else if (isNumber(word)) {
        return <span key={`${lineIndex}-${index}`} className="text-blue-600">{word} </span>;
      }
      return <span key={`${lineIndex}-${index}`}>{word} </span>;
    });

    return (
      <React.Fragment key={`line-${lineIndex}`}>
        {processedWords}
        {lineIndex < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
};

const FragmentChild = memo(({ fragmentdetails, clientwidth }: FragmentChildProps) => {
  const [isHide, setIsHide] = useState<boolean>(false);
  const [showFullImage, setShowFullImage] = useState<boolean>(false);
  const setActiveEditFragmentText = useSetRecoilState(activeFrgamentText);
  const [selectedFragmentValue, setSelectedFragment] = useRecoilState(selectedFragment);
  const { dimension, fragmentMargin } = useFragmentDimensions(clientwidth, fragmentdetails.fragment_type);
  const { handleDownload } = useDownloadFile();
  
  const fragmentElement = useMemo(() => {
    const handleClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      multiFragmentSelect();
    };

    const fileType = fragmentdetails.fragment_type.toLowerCase();

    if (fileType === "text") {
      return (
        <p onClick={handleClick} className="whitespace-pre-wrap break-words">
          {processTextContent(fragmentdetails.text_content || '')}
        </p>
      );
    } else if (videoExtensions.includes(fileType) || fileType === "video") {
      return (
        <video
          onClick={handleClick}
          controls
          className="w-[100%] h-[100%]"
          src={fragmentdetails?.url || ""}
          onError={(e) => {
            e.currentTarget.onerror = null;
            console.error("Error loading video");
          }}
        />
      );
    } else if (imageExtensions.includes(fileType) || fileType == "image") {
      return (
        <div className="relative">
          <img
            onClick={handleClick}
            className="w-[100%] h-[100%] object-cover max-h-[350px]"
            src={fragmentdetails?.url || ""}
            alt={fragmentdetails?.file_name || "Fragment image"}
            onError={(e) => {
              e.currentTarget.onerror = null;
              console.error("Error loading image");
            }}
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowFullImage(true);
            }}
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
          >
            <FontAwesomeIcon icon={faExpand} className="w-4 h-4" />
          </button>
        </div>
      );
    } else if (audioExtensions.includes(fileType) || fileType === "audio") {
      return (
        <audio
          onClick={handleClick}
          controls
          className="w-[100%]"
          src={fragmentdetails?.url || ""}
          onError={(e) => {
            e.currentTarget.onerror = null;
            console.error("Error loading audio");
          }}
        />
      );
    } else {
      const fileDetails = {
        fragment_id: fragmentdetails.fragment_id,
        url: fragmentdetails.url || undefined,
        file_name: fragmentdetails.file_name || undefined
      };
      return (
        <div onClick={handleClick} className="flex items-center p-4  rounded-lg hover:bg-emerald-800/30 transition-all">
          <div className="text-red-500">
            <icons.FileIcon />
          </div>
          <div className="flex flex-col flex-1 ml-4">
            <span className="text-base font-medium text-gray-800">{fragmentdetails.file_name?.substring(0, 150)}</span>
            <div className="flex items-center mt-1 text-sm text-gray-600">
              <span>{calFragmentSize(fragmentdetails.size)}</span>
              <span className="mx-2">•</span>
              <span>{fragmentdetails.fragment_type}</span>
            </div>
          </div>
          <div className="text-gray-600 hover:text-gray-800 transition-colors">
            <div onClick={() => handleDownload(fileDetails)}><icons.DownloadIcon/></div>
          </div>
        </div>
      );
    }
  }, [fragmentdetails, setShowFullImage]);

  const multiFragmentSelect = () => {
    setSelectedFragment(prevSelected => 
      prevSelected.includes(fragmentdetails)
        ? prevSelected.filter(fragment => fragment.fragment_id !== fragmentdetails.fragment_id)
        : [...prevSelected, fragmentdetails]
    );
  };

  const showAction = () => {
    setIsHide(true);
    setActiveEditFragmentText(fragmentdetails.fragment_id);
  };

  const hideAction = () => {
    setIsHide(false);
  };

  return (
    <>
      <div
        key={fragmentdetails.fragment_id}
        className={`rounded-lg text-left ${fragmentMargin} max-w-xl m-6 relative ${
          selectedFragmentValue.includes(fragmentdetails)
            ? "shadow-[0_0_15px_rgba(251,44,133,0.9)]"
            : "shadow-sm"
        } ${getFragmentColor(fragmentdetails.fragment_type)}`}
        style={{ 
          minWidth: dimension.width, 
          minHeight: dimension.height 
        }}
        onMouseEnter={showAction}
        onMouseLeave={hideAction}
      >
        {fragmentElement}
        {fragmentdetails?.tag && (
          <div className="flex w-[100%] absolute -bottom-6 bg-gray-100 shadow-md rounded-sm p-1 right-0 outline-none">
            <icons.TagIcon />
            <span className="ml-1">{fragmentdetails.tag.substring(0, 20)}</span>
          </div>
        )}
        {isHide && <FragmentAction fragmentdetails={fragmentdetails} />}
      </div>

      {showFullImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" 
          onClick={() => setShowFullImage(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img
              src={fragmentdetails?.url || ""}
              alt={fragmentdetails?.file_name || "Fragment image"}
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setShowFullImage(false)}
              className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
            >
              <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
});

FragmentChild.displayName = "FragmentChild";

export default FragmentChild;
