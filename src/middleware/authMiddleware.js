import jwt from "jsonwebtoken";


export const auth = async(req ,res , next)=>{
    try {
        const token = req.headers.authorization?.split(" ")[1];
        // check jet token valid or not
        if(!token){
            return res.status(400).json({message : "token missing or invalid"})
        }

        // compare jwt token same or not
        const decoded = await jwt.decode(token,process.env.JWT_SECRET)

        req.user = decoded;
        next();
        
    } catch (error) {
        return res.status(500).json({
            success : false,
            message : error.message
        })
    }
}