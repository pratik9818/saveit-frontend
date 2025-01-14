import { CredentialResponse } from "@react-oauth/google";
export interface googleSignInRes {
    onSuccess:(response: CredentialResponse)=>void,
    onError:()=>void
}
export interface alertStateInterface {
    color:string,
    alertName : string,
    time:number
}
export type alertStateType = alertStateInterface | null

export type isAlertType = boolean

export type createCapsuleModalType = boolean

export interface capsuleType {
    capsule_id:string,
    user_id:string, //it should not here that is in client side ----ALERT
    capsule_name:string,
    capsule_size:number,
    created_at:Date,
    updated_at:string | null | Date ,
    is_deleted:boolean
}

// export interface capsuleActionsType{
    
// }
export type CapsuleActionModalOpenType = string | null
export type isCapsulesFilterModalType = boolean
// export type isSearchType = boolean
export type searchValueType = string
export type activeCapsuleType = string | null
export type newFragmentNoteType = string
export type expandNoteModalType = boolean
export type activeFrgamentTextType = string | null
export type isEditTextModalOpenType = boolean 
export type isFragmentSearchType = boolean 
export type fragmentSearchValueType = string | null

export interface fragmentType {
    fragment_id:string,
    capsule_id:string | null,
    size:number | null, //it should not here that is in client side ----ALERT
    fragment_type:string,
    tag:string,
    reminder:boolean,
    download_count:number,
    url:string | null,
    text_content:string | null,
    file_name:string | null,
    created_at:Date | string,
    updated_at:string | null | Date ,
    is_deleted:boolean
}


