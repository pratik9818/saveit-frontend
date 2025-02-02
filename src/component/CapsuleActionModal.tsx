import { useRecoilValue } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"
import CapsuleDelete from "./CapsuleDelete"
import EditCapsuleName from "./EditCapsuleName"

export default function CapsuleActionModal({capsuleid}:{capsuleid:string}) {
    const capsuleActionModalIdValue = useRecoilValue(capsuleActionModalId)
  return capsuleActionModalIdValue === capsuleid && (
    <div className="absolute w-[80px] h-auto right-0 top-[40px]">
        {/* <span>capsule info</span> */}
      <CapsuleDelete/>
      <EditCapsuleName/>
    </div>
  )
}
