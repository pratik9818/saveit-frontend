import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeCapsule,
  fragmentSearchValue,
  fragmentStore,
  isFragmentSearch,
  userLogin,
} from "../recoil/Store";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed } from "../utils/Constant";
import FragmentChild from "./FragmentChild";
import useAlertFunction from "../hooks/AlertFunction";
import Loader from "./Loader";
import NoDataMessage from "../utils/NoDataMessage";

export default function Fragments() {
  const [fragmentStoreState, setFragmentStore] = useRecoilState(fragmentStore);
  const activeCapsuleValue = useRecoilValue(activeCapsule);
  const scrollHeight = useRef<HTMLDivElement | null>(null);
  const [isTriggerFetch, setTriggerFetch] = useState<boolean>(false);
  const fragmentSearchValues = useRecoilValue(fragmentSearchValue);
  const isFragmentSearchState = useRecoilValue(isFragmentSearch);
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const AlertFunction = useAlertFunction()
  const clientWidth = document.body.clientWidth;
  const setUserLogin = useSetRecoilState(userLogin)
  useEffect(() => {
    setIsLoading(true)
    if (isFragmentSearchState) {
      setFragmentStore([]);
      const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments/search?searchValue=${fragmentSearchValues}&capsuleId=${activeCapsuleValue}`;
      getFragments(endPoint);
      return;
    }
    setFragmentStore([]);
    const dateCreated = new Date().toUTCString();
    const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments?createdAt=${dateCreated}&capsuleId=${activeCapsuleValue}`;
    getFragments(endPoint);
  }, [fragmentSearchValues]);

  useEffect(() => {
    if (isTriggerFetch && !isFragmentSearchState) {
      const lastFetchFragment =
        fragmentStoreState[fragmentStoreState.length - 1];
      const dateCreated = lastFetchFragment.created_at;
      const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments?createdAt=${dateCreated}&capsuleId=${activeCapsuleValue}`;
      getFragments(endPoint);
    }
  }, [isTriggerFetch]);

  async function getFragments(url: string) {
    try {
      const {
        data: { data},
        status,
      } = await axios.get(url, {
        withCredentials: true,
      });
      // console.log(data);
      if (status === 200) {
        setFragmentStore((prv) => [...prv, ...data]);
        setTriggerFetch(false);
        setIsLoading(false)
        setUserLogin(true)
      }
    } catch (error) {
      setIsLoading(false)
      if (axios.isAxiosError(error)) {
        const { status, response ,message} = error;
        if (status == 500) {
          // setUserLogin(false)
          AlertFunction(
            true,
            errorRed,
            "Something went wrong ! please try again",
            3000
          );
          return;
        }else if(message == 'Network Error'){
          AlertFunction(true, errorRed, 'No Internet', 4000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 4000);
      }
    }
  }
  function triggerfetch() {
    if (scrollHeight.current) {
      const scrollTop = scrollHeight.current.scrollTop;
      const scrollHeightTotal = scrollHeight.current.scrollHeight;
      const clientHeight = scrollHeight.current.clientHeight;
      if (
        scrollTop <= -(scrollHeightTotal - clientHeight - 10) &&
        !isTriggerFetch
      ) {
        setTriggerFetch(true);
      }
    }
  }
  return isLoading ? (
    <Loader width={40} height={40} top={'50vh'} left={'50vw'}/>
  ) : (
    <div
      className="h-[80%] border overflow-y-scroll relative top-10 flex flex-col-reverse  mt-2"
      ref={scrollHeight}
      onScroll={triggerfetch}
    >
      {fragmentStoreState.length ? fragmentStoreState.map((element) => {
        return <FragmentChild fragmentdetails={element} clientwidth={clientWidth}/>;
      }):
      <NoDataMessage messageType={'Fragments'} />
      }
    </div>
  );
}
