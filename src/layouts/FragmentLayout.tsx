import {useParams } from "react-router-dom"
import FragmentSearch from "../component/FragmentSearch"
import FragmentUpload from "../component/FragmentUpload"
import { useSetRecoilState } from "recoil"
import { activeCapsule } from "../recoil/Store"
import Fragments from "../component/Fragments"
import EditTextModal from "../component/EditTextModal"
import ExpandNoteModal from "../component/ExpandNoteModal"

export default function FragmentLayout() {
    const {capsuleid} = useParams()
    const setActiveCapsule = useSetRecoilState(activeCapsule)
    if(capsuleid) setActiveCapsule(capsuleid)
  return (
    <div className="h-[99vh] flex justify-between flex-col">
     <FragmentSearch/>
     <Fragments/>
     <FragmentUpload/>
     {<EditTextModal/>}
     {<ExpandNoteModal/>}
    </div>
  )
}
