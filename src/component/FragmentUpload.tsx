import ExpandNote from "./ExpandNote"
import FileUpload from "./FileUpload"
import NoteInput from "./NoteInput"
// import SaveFragment from "./SaveFragment"

export default function FragmentUpload() {
  return (
    <div className="border-gray-200 shadow-lg fixed bottom-1 w-[100%] flex justify-evenly bg-white">
    <FileUpload/>
    <ExpandNote/>
    <NoteInput textareaHeight={'none'}/>
    {/* <SaveFragment/> */}
    </div>
  )
}
