import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {User} from "../models/userModel.js"

export const login = async(req , res)=>{
    try {
        const {email , password} = req.body;
        // Check email and password 
        if(!email || !password){
            return res.status(400).json({message : "email and password both are required"})
        }

        // check if user not register
        const user = await User.findOne({email})
        if(!user){
            return res.status(400).json({message : "user not found"})
        }

        // compare password
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(400).json({message : "password incorrect "})
        }

        // create JWT Token
        const token = await jwt.sign(
            {
                user : user._id,
                role : user.role
            },
            process.env.JWT_SECRET,
            {
                expiresIn : "10d"
            }
        )
        
        return res.status(200).json({message : "User Login successfully",token : token})
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const getMe = async(req , res)=>{
    try {
        // console.log("REQ.USER:", req.user);
        // get current logedIn user information from database   
        const user = await User.findById(req.user.user).select("-password")

        if(!user){
            return res.status(400).json({message : "user not found"})
        }
        
        return res.status(200).json({
            success : true,
            user 
        })

    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

