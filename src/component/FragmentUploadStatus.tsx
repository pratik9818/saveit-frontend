import { useRecoilState } from "recoil"
import { selectedFragmentCountToUpload, uploadedFragmentCount } from "../recoil/Store"
import { useEffect, useRef} from "react"

export default function FragmentUploadStatus() {
    //IMPRTANT PROGRESS BAR GET STUCK AT END WHEN USER UPLOAD CONTINUOUSLY WIHOTU WATING OF FRAGAMENT UPLOAING ! NEED TO FIX THIS ISSUE
    const [uploadedFragmentCountValue, setUploadedFragmentCountValue] = useRecoilState(uploadedFragmentCount)
    const [fragmentCountValue, setFragmentCountValue] = useRecoilState(selectedFragmentCountToUpload)
    const totalSteps = fragmentCountValue +3
    // i added 3 because there are 3 steps (validation , getting presign url and upload on db) i want to show there progress too
    const statusBar = useRef<HTMLDivElement>(null)
    // Calculate progress percentage
    const progressPercentage = (uploadedFragmentCountValue / totalSteps) * 100

    useEffect(() => {
        if(totalSteps === uploadedFragmentCountValue) {
           const timer =  setTimeout(() => {
                setUploadedFragmentCountValue(0)
            setFragmentCountValue(0)
            }, 1000);
            return () => clearTimeout(timer)
        }
    }, [uploadedFragmentCountValue, totalSteps])

    return fragmentCountValue>0 && (
        <div className="fixed top-12 left-0 right-0 z-10">
            <div ref={statusBar} className="w-[99%] mx-auto h-2 bg-gray-200 overflow-hidden">
                <div 
                    className="h-full bg-blue-500 transition-all duration-300 ease-out"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    )
}
