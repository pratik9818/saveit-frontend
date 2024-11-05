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
    user_id:string,
    capsule_name:string,
    capsule_size:number,
    created_at:Date,
    updated_at:string,
    is_deleted:boolean
}

