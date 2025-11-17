import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { VerifyUser,LoginUser } from "./userSlice";

const API_URL = `${import.meta.env.VITE_API_URL}`;

export const UpdateUser=createAsyncThunk(
    "profile/updateuser",
    async({id,formData},{rejectWithValue})=>{
        try {
            let response = await axios.put(`${API_URL}/profile/updateuser/${id}`,formData,{withCredentials:true})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const UploadProfile= createAsyncThunk(
    "profile/upload-image",
    async({formData},{rejectWithValue})=>{
        try {
            let response = await axios.post(`${API_URL}/profile/upload-image`,formData,{
                headers:{ "Content-Type": "multipart/form-data" },
                withCredentials:true
            })
            return response.data
        } catch (error) {
             return rejectWithValue(error.response.data.message)
        }
    }
)

const profileSlice = createSlice({
    name:"userprofile",
    initialState:{
        user:null,
        loading:false,
        error:null,
        message:null
    },
    reducers:{
        resetMessage(state){
            state.error=null
            state.message=null
        }
    },
    extraReducers:(builder)=>{
       
        builder
        .addCase(UpdateUser.pending,(state)=>{
            state.loading=true
        })
        .addCase(UpdateUser.fulfilled,(state,action)=>{
            state.loading=false
            state.user=action.payload.user
            state.message=action.payload.message
        })
        .addCase(UpdateUser.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        .addCase(UploadProfile.pending,(state)=>{
            state.loading=true
        })
        .addCase(UploadProfile.fulfilled,(state,action)=>{
                state.loading=false
            state.user=action.payload.user
           
        })
        .addCase(UploadProfile.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

         .addCase(LoginUser.fulfilled, (state, action) => {
            state.user = action.payload.user
         })

         .addCase(VerifyUser.fulfilled, (state, action) => {
            state.user = action.payload.user
           })
    }
})
export const { resetMessage } = profileSlice.actions
export default profileSlice.reducer