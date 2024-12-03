import { useRecoilState } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"

export default function ThreedotImg({capsuleid}:{capsuleid:string}) {
  const [capsuleActionModalIdvalue ,setCapsuleActionModalId] = useRecoilState(capsuleActionModalId)
  function showAction(){
    setCapsuleActionModalId(capsuleActionModalIdvalue === capsuleid ? null : capsuleid);
  }
  return <div className="cursor-pointer" onClick={showAction}>. . .</div>
}
