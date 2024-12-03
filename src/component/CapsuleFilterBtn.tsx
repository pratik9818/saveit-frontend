import { useRecoilState } from "recoil"
import { isCapsulesFilterModalOpen } from "../recoil/Store"

export default function FilterBtn() {
  const [isCapsulesFilterModalOpenValue ,setIsCapsulesFilterOpenModal] = useRecoilState(isCapsulesFilterModalOpen)
  function toggleFilterModal(){
      if(isCapsulesFilterModalOpenValue){
        setIsCapsulesFilterOpenModal(false)
        return
      }
      setIsCapsulesFilterOpenModal(true)
  }
  return <button className="ml-4" onClick={toggleFilterModal}>Filter</button>
}
