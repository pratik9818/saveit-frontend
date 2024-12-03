import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import {useSetRecoilState } from "recoil";
import { alertState, capsulesStore, isAlert } from "../recoil/Store";
import useAlertFunction from "../hooks/AlertFunction";
export default function CapsuleName({
  name,
  capsuleid,
}: {
  name: string;
  capsuleid: string;
}) {
  const AlertFunction = useAlertFunction()
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
    e.stopPropagation()
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
        const { data:{message} ,status} = res;
        if (status === 200) {
            setCapsulesState((prevCapsules) =>
                prevCapsules.map((capsule) =>
                  capsule.capsule_id === capsuleid
                    ? { ...capsule, capsule_name: changeName }
                    : capsule
                ));
            setChangeNode(false)
            AlertFunction(true,successGreen,message,3000)
        }
      }
    } catch (error) {
      if(axios.isAxiosError(error)){
        const {status,response,message} = error
        if(status == 500){
          AlertFunction(true,errorRed,'Something went wrong ! please try again',3000)
          return
        }
        else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
          AlertFunction(true,errorRed,response?.data?.message,4000)
       }
    }
  }
  return isChangeNode ? (
    <input
    className="outline-none border px-1 w-[100%]"
    ref={inputref}
      type="text"
      value={changeName}
      onChange={(e) => changeCapsuleName(e)}
      onKeyDown={(e) => updateCapsuleName(e)}
    />
  ) : (
    <div onClick={changeNode}>
      {changeName.substring(0,30)}
    </div>
  );
}
