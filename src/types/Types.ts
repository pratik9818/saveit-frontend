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