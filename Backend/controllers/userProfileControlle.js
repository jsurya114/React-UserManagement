import upload from "../middlewares/uploads.js";
import UserModel from "../models/UserModel.js";
import UserService from "../services/userService.js";
import { STATUS_CODES } from "../utils/statusCodes.js";
import { mult } from "../config/cloudinary.js";

const userProfileController={

   updateUser:async(req,res)=>{
    try {
        let id=req.params.id
        
        let user = await UserService.updateUSer(id,req.body)
        console.log("user",user)
        let result = res.status(STATUS_CODES.OK).json({success:true,message:"Updated Succesfully",user})
        return result

    } catch (error) {
         console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
   },
   uploadProfilePicture:async(req,res)=>{
    try {
        console.log("reached")
        console.log("req.file",req.file)
        console.log("req.user",req.user)
       let image = req.file.path
       console.log("userimage",image)
       const imageUrl = await mult(image)
       console.log("url",imageUrl)
       let user = await UserService.uploadProfilePicture(req.user.id,imageUrl)

         let result = res.status(STATUS_CODES.OK).json({success:true,message:"Uploaded Succesfully",user})
        return result
    } catch (error) {
        console.error(error)
         return res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json({success:false,message:error.message})
    }
   }


}

export default userProfileController