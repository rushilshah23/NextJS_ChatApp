import { Document } from "mongodb";

interface Authentication{
    password?:string;
    tokenVersion:number;
}

export default interface UserInterface  extends Document {
    userId:string;
    emailId:string;
    authentication: Authentication;


}