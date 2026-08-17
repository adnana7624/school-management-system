import express from "express"
import dotenv from "dotenv"
import connectDB from "./src/config/db.js"
import { router } from "./src/routes/userRoutes.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000

connectDB();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user",router)


app.get("/",(req , res)=>{
    res.send("app running successfully")
})

app.listen(port,()=>{
    console.log(`App running on Port No : ${port}`)
})
