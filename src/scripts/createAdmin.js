import bcrypt from "bcryptjs";
import { User } from "../models/userModel.js";
import connectDB from "../config/db.js";

const createAdmin = async(req , res)=>{
    try {
        // connect t0 database
        await connectDB();

        // check if admin already exist
        const existingAdmin = await User.findOne({role:"admin"})
        if(existingAdmin){
            console.log("admin already exist")
            process.exit(0);
        }
        
        // encypt password
        const hashedPassword = await bcrypt.hash("12345678",10)
        
        // create admin
        const user = await User.create({
            name : "atif",
            email : "atif@gmail.com",
            password : hashedPassword,
            role : "superadmin"
        })
        
        console.log("Admin created succesfully")

        process.exit(0);
    } catch (error) {
        console.log(error)
        process.exit(1);
    }
}

createAdmin();