import { useSetRecoilState } from "recoil"
import { feedbackModal } from "../recoil/Store"
import { buttonBg } from "../utils/Constant"

export default function FeedbackFormButton() {
    const setOpenModal =useSetRecoilState(feedbackModal)
    function openFeedbackForm(){
        setOpenModal(true)
    }
  return <button onClick={openFeedbackForm} className={`w-full md:w-auto text-white px-4 py-2 rounded-lg shadow-md mr-3 ${buttonBg}`}>FeedBack</button>
}
