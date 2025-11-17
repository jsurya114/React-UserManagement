import { verifyToken } from "../utils/jwt.js";
import { STATUS_CODES } from "../utils/statusCodes.js";

export function auth(req,res,next){
    console.log("cookies",req.cookies)
    const token = req.cookies.token


    console.log("token",token)
    if(!token){
        return res.status(STATUS_CODES.UNAUTHORIZED).json({message:"No token provided"})
    }
   
    try {
        const decoded = verifyToken(token)
        req.admin = decoded
        next()
    } catch (error) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid token" })
    }
}