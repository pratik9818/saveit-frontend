import { useRecoilState, useSetRecoilState } from "recoil";
import { capsuleActionModalId, editCapsuleName_Id } from "../recoil/Store";

export default function EditCapsuleName() {
  const [capsuleActionModalIdvalue ,setCapsuleActionModalId] = useRecoilState(capsuleActionModalId)
  const setEditCapsuleName_Id = useSetRecoilState(editCapsuleName_Id)
  function editCapsule(){
    setEditCapsuleName_Id(capsuleActionModalIdvalue);
    setCapsuleActionModalId(null)
  }
  return <button onClick={editCapsule} className="border bg-gray-200 w-[90%] p-[4px] rounded-md">Edit Name</button>
}
