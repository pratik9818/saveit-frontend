import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
import FeedbackFormButton from "../component/FeedbackFormButton"
import LogoutButton from "../component/LogoutButton"
// import FilterBtn from "../component/CapsuleFilterBtn"
import Search from "../component/Search"
// import CapsuleFilterModal from "../component/CapsuleFilterModal"

export default function CapsuleNavbar() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100 p-3 shadow-md space-y-3 md:space-y-0">
      <Search/>
     <div className="flex justify-between md:w-auto sm:w-[100%] w-[100%]">
     <CreateCapsuleBtn/>
     <FeedbackFormButton/>
     <LogoutButton/>
     </div>
      
      {/* <FilterBtn/> */}
      {/* <CapsuleFilterModal/> */}
    </div>
  )
}
