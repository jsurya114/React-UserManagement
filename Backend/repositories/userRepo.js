import User from "../models/UserModel.js";


const userRepo={
    createUser:async(userData)=>{
        return User.create(userData)
    },

    findByEmail:async(email)=>{
        return User.findOne({email})
    },

    findById:async(id)=>{
        return User.findById(id)
    },

    uploadProfilepic:async(id,profileImage)=>{
        return User.findByIdAndUpdate(id,{profileImage},{new:true})
    },
    updateUserById:async(userId,userData)=>{
       return User.findByIdAndUpdate(userId,userData,{new:true})
    }

}

export default userRepo