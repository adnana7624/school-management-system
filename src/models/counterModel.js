import mongoose from "mongoose";

const counterschema = new mongoose.Schema({
    name :{
        type : String,
        requried : true
    },
    sequence : {
        type : Number,
        default : 0
    }
},{timestamps:true});

export const Counter = mongoose.model("Counter",counterschema)