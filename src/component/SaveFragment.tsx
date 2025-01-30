import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { activeCapsule, fragmentStore, newFragmentNote, selectedFragmentCountToUpload, uploadedFragmentCount } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import axios from "axios";
import useAlertFunction from "../hooks/AlertFunction";
import icons from "../utils/Icons";
export default function  SaveFragment() {
  const AlertFunction = useAlertFunction()
  const [newNote, setNewNote] = useRecoilState(newFragmentNote);
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const activeCapsuleId = useRecoilValue(activeCapsule);
  const setUploadedFragmentCount = useSetRecoilState(uploadedFragmentCount);
    const setSelectedFragmentCount = useSetRecoilState(selectedFragmentCountToUpload);
  async function saveNote() {
    if(!newNote.length) return AlertFunction(true, errorRed, 'Please write first', 1000);
    setSelectedFragmentCount(1);
    const tempId = `temp-${Date.now()}`;
      const newTextFragment = {
        fragment_id: tempId,
        capsule_id: activeCapsuleId,
        size: null, //it should not here that is in client side ----ALERT
        fragment_type: "text",
        tag: "",
        reminder: false,
        download_count: 0,
        url: null,
        text_content: newNote,
        file_name: null,
        created_at: new Date().toUTCString(),
        updated_at: null,
        is_deleted: false,
      };
      setFragmentStore([newTextFragment, ...fragmentStoreState]);
      setNewNote("");
    try {
      setUploadedFragmentCount((prevCount) => prevCount + 1);
        setUploadedFragmentCount((prevCount) => prevCount + 1)
      const { data:{data:{fragment_id,size},message} ,status } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/fragments/text`,
        {
          capsuleId: activeCapsuleId,
          tag: "",
          textContent: newNote,
        },
        { withCredentials: true }
      );
      if (status == 201) {
        setFragmentStore((prevStore) =>
          prevStore.map((fragment) =>
            fragment.fragment_id === tempId
              ? { ...fragment, fragment_id, size }
              : fragment
          )
        );
        ;
        setUploadedFragmentCount((prevCount) => prevCount + 1);
        setUploadedFragmentCount((prevCount) => prevCount + 1);
        AlertFunction(true, successGreen, message, 1000);
        
      }
    } catch (error) {
      setUploadedFragmentCount(0);
      if (axios.isAxiosError(error)) {
        const { status, response,message } = error;
        if (status == 500) {
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            3000
          );
          return;
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 2000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }

  // return <button onClick={saveNote}>save</button>;
  return <div className="w-12 h-12 flex justify-center items-center" onClick={saveNote}>{<icons.AddTextIcon/>}</div>
}
