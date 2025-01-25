import { atom } from "recoil";
import {activeCapsuleType, activeFrgamentTextType, alertStateType, CapsuleActionModalOpenType, capsuleType, createCapsuleModalType, expandNoteModalType, fragmentSearchValueType, fragmentType, isAlertType, isCapsulesFilterModalType,  isEditTextModalOpenType,  isFragmentSearchType,  newFragmentNoteType,  searchValueType } from "../types/Types";

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
export const isCapsulesFilterModalOpen = atom<isCapsulesFilterModalType>({
    key:'capsules filter modal',
    default:false
})

// export const isSearch = atom<isSearchType>({
//     key:'search type',
//     default:false
// })

export const searchValue = atom<searchValueType>({
    key:'search value',
    default:''
})
export const activeCapsule = atom<activeCapsuleType>({
    key:'active capsule',
    default:null
})
export const newFragmentNote = atom<newFragmentNoteType>({
    key:'new fragment note',
    default:''
})
export const expandNoteModal = atom<expandNoteModalType>({
    key:'expand note modal',
    default:false
})

export const fragmentStore = atom<fragmentType[]>({
    key:'all fragments',
    default:[]
})
export const activeFrgamentText = atom<activeFrgamentTextType>({
    key:'active frgmanet text to edit',
    default:null
})
export const isEditTextModalOpen = atom<isEditTextModalOpenType>({
    key:'edit modal state',
    default:false
})
export const isFragmentSearch = atom<isFragmentSearchType>({
    key:'fragment search',
    default:false
})
export const fragmentSearchValue = atom<fragmentSearchValueType>({
    key:'fragment search value',
    default:null
})
export const userLogin = atom<boolean>({
    key:'user login state',
    default:false
})

export const feedbackModal = atom<boolean>({
    key:'feedback form modal state',
    default:false
})

export const screenShot = atom<null | File>({
    key:'screen shot',
    default:null
})

export const selectedFragment = atom<fragmentType[]>({
    key:'selected fragment',
    default:[]
})

