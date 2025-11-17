import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const CreateUser=createAsyncThunk(
    "admin/createuser",
    async(userData,{rejectWithValue})=>{
     try {
           let response = await axios.post(`${API_URL}/admin/createuser`,userData,{withCredentials:true})
        return response.data
     } catch (error) {
        return rejectWithValue(error.response.data.message)
     }
    }
)

export const GetAllUsers=createAsyncThunk(
    "/admin/users",
    async(_,{rejectWithValue})=>{
        try {
            let response = await axios.get(`${API_URL}/admin/allusers`,{withCredentials:true})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const GetUsersById=createAsyncThunk(
    "admin/user/:id",
    async(id,{rejectWithValue})=>{
        try {
            let response = await axios.get(`${API_URL}/admin/user/${id}`,{withCredentials:true})  
            return response.data

        } catch (error) {
               return rejectWithValue(error.response.data.message)
        }
    }
)

export const UpdateUser=createAsyncThunk(
    "admin/updateuser",
    async({id,formData},{rejectWithValue})=>{
        try {
            let response = await axios.put(`${API_URL}/admin/updateuser/${id}`,formData,{withCredentials:true})
            return response.data
        } catch (error) {
      return rejectWithValue(error.response.data.message)
        }
    }
)

export const DeleteUser=createAsyncThunk(
    "admin/deletuser",
    async(id,{rejectWithValue})=>{
        try {
          let response =await axios.delete(`${API_URL}/admin/deleteuser/${id}`,{withCredentials:true})
          return response.data
        } catch (error) {
             return rejectWithValue(error.response.data.message)
        }
    }
)


const managuserSlice = createSlice({
    name:"manageUsers",
    initialState:{
        admin:null,
        users:[],
        singleUser:null,
        loading:false,
        error:null,
        message:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        //create users
        .addCase(CreateUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(CreateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.users.push(action.payload?.user)
            state.message=action.payload?.message
        })
        .addCase(CreateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        //get all users
        
        .addCase(GetAllUsers.pending,(state)=>{
            state.loading=true
        })
        .addCase(GetAllUsers.fulfilled,(state,action)=>{
            state.loading=false
            state.users=action.payload?.user
        })
        .addCase(GetAllUsers.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        //get user by id

        .addCase(GetUsersById.pending,(state)=>{
            state.loading=true
        })
        .addCase(GetUsersById.fulfilled,(state,action)=>{
            state.loading=false
            state.singleUser=action.payload?.user
        })
        .addCase(GetUsersById.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        //update user

        .addCase(UpdateUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(UpdateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.singleUser=action.payload?.user
            state.message=action.payload?.message
        })
        .addCase(UpdateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        //delete user

        .addCase(DeleteUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(DeleteUser.fulfilled,(state,action)=>{
            state.loading=false
            let deletedId = action.payload?.user?._id
            state.users=state.users.filter(u=>u._id!==deletedId)
            state.message=action.payload?.message
        })
        .addCase(DeleteUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })
    }
})


export default managuserSlice.reducer
