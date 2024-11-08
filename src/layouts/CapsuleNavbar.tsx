import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
import FilterBtn from "../component/CapsuleFilterBtn"
import Search from "../component/Search"
import CapsuleFilterModal from "../component/CapsuleFilterModal"

export default function CapsuleNavbar() {
  return (
    <div>
      <Search/>
      <CreateCapsuleBtn/>
      <FilterBtn/>
      <CapsuleFilterModal/>
    </div>
  )
}
