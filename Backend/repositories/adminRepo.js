import User from "../models/UserModel.js"
import Admin from "../models/AdminModel.js"

const adminRepo={

    getAdmin:async(email)=>{
       let result = await Admin.findOne({email})
       return result
    },

     createUser:async(userData)=>{
       const user = new User(userData)
       return await user.save()
     },

     getUserById:async(id)=>{
       return await User.findById(id)
     },

    getAllUsers:async()=>{
        return User.find({})
    },
    
    updateUser:async(id,updateData)=>{
        return User.findByIdAndUpdate(id,updateData,{new:true})
    },

    deleteUser:async(id)=>{
        return User.findByIdAndDelete(id)
    }

}

export default adminRepo