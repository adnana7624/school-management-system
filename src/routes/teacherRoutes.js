import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import { authorizeRoles } from "../middleware/roleMiddleware.js";
import { upload } from "../middleware/multer.js";
import { createTeacher, deleteTeacher, getTeacher } from "../controllers/teacherController.js";

const teacherRoutes = express.Router();

// add teacher
teacherRoutes.post("/addTeacher",auth,authorizeRoles("superadmin"),upload.single("profileImage"),createTeacher)

// get teacher
teacherRoutes.get("/getTeacher",auth,getTeacher);
// delete teacher
teacherRoutes.delete("/deleteTeacher/:id",auth,authorizeRoles("superadmin"),deleteTeacher);

export default teacherRoutes;