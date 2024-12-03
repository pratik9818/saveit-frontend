import { useSetRecoilState } from "recoil";
import { fragmentSearchValue, isFragmentSearch } from "../recoil/Store";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function FragmentSearch() {
  const setFragmentSearch = useSetRecoilState(fragmentSearchValue);
  const setIsFragmentSearch = useSetRecoilState(isFragmentSearch);
  const updateTime = 700;
  const [typing, setTyping] = useState<NodeJS.Timeout | null>(null);

  function searching(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
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
    <div className="fixed flex w-[100%] py-1">
      <input
        type="text"
        onChange={(e) => searching(e)}
        placeholder="search fragment by tag , file name and text content"
        className="w-full md:max-w-[60%] mr-auto p-2 mx-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <LogoutButton/>
    </div>
  );
}
