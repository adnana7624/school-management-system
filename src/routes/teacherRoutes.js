import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/multer.js";
import { createTeacher, deleteTeacher } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

// add teacher
teacherRoutes.post("/addTeacher",auth,authorizeRoles("admin"),upload.single("profileImage"),createTeacher)

// delete teacher
teacherRoutes.delete("/deleteTeacher/:id",auth,authorizeRoles("admin"),deleteTeacher);

export default teacherRoutes;