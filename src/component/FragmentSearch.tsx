import { useRecoilState, useSetRecoilState } from "recoil";
import { fragmentSearchValue, isFragmentSearch, selectedFragment } from "../recoil/Store";
import { useState } from "react";
export default function FragmentSearch() {
  const setFragmentSearch = useSetRecoilState(fragmentSearchValue);
  const setIsFragmentSearch = useSetRecoilState(isFragmentSearch);
    const [selectedFragmentValue ,setSelectedFragment] = useRecoilState(selectedFragment);
 
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
      <input
        type="text"
        onChange={(e) => searching(e)}
        placeholder="Search fragment by tag , file name and text content"
        className="w-[99%] md:w-[70%] md:mr-1 border border-gray-300 rounded-md shadow-sm focus:outline-none p-2"
      />
  );
}
