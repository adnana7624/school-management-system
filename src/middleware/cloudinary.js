import{v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
import fs from "fs"


dotenv.config();


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async (localpath)=>{
    try {
        const imageUpload = await cloudinary.uploader.upload(localpath)
        fs.unlinkSync(localpath)
        return imageUpload.secure_url
    } catch (error) {
        //fs.unlinkSync(localpath)
        console.log(error)
        return null
    }
}
export {uploadOnCloudinary}
