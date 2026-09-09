import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { router } from "./src/routes/userRoutes.js";
import cors from "cors";
import teacherRoutes from "./src/routes/teacherRoutes.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/auth", router);
app.use("/api/v1/teacher",teacherRoutes)

app.get("/", (req, res) => {
  res.send("app running successfully");
});


app.listen(port, "0.0.0.0", () => {
  console.log(`App running on Port No : ${port}`);
});