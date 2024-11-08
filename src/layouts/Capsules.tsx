import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { API_VERSION, DOMAIN } from "../utils/Constant";
import { useRecoilState, useRecoilValue } from "recoil";
import { capsuleFilterState, capsulesStore } from "../recoil/Store";
import ThreedotImg from "../component/ThreedotImg";
import CapsuleName from "../component/CapsuleName";
import CapsuleActionModal from "../component/CapsuleActionModal";

export default function Capsules() {
  const [capsulesState, setCapsulesState] = useRecoilState(capsulesStore);
  const [isTriggerFetch , setTriggerFetch] = useState<boolean>(false)
  const scrollHeight = useRef<HTMLDivElement | null>(null)
  const capuleFilterValue = useRecoilValue(capsuleFilterState)
  console.log(capuleFilterValue);
  
  useEffect(() => {
    const dateModified = new Date().toUTCString();
    fetchCapsules(dateModified);
  }, []);
  useEffect(() => {
    if(isTriggerFetch){
      const lastFetchCapsule = capsulesState[capsulesState.length-1]
      const dateModified= lastFetchCapsule.updated_at
        fetchCapsules(dateModified);
    }
  }, [isTriggerFetch]);
  console.log(capsulesState);

 async function fetchCapsules(dateModified:string | null | Date) {
    try {
      const res = await axios(
        `${DOMAIN}/api/${API_VERSION}/capsules?dateModified=${dateModified}`,
        {
          withCredentials: true,
        }
      );
      const {data:{data}} = await res;
      if (data) {
        setCapsulesState(prv => [...prv , ...data]);
        // setCapsulesState(result.data.data);
        setTriggerFetch(false)
      }
    } catch (error) {
      // setTriggerFetch(false)
      // if(error?.data?.message === 'data is not persent') //////IMPORTANT - handle it perpory might be buf if not resolve yet
      console.log(error);
      
    }
  }
  function triggerfetch(){
        if(scrollHeight.current){
          const divScrollHeight = scrollHeight.current.scrollTop;
          const divHeight = scrollHeight.current.offsetHeight + 2.3;
          // console.log(divScrollHeight,'divScrollHeight');
          // console.log(divHeight,'divHeight');
          if(divHeight < divScrollHeight && !isTriggerFetch){
            setTriggerFetch(true)
          }
          
        }
  }
  return (
    <div ref={scrollHeight} className="border-4 border-white h-[70vh] flex flex-wrap justify-center overflow-y-scroll" onScroll={triggerfetch}>
      {capsulesState &&
        capsulesState.map((element) => {
          return (
            <div
              key={element.capsule_id}
              className="border-2 w-[50%] h-154 m-2 flex justify-between flex-col"
            >
              <ThreedotImg capsuleid={element.capsule_id} />
              <CapsuleActionModal capsuleid={element.capsule_id} />
              <CapsuleName
                name={element.capsule_name}
                capsuleid={element.capsule_id}
              />
            </div>
          );
        })}
    </div>
  );
}
