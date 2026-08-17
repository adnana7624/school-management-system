import { Teacher } from "../models/teacherModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {generateEmployeId} from "../utils/generateId.js";
import { uploadOnCloudinary } from "../middleware/cloudinary.js";


export const createTeacher = async(req , res)=>{
    try {
        const {
            name,email,password , phone , qualification , address , joiningDate } = req.body;

        // checck all field are send by frontend
        if(!name ||!email ||!password ||!phone ){
            return res.status(400).json({message : "all fields are required"})
        }

        // check if this email already registered
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(409).json({message : "teacher with this email already existed"})
        }

        // gerenate employeeId
        // const teacherCount = await Teacher.countDocuments();
        //const employeeId = `T-${String(teacherCount + 1).padStart(3,"0")}`;
        const employeeId = await generateEmployeId();

        // encrypt password
        const hashPassword = await bcrypt.hash(password,10)

        // upload profile image
        let profileImageurl = "";
        if(req.file){
            const result = await uploadOnCloudinary(req.file.path)
            if(result){
                profileImageurl = result;
            }
        }

        // create user
        const user = await User.create({
            name,
            email,
            password : hashPassword,
            role : "teacher"
        })

        // create teacher profile
        const teacher = await Teacher.create({
            user : user._id,
            employeeId,
            phone,
            qualification,
            address,
            joiningDate,
            profileImage : profileImageurl
        })

        return res.status(201).json({
            success : true,
            message : "Teacher Created Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}