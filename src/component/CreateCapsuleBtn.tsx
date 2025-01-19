import { useSetRecoilState } from "recoil"
import { isCreateCapsuleModalOpen } from "../recoil/Store"
import { buttonBg } from "../utils/Constant"

export default function CreateCapsuleBtn() {
  const setIsModalopen = useSetRecoilState(isCreateCapsuleModalOpen)
  function showmodal(){
    setIsModalopen(true)
  }
  return <button className={`w-full md:w-auto text-white px-4 py-2  rounded-lg shadow-md transition duration-300 ${buttonBg}`}onClick={showmodal}>New Capsule</button>
}