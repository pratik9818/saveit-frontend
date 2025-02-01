import { useRecoilState, useSetRecoilState } from "recoil";
import {fragmentSearchValue, isFragmentSearch, selectedFragment } from "../recoil/Store";
import {useState } from "react";
// import LogoutButton from "./LogoutButton";
// import icons from "../utils/Icons";
import { useNavigate } from "react-router-dom";

export default function FragmentSearch() {
  const navigate = useNavigate();
  const setFragmentSearch = useSetRecoilState(fragmentSearchValue);
  // const capsules = useRecoilValue(capsulesStore)
  const setIsFragmentSearch = useSetRecoilState(isFragmentSearch);
    const [selectedFragmentValue ,setSelectedFragment] = useRecoilState(selectedFragment);
  // const activeCapsuleId = useRecoilValue(activeCapsule);
  // const [activeCapsuleName,setActiveCapsuleName] = useState<string>("")
  // useEffect(() => {
  //   const activeCapsuleObj = capsules.filter(capsule => capsule.capsule_id == activeCapsuleId)
  //   setActiveCapsuleName(activeCapsuleObj[0]?.capsule_name)
  // }, [])
  const updateTime = 700;
  const [typing, setTyping] = useState<NodeJS.Timeout | null>(null);

  function searching(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if(value && selectedFragmentValue.length) {
      setSelectedFragment([])
    }
    if (typing) {
      clearTimeout(typing);
    }
    const timoutId = setTimeout(() => {
      setFragmentSearch(value);
      if (!value.length) {
        setIsFragmentSearch(false);
        return;
      }
      setIsFragmentSearch(true);
    }, updateTime);

    setTyping(timoutId);
  }
  return (
    <div className="flex justify-center my-1 w-[100%]">
      <input
        type="text"
        onChange={(e) => searching(e)}
        placeholder="Search fragment by tag , file name and text content"
        className="w-full md:max-w-[45%] border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black p-2"
      />
      {/* <div className="border rounded-sm px-1 mr-6 font-bold text-slate-500 pt-1 bg-slate-100">Capsule {'>'} {activeCapsuleName?.substring(0,20)}</div> */}
      {/* <LogoutButton/> */}
      
    </div>
  );
}
