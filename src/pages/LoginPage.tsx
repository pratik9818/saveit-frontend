import { CredentialResponse } from "@react-oauth/google";
import GoogleSignInButton from "../component/GoogleSignInButton";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import useAlertFunction from "../hooks/AlertFunction";
import Loader from "../component/Loader";
import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userLogin } from "../recoil/Store";
import icons from "../utils/Icons";
const domain = DOMAIN;
const apiVersion = API_VERSION;

export default function LoginPage() {
  const AlertFunction = useAlertFunction();
  const setUserLogin = useSetRecoilState(userLogin)
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()
  const handleGoogleSuccess = async (response: CredentialResponse) => {
    if (response.credential) {
      setIsLoading(true)
      try {
        const { status, data: { message } } = await axios.post(
          `${domain}/api/${apiVersion}/auth/google`,
          { token: response.credential },
          { withCredentials: true }
        );
        if (status === 200 || status === 201) {
          setUserLogin(true)
          navigate('/app')
          AlertFunction(true, successGreen, message, 1000);
          setIsLoading(false)
        }
      } catch (error) {
        setUserLogin(false)
        setIsLoading(false)
        if (axios.isAxiosError(error)) {
          const { status, response, message } = error;
          if (status === 500) {
            AlertFunction(true, errorRed, "Something went wrong! Please try again.", 1000);
            return;
          } else if (message === "Network Error") {
            AlertFunction(true, errorRed, "No Internet", 4000);
            return;
          }
          
          AlertFunction(true, errorRed, response?.data?.message, 1000);
        }
      }
    }
  };

  const handleGoogleFailure = () => {
    console.error("Google sign-in error");
    AlertFunction(true, errorRed, "Error in Google sign-in! Please try again.", 4000);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 relative">
        <div className="text-2xl font-bold text-gray-800 mb-4 text-center flex justify-center gap-2">
          <span className="text-[26px]">Welcome to </span> <icons.LogoIcon/>
        </div>
        <p className="text-sm text-gray-600 mb-6 text-center">
          Sign in to continue and access cool feature
        </p>
      {isLoading && <Loader width={34} height={34} top="80px" left="170px"/>}
        <GoogleSignInButton
          onSuccess={handleGoogleSuccess}
          onError={handleGoogleFailure}
        />
      </div>
    </div>
  );
}
