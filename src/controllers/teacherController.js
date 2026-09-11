import { Teacher } from "../models/teacherModel.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import {generateEmployeId} from "../utils/generateId.js";
import { uploadOnCloudinary } from "../middleware/cloudinary.js";


export const createTeacher = async(req , res)=>{
    try {
        const {name,email,password , phone , qualification , address , joiningDate,gender } = req.body;

        // checck all field are send by frontend
        if(!name ||!email ||!password ||!phone || !gender){
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

        // create teacher profile
        const teacher = await Teacher.create({
            name,
            email,
            password : hashPassword,
            gender,
            role : "teacher",
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

export const getTeacher = async(req , res) =>{
    try {
        const adminId = req.user.id;

        const teacher = await Teacher.find(adminId);
        
        return res.status(200).json({
            success : true,
            count : teacher.length,
            teacher
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const deleteTeacher = async(req , res) => {
    try {
        const {id} = req.params;

        const teacher = await Teacher.findById(id)
        if(!teacher){
            return res.status(404).json({message : "teacher not found to delete"})
        }

        await Teacher.findByIdAndDelete(id);

        return res.status(200).json({message : "teacher deleted successfully"});


    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}