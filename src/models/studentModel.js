import mongoose from "mongoose";

const studentschema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    rollNumber : {
        type : String,
        required : true,
        unique : true,
        trim : true
    },
    dateOfBirth:{
        type : Date
    },
    gender :{
        type : String,
        enum :["male", "female", "other"]
    },
    address :{
        type : String,
        trim : true
    },
    profileImage:{
        type : String
    }
},{timestamps : true})

export const Student = mongoose.model("Student",studentschema);