import { useRecoilValue } from "recoil";
import ActiveCapsuleName from "../component/ActiveCapsuleName";
import CapsuleLayoutVisbilityBtn from "../component/CapsuleLayoutVisbilityBtn";
import FragmentSearch from "../component/FragmentSearch";
import { capsuleLayoutVisbility } from "../recoil/Store";

export default function FragmentNavbar() {
  const capsuleLayoutVisbilityValue = useRecoilValue(capsuleLayoutVisbility)
  return (
    <div className="flex">
      { !capsuleLayoutVisbilityValue && <CapsuleLayoutVisbilityBtn/>}
    <ActiveCapsuleName/>
      <FragmentSearch/>
    </div>
  )
}
