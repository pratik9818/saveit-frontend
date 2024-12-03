import { useSetRecoilState } from "recoil"
import { isCreateCapsuleModalOpen } from "../recoil/Store"

export default function CreateCapsuleBtn() {
  const setIsModalopen = useSetRecoilState(isCreateCapsuleModalOpen)
  function showmodal(){
    setIsModalopen(true)
  }
  return <button className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300" onClick={showmodal}>New Capsule</button>
}