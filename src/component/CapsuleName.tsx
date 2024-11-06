import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import {useSetRecoilState } from "recoil";
import { alertState, capsulesStore, isAlert } from "../recoil/Store";
export default function CapsuleName({
  name,
  capsuleid,
}: {
  name: string;
  capsuleid: string;
}) {
  const [isChangeNode, setChangeNode] = useState<boolean>(false);
  const [changeName, setChangeName] = useState<string>(name);
  const setIsalert = useSetRecoilState(isAlert);
  const setAlertState = useSetRecoilState(alertState);
  const inputref = useRef<HTMLInputElement | null>(null)
  const setCapsulesState  = useSetRecoilState(capsulesStore)
  function changeNode() {
    setChangeNode(true);
  }
  useEffect(()=>{
    if(inputref.current){
        inputref.current.focus()
    }
  },[isChangeNode])
  function changeCapsuleName(e: React.ChangeEvent<HTMLInputElement>) {
    setChangeName(e.target.value);
  }
  async function updateCapsuleName(e: React.KeyboardEvent<HTMLInputElement>) {
    try {
      if (e.key == "Enter") {
        if(!changeName.length){
            setIsalert(true);
            setAlertState({
              color: errorRed,
              alertName: 'Capsule name should min. 1 char',
              time:4000
            })
            return
        }
        if(name == changeName) {
            setChangeNode(false);
            return
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
        const { data ,status} = res;
        if (status === 200) {
            setCapsulesState((prevCapsules) =>
                prevCapsules.map((capsule) =>
                  capsule.capsule_id === capsuleid
                    ? { ...capsule, capsule_name: changeName }
                    : capsule
                ));
            setChangeNode(false)
          setIsalert(true);
          setAlertState({
            color: successGreen,
            alertName: data.message,
            time: 2000,
          });
        }
      }
    } catch (error) {
      console.log(error);
      setIsalert(true);
      setAlertState({
        color: errorRed,
        alertName: 'something went wrong please try again',
        time: 2000,
      });
    }
  }
  return isChangeNode ? (
    <input
    ref={inputref}
      type="text"
      value={changeName}
      onChange={(e) => changeCapsuleName(e)}
      onKeyDown={(e) => updateCapsuleName(e)}
    />
  ) : (
    <div className="border text-center" onClick={changeNode}>
      {changeName}
    </div>
  );
}
