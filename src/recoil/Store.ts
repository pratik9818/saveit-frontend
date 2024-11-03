import { atom } from "recoil";
import { alertStateType, isAlertType } from "../types/Types";

export const isAlert = atom<isAlertType>({
    key:'alert',
    default:false
})
export const alertState = atom<alertStateType>({
    key:'alert state',
    default:null
})
