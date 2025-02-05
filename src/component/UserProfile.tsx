import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_VERSION, DOMAIN, errorRed } from '../utils/Constant';
import useAlertFunction from '../hooks/AlertFunction';
import { useRecoilState } from 'recoil';
import { isUserProfileModalOpen } from '../recoil/Store';

export default function UserProfile() {
  const [username, setUsername] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useRecoilState(isUserProfileModalOpen);
const AlertFunction = useAlertFunction();
  useEffect(() => {
    const fetchUsername = async () => {
      const storedUsername = localStorage.getItem('username');
      
      if (storedUsername) {
        setUsername(storedUsername);
        setLoading(false);
      } else {
        try {
          const {status , data :{message,username}} = await axios(`${DOMAIN}/api/${API_VERSION}/user/name`, {
            withCredentials: true,
          });
          console.log(status,message,username);
          const fetchedUsername = username;
          localStorage.setItem('username', fetchedUsername);
          setUsername(fetchedUsername);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const { status, response, message } = error;
                if (status == 500) {
                  AlertFunction(
                    true,
                    errorRed,
                    "Something went wrong ! please try again",
                    4000
                  );
                  return;
                } else if (message == "Network Error") {
                  AlertFunction(true, errorRed, "No Internet", 2000);
                  return;
                }
                AlertFunction(true, errorRed, response?.data?.message, 1000);
              }
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsername();
  }, []);

  const getProfileLetter = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
      <div onClick={()=>!isModalOpen ? setIsModalOpen(true):setIsModalOpen(false)} className="user-logo w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors duration-300">
        {username && (
          <span className="text-white text-xl font-bold">
            {getProfileLetter(username)}
          </span>
        )}
    </div>
  );
}
