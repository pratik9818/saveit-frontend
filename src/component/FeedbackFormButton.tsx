import { useSetRecoilState } from "recoil"
import { feedbackModal } from "../recoil/Store"
import { buttonBg } from "../utils/Constant"

export default function FeedbackFormButton() {
    const setOpenModal =useSetRecoilState(feedbackModal)
    function openFeedbackForm(){
        setOpenModal(true)
    }
  return <button onClick={openFeedbackForm} className={`w-[90px] text-white px-2 py-1 rounded-sm shadow-md ${buttonBg}`}>FeedBack</button>
}
