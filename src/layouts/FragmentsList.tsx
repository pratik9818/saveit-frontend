import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  activeCapsule,
  fragmentSearchValue,
  fragmentStore,
  isFragmentSearch,
  selectedFragment,
  userLogin,
} from "../recoil/Store";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_VERSION, DOMAIN, errorRed } from "../utils/Constant";
import FragmentChild from "../component/FragmentChild";
import useAlertFunction from "../hooks/AlertFunction";
import Loader from "../component/Loader";
import NoDataMessage from "../utils/NoDataMessage";

export default function FragmentsList() {
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
  const setSelectedFragment = useSetRecoilState(selectedFragment);
  const currentRequestId = useRef<string>("");
  const abortController = useRef<AbortController | null>(null);
  
  useEffect(() => {
    setSelectedFragment([])

    setIsLoading(true)
    
    // Cancel any ongoing request
    if (abortController.current) {
      abortController.current.abort();
    }
    
    // Create new abort controller for this request
    abortController.current = new AbortController();
    const newRequestId = Date.now().toString();
    currentRequestId.current = newRequestId;

    if (isFragmentSearchState) {
      setFragmentStore([]);
      const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments/search?searchValue=${fragmentSearchValues}&capsuleId=${activeCapsuleValue}`;
      getFragments(endPoint, newRequestId, abortController.current.signal);
      return;
    }
    setFragmentStore([]);
    const dateCreated = new Date().toUTCString();
    const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments?createdAt=${dateCreated}&capsuleId=${activeCapsuleValue}`;
    getFragments(endPoint, newRequestId, abortController.current.signal);

    // Cleanup function
    return () => {
      if (abortController.current) {
        abortController.current.abort();
      }
    };
  }, [fragmentSearchValues,activeCapsuleValue]);

  useEffect(() => {

    if (isTriggerFetch && !isFragmentSearchState) {
      const lastFetchFragment =
        fragmentStoreState[fragmentStoreState.length - 1];
      const dateCreated = lastFetchFragment.created_at;
      const endPoint = `${DOMAIN}/api/${API_VERSION}/fragments?createdAt=${dateCreated}&capsuleId=${activeCapsuleValue}`;
      
      // Create new abort controller for this request
      if (abortController.current) {
        abortController.current.abort();
      }
      abortController.current = new AbortController();
      const newRequestId = Date.now().toString();
      currentRequestId.current = newRequestId;
      
      getFragments(endPoint, newRequestId, abortController.current.signal);
    }
  }, [isTriggerFetch]);
  

  async function getFragments(url: string, requestId: string, signal: AbortSignal) {
    try {
      const {
        data: { data},
        status,
      } = await axios.get(url, {
        withCredentials: true,
        signal
      });
      // console.log(data);
      if (status === 200 && requestId === currentRequestId.current) {
        setFragmentStore((prv) => [...prv, ...data]);
        setTriggerFetch(false);
        setIsLoading(false)
        setUserLogin(true)
      }
    } catch (error) {
      // Ignore aborted request errors
      if (axios.isAxiosError(error) && error.name === 'CanceledError') {
        return;
      }

      setTriggerFetch(false);
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
          AlertFunction(true, errorRed, 'No Internet', 2000);
          return
        }
        AlertFunction(true, errorRed, response?.data?.message, 1000);
      }
    }
  }
  function triggerfetch() {
    if (scrollHeight.current  && fragmentStoreState.length > 0) {
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
      className="h-[80%] overflow-y-scroll relative flex flex-col-reverse"
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
