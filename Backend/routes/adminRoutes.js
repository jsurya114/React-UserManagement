import express from "express"
import adminController from "../controllers/adminController.js"
import { auth } from "../middlewares/auth.js"
const router = express.Router()

router.post("/login",adminController.Login)
router.post("/logout",auth,adminController.Logout)
router.get("/verify",auth,adminController.VerifyAdmin)
router.post("/createuser",auth,adminController.createUser)
router.get("/allusers",auth,adminController.getAllUsers)
router.get("/user/:id",auth,adminController.getUserById)
router.put("/updateuser/:id",auth,adminController.updateUser)
router.delete("/deleteuser/:id",auth,adminController.deleteUser)

export default router
