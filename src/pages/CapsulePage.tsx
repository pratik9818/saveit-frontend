import { useEffect } from "react";
import FeedbackModal from "../component/FeedbackModal";
import CapsuleNavbar from "../layouts/CapsuleNavbar";
import Capsules from "../layouts/Capsules";

export default function CapsulePage() {
  useEffect(()=>{
      document.title = "Saveit.tech - Organize your content neatly into capsules";
  },[])
  return (
    <div>
      <CapsuleNavbar />
      <div className="p-4">
        {/* <h1 className="text-2xl font-bold mb-4">My Capsules</h1> */}
        <Capsules />
      </div>
      <FeedbackModal />
    </div>
  );
}
