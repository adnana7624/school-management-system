import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        unique : true,
        lowercase : true,
        trim : true
    },
    gender:{
        type : String,
        enum :["male", "female", "other"]
    },
    password:{
        type : String,
        required : true,
        minlenght : 6
    },
    role :{
        type : String,
        enum :["admin","teacher","student","parent"],
        default :"student"
    }
},{timestamps : true})

export const User = mongoose.model("User",userschema)