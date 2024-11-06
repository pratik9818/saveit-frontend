import { useRecoilValue } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"

export default function CapsuleActionModal({capsuleid}:{capsuleid:string}) {
    const capsuleActionModalIdValue = useRecoilValue(capsuleActionModalId)
  return capsuleActionModalIdValue === capsuleid && (
    <div className="border">
        <span>capsule info</span>
        <span>delete</span>
      {/* //capsule info */}
      {/* delete btn */}
    </div>
  )
}
