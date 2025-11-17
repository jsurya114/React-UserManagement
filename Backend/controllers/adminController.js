import adminService from "../services/adminService.js";
import { STATUS_CODES } from "../utils/statusCodes.js";
import { generateToken } from "../utils/jwt.js";

const adminController={
   

    Login:async(req,res)=>{

      try {
        const {email,password}=req.body
        
        if(!email||!password){
            return res.status(STATUS_CODES.BAD_REQUEST).json({ success: false, message: "Email & password are required" })
        }

        let admin = await adminService.Login(email,password)

         if(!admin){
            return res.status(STATUS_CODES.UNAUTHORIZED).json({ success: false, message: "Invalid credentials" })
         }
         let token = generateToken({id:admin._id,email:admin.email})
        
         console.log("tokens",token)
            
         res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"lax",
            maxAge:2*60*60*1000
         })

        let result = res.status(STATUS_CODES.OK).json({success:true,message:"login success",admin,token})
        return result
      } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
      }

    },
    Logout:async(req,res)=>{
        console.log("logout trigged")
        res.clearCookie("token")
        res.status(STATUS_CODES.OK).json({ success: true, message: "Logged out" })
    },
    
    VerifyAdmin:async(req,res)=>{
       try {
       return res.status(STATUS_CODES.OK).json({success:true,admin:req.admin})

       } catch (error) {
         console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
       }
    },

    getAllUsers:async(req,res)=>{
       
        try {
            console.log("reached")
             let user = await adminService.getAllUsers()
        let result = res.status(STATUS_CODES.OK).json({success:true,user})
        return result
        } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    },
    createUser:async(req,res)=>{
        try {
            console.log("create user reached")
            let user = await adminService.createUser(req.body)
             let result = res.status(STATUS_CODES.OK).json({success:true,message:"User Created Successfully",user})
             return result
        } catch (error) {
            console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        
        }
    },

    getUserById:async(req,res)=>{
        try {
            let id = req.params.id
            let user = await adminService.getUserById(id)
          let result = res.status(STATUS_CODES.OK).json({success:true,user})
        return result
        } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    },

    updateUser:async(req,res)=>{
        try {
            let id = req.params.id
        let user = await adminService.updateUser(id,req.body)
        let result = res.status(STATUS_CODES.OK).json({success:true,message:"Updated Successfully",user})
       return result
        } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }

    },
    deleteUser:async(req,res)=>{
      try {
          let id = req.params.id
        let user = await adminService.deleteUser(id)
        let result = res.status(STATUS_CODES.OK).json({success:true,message:"Deleted Successfully",user})
       return result
        } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
        }
    }

}

export default adminController