import { useEffect } from "react";
import FeedbackModal from "../component/FeedbackModal";
import CapsuleNavbar from "./CapsuleNavbar";
import CapsulesList from "./CapsulesList";

export default function CapsuleLayout() {
  useEffect(()=>{
      document.title = "Saveit.tech - Organize your content neatly into capsules";
  },[])
  return (
    <div className="w-[30%]">
      <CapsuleNavbar />
        <CapsulesList />
      <FeedbackModal />
    </div>
  );
}
