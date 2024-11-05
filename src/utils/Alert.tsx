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
  return isAlertValue && (
    <div className={`h-18 w-56 border rounded-md p-1 ${alertStateValue?.color} absolute right-0`}>
      <span>{alertStateValue?.alertName}</span>
    </div>
  );
}
