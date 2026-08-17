import {Counter} from "../models/counterModel.js"

export const generateEmployeId = async(req , res)=>{
    const counter = await Counter.findOneAndUpdate(
        {name : "teacher"},
        {$inc : {sequence: 1}},
        {
            returnDocument : "after",
            upsert : true
        }
    );
    const employeeId = `T-${String(counter.sequence).padStart(3,"0")}`;
    return employeeId;
};
