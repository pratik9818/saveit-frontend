import { useRecoilState } from "recoil"
import { capsuleActionModalId } from "../recoil/Store"
import CapsuleDelete from "./CapsuleDelete"
import EditCapsuleName from "./EditCapsuleName"
import { useEffect, useRef } from "react"

export default function CapsuleActionModal({capsuleid}:{capsuleid:string}) {
    const [capsuleActionModalIdValue,setCapsuleActionModalId] = useRecoilState(capsuleActionModalId)
    const modalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement
            if (!target.closest('.namediv') && !target.closest('.three-dot-icon') ) {
                setCapsuleActionModalId(null)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, []) // Empty dependency array

    return capsuleActionModalIdValue === capsuleid && (
        <div ref={modalRef} className="namediv absolute flex flex-col justify-between items-center py-2 w-[120px] h-24 right-0 top-[40px] bg-white shadow-lg rounded-md z-50">
            <CapsuleDelete/>
            <EditCapsuleName/>
        </div>
    )
}
