import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
// import FeedbackFormButton from "../component/FeedbackFormButton"
// import LogoutButton from "../component/LogoutButton"
// import FilterBtn from "../component/CapsuleFilterBtn"
import CapsuleSearch from "../component/CapsuleSearch"
import CapsuleTopNav from "../component/CapsuleTopNav";
import UserProfileModal from "../component/UserProfileModal";

// import CapsuleFilterModal from "../component/CapsuleFilterModal"

export default function CapsuleNavbar() {
  return (
    <div className="relative flex flex-col justify-between items-center p-1 h-auto md:h-40">
    <CapsuleTopNav />
    <div className="w-full max-w-md">
      <CapsuleSearch />
    </div>
    <div className="w-full flex justify-center mt-2">
      <CreateCapsuleBtn />
    </div>
    <UserProfileModal />
  </div>
  )
}
