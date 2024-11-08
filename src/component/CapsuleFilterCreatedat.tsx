import { useSetRecoilState } from "recoil"
import { capsuleFilterState } from "../recoil/Store"

export default function CapsuleFilterCreatedat() {
  const setCapsuleFilterState = useSetRecoilState(capsuleFilterState)
  function setFilter(){
    setCapsuleFilterState({
      filterType:'createdat',
      order:'Asc'
    })
  }
  function changeOrderasc(){
    setCapsuleFilterState({
      filterType:'createdat',
      order:'Asc'
    })
  }
  function changeOrderdec(){
    setCapsuleFilterState({
      filterType:'createdat',
      order:'Desc'
    })
  }
  return (
    <div>
      <button onClick={setFilter}>Created at</button>
      <div>
        <button onClick={changeOrderasc}>Asc</button>
        <button onClick={changeOrderdec}>Dec</button>
      </div>
    </div>
  )
}
