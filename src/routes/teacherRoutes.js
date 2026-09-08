import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/multer.js";
import { createTeacher } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

teacherRoutes.post("/addTeacher",auth,authorizeRoles("admin"),upload.single("profileImage"),createTeacher)


export default teacherRoutes;