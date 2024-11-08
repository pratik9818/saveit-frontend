import {useRecoilValue } from "recoil"
import { isCapsulesFilterModalOpen } from "../recoil/Store"
import CapsuleFilterCreatedat from "./CapsuleFilterCreatedat"
import CapsuleFilterSize from "./CapsuleFilterSize"

export default function CapsuleFilterModal() {
    const isCapsulesFilterModalOpenValue = useRecoilValue(isCapsulesFilterModalOpen)
  return isCapsulesFilterModalOpenValue && (
    <div className='border bg-white absolute w-40 right-0'>
      <CapsuleFilterCreatedat/>
      <CapsuleFilterSize/>
    </div>
  )
}
