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
    <div className={`h-18 w-60 text-white rounded-md py-3 px-2 ${alertStateValue?.color} absolute right-1 top-5 z-20`}>
      <span>{alertStateValue?.alertName}</span>
    </div>
  );
}
