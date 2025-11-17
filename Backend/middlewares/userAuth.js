import { verifyToken } from "../utils/jwt.js";
import { STATUS_CODES } from "../utils/statusCodes.js";

export function userAuth(req,res,next){
    console.log(req.cookies)
    const usertoken = req.cookies.usertoken

    if(!usertoken){
        return res.status(STATUS_CODES.UNAUTHORIZED).json({message:"No token provided"})
    }
   
    try {
        const decoded = verifyToken(usertoken)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(STATUS_CODES.FORBIDDEN).json({ message: "Invalid token" })
    }
}