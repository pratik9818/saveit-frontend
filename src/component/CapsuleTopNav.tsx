import icons from "../utils/Icons";
import CapsuleLayoutVisbilityBtn from "./CapsuleLayoutVisbilityBtn";

export default function CapsuleTopNav() {
  return (
    <div className="flex justify-between items-center w-full">
      <icons.LogoIcon />
      <CapsuleLayoutVisbilityBtn/>
    </div>
  );
}
