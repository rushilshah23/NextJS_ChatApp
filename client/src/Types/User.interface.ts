

interface Authentication{
    password?:string;
    tokenVersion:number;
}

export default interface UserInterface {
    userId:string;
    emailId:string;
    authentication: Authentication;


}   