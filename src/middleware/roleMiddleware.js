export const authorizeRoles = (...allowedRoles) =>{
    return (req , res , next) =>{
        if(!req.user){
            return res.status(401).json({
                success : false,
                message : "authentication required"
            })
        }
        if(!allowedRoles.includes(req.user.role)){
            return res.status(403).json({
                success : false,
                message : "you are not authorized to perform this action"
            })
        }
        next();
    }
}