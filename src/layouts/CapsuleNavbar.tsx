import CreateCapsuleBtn from "../component/CreateCapsuleBtn"
import FilterBtn from "../component/CapsuleFilterBtn"
import Search from "../component/Search"

export default function CapsuleNavbar() {
  return (
    <div>
      <Search/>
      <CreateCapsuleBtn/>
      <FilterBtn/>
    </div>
  )
}
