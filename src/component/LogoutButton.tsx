import axios from "axios";
import { API_VERSION, DOMAIN, errorRed, successGreen } from "../utils/Constant";
import { useNavigate } from "react-router-dom";
import useAlertFunction from "../hooks/AlertFunction";
import { useRecoilState } from "recoil";
import { userLogin } from "../recoil/Store";
import { useEffect } from "react";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [userLoginState, setUserLogin] = useRecoilState(userLogin);
  const AlerFunction = useAlertFunction();
  useEffect(() => {
    if (userLoginState) localStorage.setItem("is_user_login", "true");
    else localStorage.setItem("is_user_login", "false");
  }, [userLoginState]);
  const handleLogout = async () => {
    if (!userLoginState) return navigate("/app/auth");
    try {
      const {
        status,
        data: { message },
      } = await axios.post(
        `${DOMAIN}/api/${API_VERSION}/logout`,
        {},
        {
          withCredentials: true,
        }
      ); // Call your logout endpoint

      if (status == 200) {
        setUserLogin(false);
        localStorage.setItem("is_user_login", "false");
        AlerFunction(true, successGreen, message, 4000);
      }
      // Optionally redirect to login or home page
      navigate("/app/auth");
    } catch (error) {
      setUserLogin(true);
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;
        if (status == 500) {
          AlerFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            4000
          );
          return;
        } else if (message == "Network Error") {
          AlerFunction(true, errorRed, "No Internet", 4000);
          return;
        }
        AlerFunction(true, errorRed, response?.data?.message, 2000);
      }
    }
  };
  return (
    <div className="sm:mr-4">
      <button
        onClick={handleLogout}
        className="w-[75px] bg-gray-300 px-2 py-1 rounded-sm shadow-md hover:bg-red-600 transition duration-300"
      >
        {userLoginState ? "Logout" : "Login"}
      </button>
    </div>
  );
}
