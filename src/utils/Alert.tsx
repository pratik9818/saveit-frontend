import { useRecoilState, useRecoilValue } from "recoil";
import { alertState, isAlert } from "../recoil/Store";
import { useEffect } from "react";

export default function Alert() {
  const alertStateValue = useRecoilValue(alertState);
  const [isAlertValue, setIsAlert] = useRecoilState(isAlert);
  useEffect(() => {
    if (isAlertValue){
        setTimeout(() => {
          setIsAlert(false);
        }, alertStateValue?.time);
    }
  }, [isAlertValue]);
  return (
    <div className={`h-9 w-44 ml-auto ${alertStateValue?.color}`}>
      <span>{alertStateValue?.alertName}</span>
    </div>
  );
}