import { atom } from "recoil";
import { alertStateType, createCapsuleModalType, isAlertType } from "../types/Types";

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

