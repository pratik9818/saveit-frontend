import { atom } from "recoil";
import { alertStateType, CapsuleActionModalOpenType, capsuleType, createCapsuleModalType, isAlertType } from "../types/Types";

export const isAlert = atom<isAlertType>({
    key:'alert',
    default:false
})
export const alertState = atom<alertStateType>({
    key:'alert state',
    default:null
})
export const isCreateCapsuleModalOpen = atom<createCapsuleModalType>({
    key:'create capsules modal',
    default:false
})
export const capsulesStore = atom<capsuleType[]>({
    key:'capsule store',
    default:[]
})
// export const capsuleActions = atom<capsuleActionsType[]>({
//     key:'capsule action',
//     default:[]
// })
export const capsuleActionModalId = atom<CapsuleActionModalOpenType>({
    key:'capsule action modal',
    default:null
})

