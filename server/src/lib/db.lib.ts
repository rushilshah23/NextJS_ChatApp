import { ENV_VAR } from "@/config/env.config";
import mongoose from "mongoose";

export const connectDb  = async()=>{
    try {
         await mongoose.connect(ENV_VAR.MONGO_DB_URL).then(()=>{
            console.log("Connection Successful to Mongo DB")
         })
        
    } catch (error) {
        console.log(error);
    }
}