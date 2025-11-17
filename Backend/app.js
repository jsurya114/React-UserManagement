import express from "express"
import cors from "cors"
import connectDB from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import { noCache } from "./middlewares/noCache.js"




const app = express()

const PORT = 3125

dotenv.config()
connectDB()

app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(noCache)

app.use("/",userRoutes)
app.use("/admin",adminRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})