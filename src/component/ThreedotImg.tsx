import { useSetRecoilState } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"

export default function ThreedotImg({capsuleid}:{capsuleid:string}) {
  const setCapsuleActionModalId = useSetRecoilState(capsuleActionModalId)
  function showAction(){
    setCapsuleActionModalId(capsuleid)
  }
  return <div onClick={showAction}>. . .</div>
}
