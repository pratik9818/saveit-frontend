import { useRecoilValue } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"
import CapsuleDelete from "./CapsuleDelete"

export default function CapsuleActionModal({capsuleid}:{capsuleid:string}) {
    const capsuleActionModalIdValue = useRecoilValue(capsuleActionModalId)
  return capsuleActionModalIdValue === capsuleid && (
    <div className="relative w-[80px] h-auto">
        {/* <span>capsule info</span> */}
      <CapsuleDelete/>
    </div>
  )
}
