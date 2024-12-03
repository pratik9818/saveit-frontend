import { useRecoilState, useSetRecoilState } from "recoil";
import { activeFrgamentText, isEditTextModalOpen } from "../recoil/Store";
import EditFragmentText from "./EditFragmentText";

export default function EditTextModal() {
  const setActiveEditFragmentText = useSetRecoilState(activeFrgamentText);
  const [isEditTextModalOpenState, setIsEditTextModalOpen] =
    useRecoilState(isEditTextModalOpen);
  function hideModal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "textModal") {
      setIsEditTextModalOpen(false);
      setActiveEditFragmentText(null);
    }
  }
  return (
    isEditTextModalOpenState && (
      <div
        onClick={(e) => hideModal(e)}
        className="bg-gray-100 absolute w-[100vw] h-[100vh]"
        id="textModal"
      >
        <EditFragmentText />
      </div>
    )
  );
}
