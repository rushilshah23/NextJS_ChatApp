import mongoose, { Schema, model } from "mongoose";
import UserInterface from "@/types/User.interface";


const UserSchema = new Schema(
    {
        emailId: {
            type: String,
            required:true,
        },
        authentication:{
            password:{
                type:String,
                required:true,
                select:false
                
            },
            tokenVersion:{
                required:true,
                select:false,
                type:Number
            }
            // salt:{
            //     type:String,
            //     required:true,
            //     select:false
            // }
        
            
        }
    },
    { timestamps: true }
)

export default model('User',UserSchema);