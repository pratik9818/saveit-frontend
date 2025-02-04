import CapsuleLayoutVisbilityBtn from "./CapsuleLayoutVisbilityBtn";
import UserProfile from "./UserProfile";

export default function CapsuleTopNav() {
  return (
    <div className="flex justify-between items-center w-full">
      <UserProfile/>
      <CapsuleLayoutVisbilityBtn/>
    </div>
  );
}
