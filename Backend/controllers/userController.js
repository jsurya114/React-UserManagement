import UserService from "../services/userService.js";
import { generateToken } from "../utils/jwt.js";
import { STATUS_CODES } from "../utils/statusCodes.js";

const userController={

   SignUp:async(req,res)=>{

    try {
        
    const user  = await UserService.SignUp(req.body)

    let result = res.status(STATUS_CODES.CREATED).json({success:true,message:"User Registered Successfully",user})
    
    return result

    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }

   },

   Login:async(req,res)=>{
   
    try {
        const {email,password}=req.body
          console.log(req.body)
        const user = await UserService.Login(email,password)
        console.log("user",user)

        let usertoken = generateToken({id:user._id,email:user.email})

        console.log("usertoken",usertoken)

        res.cookie("usertoken",usertoken,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:2*60*60*1000
        })

        let result = res.status(STATUS_CODES.OK).json({success:true,message:"Login successfully",user,usertoken})
        return result  

    } catch (error) {
       console.error(error)
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }

   },

    Logout:async(req,res)=>{
           console.log("logout trigged")
           res.clearCookie("usertoken")
           res.status(STATUS_CODES.OK).json({ success: true, message: "Logged out" })
       },
   VerifyUser:async(req,res)=>{
    try {
        const user = await UserService.getUserById(req.user.id)
        return res.status(STATUS_CODES.OK).json({success:true,user})
    } catch (error) {
        console.error(error)
        return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
   },

   
   

}

export default userController