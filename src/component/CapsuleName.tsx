import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useRecoilState, useSetRecoilState } from "recoil";
import { alertState, capsulesStore, editCapsuleName_Id, isAlert } from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
export default function CapsuleName({
  name,
  capsuleid,
  bgColor,
}: {
  name: string;
  capsuleid: string;
  bgColor: string;
}) {
  const AlertFunction = useAlertFunction();
  // const [isChangeNode, setChangeNode] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<string>(name);
  const setIsalert = useSetRecoilState(isAlert);
  const setAlertState = useSetRecoilState(alertState);
  const inputref = useRef<HTMLInputElement | null>(null);
  const setCapsulesState = useSetRecoilState(capsulesStore);
  const [editCapsuleName_IdValue ,setEditCapsuleName_Id] = useRecoilState(editCapsuleName_Id)

  function changeCapsuleName(e: React.ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    setChangeName(e.target.value);
  }
  async function updateCapsuleNameOnEnter(
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key == "Enter") {
      updateCapsuleName();
    }
  }
  async function updateCapsuleName() {
    try {
      if (!changeName.length) {
        setIsalert(true);
        setAlertState({
          color: errorRed,
          alertName: "Capsule name should min. 1 char",
          time: 4000,
        });
        return;
      }

      if (name == changeName) {
        return;
      }
      const res = await axios.put(
        `${DOMAIN}/api/${API_VERSION}/capsule/${capsuleid}`,
        {
          capsuleName: changeName,
        },
        {
          withCredentials: true,
        }
      );
      const {
        data: { message },
        status,
      } = res;
      if (status === 200) {
        setEditCapsuleName_Id(null);
        setCapsulesState((prevCapsules) =>
          prevCapsules.map((capsule) =>
            capsule.capsule_id === capsuleid
              ? { ...capsule, capsule_name: changeName }
              : capsule
          )
        );
        AlertFunction(true, successGreen, message, 1000);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;
        if (status == 500) {
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
          2000
          );
          return;
        } else if (message == "Network Error") {
          AlertFunction(true, errorRed, "No Internet", 2000);
          return;
        }
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }
  useEffect(() => {
    if(inputref.current) {
      inputref.current.focus();
    }
  }, [editCapsuleName_IdValue])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('.capsule-name-input')) {
          setEditCapsuleName_Id(null)
        }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
        document.removeEventListener('mousedown', handleClickOutside)
    }
}, []) // Empty dependency array

  return (
    <div  className='text-xl font-bold font-mono w-[80%]'>
      {editCapsuleName_IdValue === capsuleid ? (
        <input
        ref={inputref}
          className={`capsule-name-input outline-none w-[100%] border border-gray-500 ${bgColor}`}
          type="text"
          value={changeName}
          onChange={(e) => changeCapsuleName(e)}
          onKeyDown={(e) => updateCapsuleNameOnEnter(e)}
        />
      ) : (
        <div>
          {changeName.substring(0, 20)}
        </div>
      )}
    </div>
  );
}
