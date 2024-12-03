import { useSetRecoilState } from "recoil";
import { alertState, isAlert } from "../recoil/Store";
export default function useAlertFunction() {
    const setIsalert = useSetRecoilState(isAlert)
    const setAlertState = useSetRecoilState(alertState)
    return (alert: boolean, color: string, alertName: string, time: number) => {
        setIsalert(alert);
        setAlertState({
          color: color,
          alertName: alertName,
          time: time,
        });
      };
}
