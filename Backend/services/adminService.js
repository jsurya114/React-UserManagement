import adminRepo from "../repositories/adminRepo.js";

const adminService={

    Login:async(email,password)=>{
        if(!email){
            throw new Error("Email required")
        }

        if(!password){
             throw new Error("Password required")
        }
         let admin = await adminRepo.getAdmin(email)
           
         if(!admin){
            throw new Error("Admin not exists")
         }
          
         if(password!==admin.password){
            throw new Error("Password do not match")
         }

         return admin
    },

    createUser:async(userData)=>{
        let result = await adminRepo.createUser(userData)
        return result
    },

    getAllUsers:async()=>{
        let result = await adminRepo.getAllUsers()
        return result
    },

    getUserById:async(id)=>{
        let result = await adminRepo.getUserById(id)
        return result
    },

    updateUser:async(id,updateData)=>{
        let result =await adminRepo.updateUser(id,updateData)
        return result
    },

    deleteUser:async(id)=>{
        let result = await adminRepo.deleteUser(id)
        return result
    }

}

export default adminService