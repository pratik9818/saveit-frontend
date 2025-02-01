import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
// import FeedbackFormButton from "../component/FeedbackFormButton"
// import LogoutButton from "../component/LogoutButton"
// import FilterBtn from "../component/CapsuleFilterBtn"
import CapsuleSearch from "../component/CapsuleSearch"
import CapsuleTopNav from "../component/CapsuleTopNav";

// import CapsuleFilterModal from "../component/CapsuleFilterModal"

export default function CapsuleNavbar() {
  return (
    <div className="flex flex-col justify-between items-center p-3 h-40">
     <CapsuleTopNav />
    <CapsuleSearch/>
    <CreateCapsuleBtn/>
    {/* <div className="grid grid-cols-2 gap-2 w-full md:flex md:gap-4 md:w-auto">
      <div className="col-span-2 md:col-span-1">
        <CreateCapsuleBtn/>
      </div>
      <div className="md:col-span-1">
        <FeedbackFormButton/>
      </div>
      <div className="md:col-span-1">
        <LogoutButton/>
      </div>
    </div> */}
  </div>
  )
}
