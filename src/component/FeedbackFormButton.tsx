import { useSetRecoilState } from "recoil"
import { feedbackModal } from "../recoil/Store"

export default function FeedbackFormButton() {
    const setOpenModal =useSetRecoilState(feedbackModal)
    function openFeedbackForm(){
        setOpenModal(true)
    }
  return <button onClick={openFeedbackForm} className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300 mr-3 mx-3">FeedBack</button>
}
