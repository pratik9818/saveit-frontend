import ExpandNote from "./ExpandNote"
import FileUpload from "./FileUpload"
import NoteInput from "./NoteInput"
// import SaveFragment from "./SaveFragment"

export default function FragmentUpload() {
  return (
    <div className="border-2 border-gray-200 fixed md:w-[60%] w-[100%] flex justify-evenly bg-gray-100 rounded-lg right-10 items-center z-10 bottom-1">
    <FileUpload/>
    <NoteInput textareaHeight={'none'}/>
    <ExpandNote/>
    {/* <SaveFragment/> */}
    </div>
  )
}
