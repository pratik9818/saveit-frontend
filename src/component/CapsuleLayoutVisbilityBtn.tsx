import { useRecoilState } from "recoil"
import { capsuleLayoutVisbility } from "../recoil/Store"

export default function CapsuleLayoutVisbilityBtn() {
    const [capsuleLayoutVisible,setCapsuleLayoutVisible] = useRecoilState(capsuleLayoutVisbility)
    function hideandshow(){
        if(capsuleLayoutVisible){
            setCapsuleLayoutVisible(false)
        }else{
            setCapsuleLayoutVisible(true)
        }
    }
  return (
    <div onClick={hideandshow}>
      {capsuleLayoutVisible ? 'Hide' : 'Show'}
    </div>
  )
}
