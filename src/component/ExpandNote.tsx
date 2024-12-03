import { useRecoilState} from "recoil"
import { expandNoteModal } from "../recoil/Store"
import icons from "../utils/Icons";

export default function ExpandNote() {
  const [expandNoteModalValue,setExpandNoteModalValue] = useRecoilState(expandNoteModal);
  function expandNoteModalfun(){
    if(expandNoteModalValue) setExpandNoteModalValue(false)
    else setExpandNoteModalValue(true)
  }
  // return <button onClick={expandNoteModalfun}>Expand Note</button>
  return <div onClick={expandNoteModalfun}><icons.ExpandTextIcon/></div>
}
