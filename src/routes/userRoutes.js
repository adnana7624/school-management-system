import express from "express";
import { getMe, login } from "../controllers/userController.js";
import {auth} from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { createTeacher } from "../controllers/teacherController.js";
import { upload } from "../middleware/multer.js";

export const router = express.Router();

router.post("/login",login)
router.get("/getme",auth,getMe);
router.get("/admin-test",auth , authorizeRoles("admin"),
    (req , res)=>{
        return res.status(200).json({
            success : true,
            message : "welcome admin ! you can access this routes",
            user : req.user
        })
    }
)

router.post("/addTeacher",auth,authorizeRoles("admin"), upload.single("profileImage"),createTeacher)