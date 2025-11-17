import express from "express"
import userController from "../controllers/userController.js"
import { userAuth } from "../middlewares/userAuth.js"
import upload from "../middlewares/uploads.js"
import userProfileController from "../controllers/userProfileControlle.js"
let router = express.Router()



router.post("/",userController.Login)
router.post("/signup",userController.SignUp)
router.get("/verifyuser",userAuth,userController.VerifyUser)
router.post("/logout",userAuth,userController.Logout)

router.post("/profile/upload-image",userAuth,upload.single("profileImage"),userProfileController.uploadProfilePicture)
router.put("/profile/updateuser/:id",userAuth,userProfileController.updateUser)

export default router