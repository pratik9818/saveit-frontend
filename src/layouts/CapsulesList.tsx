import axios from "axios";
import { memo, useEffect, useRef, useState } from "react";
import { API_VERSION, DOMAIN, errorRed } from "../utils/Constant";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeCapsule,
  capsulesStore,
  fragmentStore,
  searchValue,
  userLogin,
} from "../recoil/Store";
import ThreedotImg from "../component/ThreedotImg";
import CapsuleName from "../component/CapsuleName";
import CapsuleActionModal from "../component/CapsuleActionModal";

import useAlertFunction from "../hooks/AlertFunction";
import Loader from "../component/Loader";

const CapsulesList = ()=>{
  const [activeCapsuleValue, setActiveCapsule] = useRecoilState(activeCapsule);
  const AlertFunction = useAlertFunction();
  const [capsulesState, setCapsulesState] = useRecoilState(capsulesStore);
  const setFragmentStore = useSetRecoilState(fragmentStore); 
  const [isTriggerFetch, setTriggerFetch] = useState<boolean>(false);
  const scrollHeight = useRef<HTMLDivElement | null>(null);
  const searchValueState = useRecoilValue(searchValue);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUserLogin = useSetRecoilState(userLogin);

  const folderColors = [
    "bg-green-300",
    "bg-blue-300",
    "bg-yellow-300",
    "bg-red-300",
    "bg-purple-300",
    "bg-pink-300",
    "bg-gray-300",
  ];
  useEffect(() => {
    setIsLoading(true);
    setCapsulesState([]);
    const dateModified = new Date().toUTCString();
    if (!searchValueState.length) fetchCapsules(dateModified);
    else if (searchValueState.length) searchCapsule();
  }, [searchValueState]);
  useEffect(() => {
    if (isTriggerFetch && !searchValueState.length) {
      const lastFetchCapsule = capsulesState[capsulesState.length - 1];
      const dateModified = lastFetchCapsule.updated_at;
      fetchCapsules(dateModified);
    }
  }, [isTriggerFetch]);

  async function fetchCapsules(dateModified: string | null | Date) {
    try {
      const {
        data: { data },
      } = await axios(
        `${DOMAIN}/api/${API_VERSION}/capsules?dateModified=${dateModified}`,
        {
          withCredentials: true,
        }
      );

      if (data) {
        setCapsulesState((prv) => [...prv, ...data]);
        setTriggerFetch(false);
        setIsLoading(false);
        setUserLogin(true);
      }
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        const { status, response, message } = error;

        if (status == 500) {
          // setUserLogin(true)
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
    }
  }
  async function searchCapsule() {
    try {
      const {
        data: { data },
        status,
      } = await axios(
        `${DOMAIN}/api/${API_VERSION}/capsules/search?searchValue=${searchValueState}`,
        { withCredentials: true }
      );
      if (status === 200) {
        setCapsulesState(data);
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
    }
  }

  function triggerfetch() {
    if (scrollHeight.current) {
      const scrollTop = scrollHeight.current.scrollTop;
      const clientHeight = scrollHeight.current.clientHeight;
      const scrollHeightTotal = scrollHeight.current.scrollHeight;

      // Trigger fetch when scrolled within 200px from the bottom
      if (
        scrollHeightTotal - (scrollTop + clientHeight) < 200 &&
        !isTriggerFetch
      ) {
        setTriggerFetch(true);
      }
    }
  }

  function redirectFragmentPage(
    capsuleid: string,
    e: React.MouseEvent<HTMLDivElement>
  ) {
    e.stopPropagation();
    setFragmentStore([]);
    // Force a re-fetch even if clicking the same capsule by first clearing it
    if (activeCapsuleValue === capsuleid) {
      setActiveCapsule("");
      setTimeout(() => setActiveCapsule(capsuleid), 0);
    } else {
      setActiveCapsule(capsuleid);
    }
  }
  return (
    <div
      ref={scrollHeight}
      className="h-[60vh] md:h-[70%] flex flex-col overflow-y-scroll"
      onScroll={triggerfetch}
    >
      {isLoading ? (
        <Loader width={40} height={40} top={"50vh"} left={"50%"} />
      ) : capsulesState.length ? (
        capsulesState.map((element, index) => {
          return (
            <div
              key={element.capsule_id}
              className={`relative w-[90%] flex justify-around items-center shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition duration-300 m-2 px-1 ${
                folderColors[index % folderColors.length]
              }  ${
                activeCapsuleValue == element.capsule_id
                  ? "border border-gray-950"
                  : ""
              }`}
            >
              <div
                onClick={(e) => redirectFragmentPage(element.capsule_id, e)}
                className="cursor-pointer w-[90%] h-[70px] flex items-center "
              >
                <CapsuleName
                  name={element.capsule_name}
                  capsuleid={element.capsule_id}
                  bgColor={folderColors[index % folderColors.length]}
                />
                {/* <div className="text-[12px]">
                {formatDateTime(element.created_at)}
                </div> */}
              </div>
              <ThreedotImg capsuleid={element.capsule_id} />
              <CapsuleActionModal capsuleid={element.capsule_id} />
            </div>
          );
        })
      ) : (
        <h2 className="text-center mt-28 font-bold">Create Capsule</h2>
      )}
    </div>
  );
}
export default memo(CapsulesList);