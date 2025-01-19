import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
import FeedbackFormButton from "../component/FeedbackFormButton"
import LogoutButton from "../component/LogoutButton"
// import FilterBtn from "../component/CapsuleFilterBtn"
import Search from "../component/Search"

// import CapsuleFilterModal from "../component/CapsuleFilterModal"

export default function CapsuleNavbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-3 shadow-md space-y-3 md:space-y-0 md:px-9">
    <Search/>
    <div className="grid grid-cols-2 gap-2 w-full md:flex md:gap-4 md:w-auto">
      <div className="col-span-2 md:col-span-1">
        <CreateCapsuleBtn/>
      </div>
      <div className="md:col-span-1">
        <FeedbackFormButton/>
      </div>
      <div className="md:col-span-1">
        <LogoutButton/>
      </div>
    </div>
  </div>
  )
}
