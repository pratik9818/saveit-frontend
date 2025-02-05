import { useRecoilValue } from "recoil";
import { useEffect, useRef } from "react";
import ActiveCapsuleName from "../component/ActiveCapsuleName";
import CapsuleLayoutVisbilityBtn from "../component/CapsuleLayoutVisbilityBtn";
import FragmentSearch from "../component/FragmentSearch";
import { capsuleLayoutVisbility } from "../recoil/Store";
import { breakFragmentPixel } from "../utils/Constant";
import FragmentUploadStatus from "../component/FragmentUploadStatus";

const FragmentNavbar = () => {
  const isCapsuleVisible = useRecoilValue(capsuleLayoutVisbility);
  const navbarRef = useRef<HTMLDivElement>(null);
  const clientWidth = window.innerWidth; // Using window.innerWidth for better browser compatibility

  const updateNavbarWidth = () => {
    if (!navbarRef.current) return;
    
    if (isCapsuleVisible) {
      navbarRef.current.style.width = "45%";
    } else {
      navbarRef.current.style.width = breakFragmentPixel > clientWidth ? "100%" : "5%";
    }
  };

  useEffect(() => {
    updateNavbarWidth();
    
    // Add resize listener for responsive updates
    const handleResize = () => updateNavbarWidth();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, [isCapsuleVisible, clientWidth]);

  const isMobile = breakFragmentPixel > clientWidth;

  return (
    <nav className="flex flex-col md:flex-row w-full ml-auto mt-1">
      <div ref={navbarRef} className="w-full flex items-center justify-between">
        {!isCapsuleVisible && <CapsuleLayoutVisbilityBtn />}
        {isMobile && <ActiveCapsuleName />}
      </div>
      <div className="flex w-full ml-auto justify-center">
        {!isMobile && <ActiveCapsuleName />}
        <FragmentSearch />
      </div>
      {     <FragmentUploadStatus/>
      }
    </nav>
  );
};

export default FragmentNavbar;
