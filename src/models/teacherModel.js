import mongoose from "mongoose";

const teacherschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase : true
    },
    password : {
        type : String,
        required : true
    },
    gender :{
        type : String,
        enum : ["male","female","other"],
        default : ""
    },
    role : {
        type : String,
        enum : ["teacher"],
        default : ""
    },
    employeeId:{
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    qualification:{
        type : String,
        trim : true
    },
    address : {
        type : String,
        trim : true
    },
    joiningDate : {
        type : Date
    },
    profileImage : {
        type : String
    }
},{timestamps : true})

export const Teacher = mongoose.model("Teacher",teacherschema);