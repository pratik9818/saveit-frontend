import {useParams } from "react-router-dom"
import FragmentSearch from "../component/FragmentSearch"
import FragmentUpload from "../component/FragmentUpload"
import { useSetRecoilState } from "recoil"
import { activeCapsule, screenShot, selectedFragment } from "../recoil/Store"
import Fragments from "../component/Fragments"
import EditTextModal from "../component/EditTextModal"
import ExpandNoteModal from "../component/ExpandNoteModal"
import { useEffect } from "react"
import FragmentSelectModal from "../component/FragmentSelectModal"
import FragmentUploadStatus from "../component/FragmentUploadStatus"

export default function FragmentLayout() {
  const {capsuleid} = useParams()
  const setSelectedFragment = useSetRecoilState(selectedFragment);
  useEffect(()=>{
    document.title = "Saveit.tech - Save all type of digital content";

    setSelectedFragment([])
  },[])
  
    const setActiveCapsule = useSetRecoilState(activeCapsule)
    const setScreenShot = useSetRecoilState(screenShot)
    if(capsuleid) setActiveCapsule(capsuleid)
      
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const timestamp = Date.now();
              const newFile = new File([file], `screenshot_${timestamp}.${file.name.split('.').pop()}`, {
                type: file.type,
              });
              setScreenShot(newFile);
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
  return (
    <div className={`h-[99vh] flex justify-between flex-col bg-gray-100`}>
     <FragmentSearch/>
     <FragmentSelectModal/>
     <FragmentUploadStatus/>
     <Fragments/>
     <FragmentUpload/>
     {<EditTextModal/>}
     {<ExpandNoteModal/>}
    </div>
  )
}
