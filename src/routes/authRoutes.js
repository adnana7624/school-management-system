import express from "express";
import { login } from "../controllers/userController.js";


const authRoutes = express.Router();

authRoutes.post("/login",login)

export default authRoutes;