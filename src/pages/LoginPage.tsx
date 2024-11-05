import { CredentialResponse } from "@react-oauth/google";
import GoogleSignInButton from "../component/GoogleSignInButton";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { alertState, isAlert } from "../recoil/Store";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
const domain = DOMAIN;
const apiVersion = API_VERSION
export default function LoginPage() {
  const setIsalert = useSetRecoilState(isAlert)
  const setAlertState = useSetRecoilState(alertState)
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
     try {
      const res = axios.post(`${domain}/api/${apiVersion}/auth/google`, {
        token: response.credential,
      },
      {
        withCredentials: true,
      }
    );
      const result = await res;
      
      if(result.status === 200){
        setIsalert(true);
        setAlertState({
          color:successGreen,
          alertName:result.data.message,
          time:4000
        })
      }
      else if(result.status === 201){
        setIsalert(true);
        setAlertState({
          color:successGreen,
          alertName:result.data.message,
          time:4000
        })
      }
      else{
        setIsalert(true);
        setAlertState({
          color:errorRed,
          alertName:'Something went wrong ! please try again',
          time:4000
        })
      }
     } catch (error) {
      console.log(error);
      setIsalert(true);
      setAlertState({
        color:errorRed,
        alertName:'Something went wrong ! please try again',
        time:4000
      })
     }
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google sign-in error");
    setIsalert(true);
    setAlertState({
      color:'red',
      alertName:'Error in google signin ! please try again',
      time:4000
    })
  };

  return (
    <div className=" w-44 my-[40vh] mx-auto">
      <GoogleSignInButton
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleFailure}
      />
    </div>
  );
}
