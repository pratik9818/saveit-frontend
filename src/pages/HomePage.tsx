import { useEffect } from "react";
import CapsuleLayout from "../layouts/CapsuleLayout";
import FragmentLayout from "../layouts/FragmentLayout";
export default function HomePage() {
  useEffect(()=>{
    document.title = "Saveit.tech - Organize your content neatly into capsules";
},[])

  return (
    <div className="flex w-[100%] h-[99vh]">
      <CapsuleLayout/>
      <FragmentLayout/>
    </div>
  )
}
