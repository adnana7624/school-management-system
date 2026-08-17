import mongoose from "mongoose";

const teacherschema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
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
},{timeseries : true})

export const Teacher = mongoose.model("Teacher",teacherschema);