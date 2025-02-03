import { useRecoilValue } from "recoil";
import FeedbackModal from "../component/FeedbackModal";
import CapsuleNavbar from "./CapsuleNavbar";
import CapsulesList from "./CapsulesList";
import { capsuleLayoutVisbility } from "../recoil/Store";

export default function CapsuleLayout() {
const capsuleLayoutVisible = useRecoilValue(capsuleLayoutVisbility)

  return capsuleLayoutVisible  && (
    <div className="w-[40%]">
      <CapsuleNavbar />
        <CapsulesList />
      <FeedbackModal />
    </div>
  );
}
