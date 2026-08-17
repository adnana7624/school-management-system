import mongoose from "mongoose";

const parentschema = new mongoose.Schema({
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        trim : true
    },
    address : {
        type : String,
        trim : true
    },
    children : [
        {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Student",
        }
    ]
},{timestamps : true})

export const Parent = mongoose.model("Parent",parentschema);