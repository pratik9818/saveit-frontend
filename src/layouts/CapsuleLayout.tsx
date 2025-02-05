import { useRecoilValue } from "recoil";
import CapsuleNavbar from "./CapsuleNavbar";
import CapsulesList from "./CapsulesList";
import { capsuleLayoutVisbility } from "../recoil/Store";

export default function CapsuleLayout() {
const capsuleLayoutVisible = useRecoilValue(capsuleLayoutVisbility)

  return capsuleLayoutVisible  && (
    <div className="w-[300px] md:w-[30%] h-screen overflow-y-auto absolute top-0 left-0 z-50 bg-white">
      <CapsuleNavbar />
        <CapsulesList />
    </div>
  );
}
