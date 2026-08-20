// import express from "express"
// import dotenv from "dotenv"
// import connectDB from "./src/config/db.js"
// import { router } from "./src/routes/userRoutes.js"
// import cors from "cors";

// dotenv.config()
// const app = express()
// const port = process.env.PORT || 5000

// connectDB();

// app.use(cors())
// app.use(express.json());
// app.use(express.urlencoded({extended:true}));
// app.use("/api/v1/user",router)



// app.get("/",(req , res)=>{
//     res.send("app running successfully")
// })

// app.listen(port,"0.0.0.0",()=>{
//     console.log(`App running on Port No : ${port}`)
// })


// 

// 

import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import { router } from "./src/routes/userRoutes.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

connectDB();

// 1. CORS HAMESHA ROUTES SE PEHLE HONA CHAHIYE
app.use(cors({ origin: "*" }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Routes baad me
app.use("/api/v1/user", router);

app.get("/", (req, res) => {
  res.send("app running successfully");
});

// 3. '0.0.0.0' hona zaroori hai taake network par baaki devices connect ho sakein
app.listen(port, "0.0.0.0", () => {
  console.log(`App running on Port No : ${port}`);
});