import { useRecoilState } from "recoil";
import { isCreateCapsuleModalOpen } from "../recoil/Store";
import { useState } from "react";
import { API_VERSION, DOMAIN, minCapsulesNameLength } from "../utils/Constant";
import axios from "axios";

export default function CreateCapsuleModal() {
  const [isModalOpen, setIsModalOpen] = useRecoilState(
    isCreateCapsuleModalOpen
  );
  const [inputState, setInputState] = useState<string>("");
  function hidemodal(e: React.MouseEvent<HTMLDivElement>) {
    const target = (e.target as HTMLDivElement).id;
    if (target === "modal") setIsModalOpen(false);
  }
  function inputValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    setInputState(e.target.value);
  }
  async function saveNewCapsule() {
    if(!inputState || inputState.length <= minCapsulesNameLength) return

    const res = axios.post(`${DOMAIN}/api/${API_VERSION}/capsules`,{
        capsulesName:inputState
    })
    const result = await res;
    console.log(result);
    
  }
  return (
    isModalOpen && (
      <div
        className="border-2 bg-transparent absolute h-[100vh] w-[100vw] flex justify-center items-center"
        onClick={(e) => hidemodal(e)}
        id="modal"
      >
        <div>
          <input
            type="text"
            className="border"
            onChange={(e) => inputValueChange(e)}
            value={inputState}
          />
          <button onClick={saveNewCapsule}>create</button>
        </div>
      </div>
    )
  );
}
