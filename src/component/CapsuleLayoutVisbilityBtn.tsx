import { useRecoilState } from "recoil"
import { capsuleLayoutVisbility } from "../recoil/Store"
import icons from "../utils/Icons"

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
      {/* {capsuleLayoutVisible ? 'Hide' : 'Show'} */}
      {<icons.capsuleListVisbilityIcon/>}
    </div>
  )
}
