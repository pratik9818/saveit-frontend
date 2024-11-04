import { useSetRecoilState } from "recoil"
import { isCreateCapsuleModalOpen } from "../recoil/Store"

export default function CreateCapsuleBtn() {
  const setIsModalopen = useSetRecoilState(isCreateCapsuleModalOpen)
  function showmodal(){
    setIsModalopen(true)
  }
  return <button onClick={showmodal}>New Capsule</button>
}