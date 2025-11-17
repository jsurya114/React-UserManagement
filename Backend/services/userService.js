import userRepo from "../repositories/userRepo.js";

const UserService={

     SignUp:async(data)=>{
        const {name,email,password,confirmpassword}=data
          
        if(password!==confirmpassword){
            throw new Error("Passwords do not match")
        }

        const existingUser = await userRepo.findByEmail(email)

        if(existingUser){
            throw new Error("User already exists")
        } 
  
        const newUser= await userRepo.createUser({name,email,password})

        return newUser

     },

     Login:async(email,password)=>{

        const user = await userRepo.findByEmail(email)

        if(!user){
            throw new Error("User not exits")
        }

        if(password!==user.password){
           throw new Error("Invalid Password")
        }

        return user

     },

     getUserById:async(id)=>{
        let result = await userRepo.findById(id)
        return result
     },

     updateUSer:async(id,userData)=>{
        let result =await userRepo.updateUserById(id,userData)
        return result
     },

     uploadProfilePicture:async(id,profilIemage)=>{
        let result = await userRepo.uploadProfilepic(id,profilIemage)
        console.log(result)
        return result
     },

     



}

export default UserService