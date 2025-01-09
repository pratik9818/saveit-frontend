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

export default function FragmentLayout() {
  const {capsuleid} = useParams()
  const setSelectedFragment = useSetRecoilState(selectedFragment);
  useEffect(()=>{
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
              setScreenShot(file);
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
    <div className="h-[99vh] flex justify-between flex-col">
     <FragmentSearch/>
     <FragmentSelectModal/>
     <Fragments/>
     <FragmentUpload/>
     {<EditTextModal/>}
     {<ExpandNoteModal/>}
    </div>
  )
}
