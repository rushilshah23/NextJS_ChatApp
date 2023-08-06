
export interface AccessTokenPayload {
    userId:string;
    emailId:string;
}
export interface RefreshTokenPayload{
    userId:string;
    emailId:string;
    versionId:number;
}

export interface AccessToken extends AccessTokenPayload{
    exp:number;

}
export interface RefreshToken extends RefreshTokenPayload {
    exp: number;
}

export enum TokenExpiration {
    Access =  60,
    Refresh = 3 * 60,
    RefreshIfLessThan =  1 * 60,
}