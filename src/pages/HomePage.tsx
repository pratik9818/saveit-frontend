import { useEffect } from "react";
import CapsuleLayout from "../layouts/CapsuleLayout";
import FragmentLayout from "../layouts/FragmentLayout";
import CreateCapsuleModal from "../component/CreateCapsuleModal";
import EditTextModal from "../component/EditTextModal";
import ExpandNoteModal from "../component/ExpandNoteModal";
import FeedbackModal from "../component/FeedbackModal";
export default function HomePage() {
  useEffect(()=>{
    document.title = "Saveit.tech - Organize your content neatly into capsules";
},[])

  return (
    <div className="flex flex-col md:flex-row w-full h-[99vh]">
      <CapsuleLayout/>
      <FragmentLayout/>
      <CreateCapsuleModal/>
      <EditTextModal/>
      <ExpandNoteModal/>
      <FeedbackModal/>
    </div>
  )
}
