import FragmentUpload from "../component/FragmentUpload"
import { useRecoilValue, useSetRecoilState } from "recoil"
import { activeCapsule, screenShot } from "../recoil/Store"
import { useEffect } from "react"
import FragmentSelectModal from "../component/FragmentSelectModal"
import FragmentsList from "./FragmentsList"
import FragmentNavbar from "./FragmentNavbar"
import DefaultPage from "../pages/DefaultPage"

export default function FragmentLayout() {
    const activeCapsuleValue = useRecoilValue(activeCapsule)
    const setScreenShot = useSetRecoilState(screenShot)
  
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (items) {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.type.startsWith("image/")) {
            const file = item.getAsFile();
            if (file) {
              const timestamp = Date.now();
              const newFile = new File([file], `screenshot_${timestamp}.${file.name.split('.').pop()}`, {
                type: file.type,
              });
              setScreenShot(newFile);
            }
          }
        }
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => {
      window.removeEventListener("paste", handlePaste);
    };
  }, []);
  return activeCapsuleValue ? (
    <div className={`relative h-[100%] w-[100%] flex flex-col bg-gray-100`}>
      <FragmentNavbar/>
     <FragmentSelectModal/>
    <FragmentsList/>
     <FragmentUpload/>
    
    </div>
  ) :<DefaultPage/>
}
