import express from "express";
import { getMe, login } from "../controllers/superAdminController.js";
import {auth} from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";


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
