import { useSetRecoilState } from "recoil";
import { searchValue } from "../recoil/Store";
import { useState } from "react";
import icons from "../utils/Icons";

export default function Search() {
  const updateTime = 1000;
  const [typing, setTyping] = useState<NodeJS.Timeout | null>(null);
  const setSearchValue = useSetRecoilState(searchValue);

  function onSearch(e: React.ChangeEvent<HTMLInputElement>) {
    if (typing) {
      clearTimeout(typing);
    }
    const timoutId = setTimeout(() => {
      setSearchValue(e.target.value);
    }, updateTime);

    setTyping(timoutId);
  }

  return (
    <div className="md:w-[51%] w-[100%] flex items-center">
      <icons.LogoIcon />
      <input
        type="search"
        placeholder="Search Capsules Name"
        onChange={(e) => onSearch(e)}
        className="w-full md:max-w-[500px] p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
