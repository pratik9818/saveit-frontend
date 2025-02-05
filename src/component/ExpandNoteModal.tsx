import { useRecoilState } from "recoil";
import { expandNoteModal } from "../recoil/Store";
import NoteInput from "./NoteInput";

export default function ExpandNoteModal() {
  const [expandNoteModalValue,setExpandNoteModalValue] = useRecoilState(expandNoteModal);
  function hidemodal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "expandModal") setExpandNoteModalValue(false);
  }
  return (
    expandNoteModalValue && (
      <div className="bg-gray-50 absolute top-0 w-[100vw] h-[100vh] flex border justify-center p-8 z-50" id="expandModal" onClick={hidemodal}>
        <NoteInput textareaHeight={'90%'} postion={'flex-col'}/>
      </div>
    )
  );
}
