import { useSetRecoilState } from "recoil"
import { isCreateCapsuleModalOpen } from "../recoil/Store"
import { buttonBg } from "../utils/Constant"
import icons from "../utils/Icons"

export default function CreateCapsuleBtn() {
  const setIsModalopen = useSetRecoilState(isCreateCapsuleModalOpen)
  function showmodal(){
    setIsModalopen(true)
  }
  return <button className={`w-auto flex text-white px-[8px] py-2 mr-auto rounded-lg shadow-md transition duration-300 ${buttonBg}`}onClick={showmodal}>{<icons.newCapsuleIcon/>}Add Capsule</button>
}