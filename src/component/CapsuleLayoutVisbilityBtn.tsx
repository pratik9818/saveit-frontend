import { useRecoilState, useRecoilValue } from "recoil"
import { activeCapsule, capsuleLayoutVisbility } from "../recoil/Store"
import icons from "../utils/Icons"

export default function CapsuleLayoutVisbilityBtn() {
    const [capsuleLayoutVisible,setCapsuleLayoutVisible] = useRecoilState(capsuleLayoutVisbility)
    const activeCapsuleValue = useRecoilValue(activeCapsule)
    function hideandshow(){
      if(!activeCapsuleValue)return
        if(capsuleLayoutVisible) setCapsuleLayoutVisible(false)
          else  setCapsuleLayoutVisible(true)
    }
  return (
    <div onClick={hideandshow}>
      {/* {capsuleLayoutVisible ? 'Hide' : 'Show'} */}
      {<icons.capsuleListVisbilityIcon/>}
    </div>
  )
}
