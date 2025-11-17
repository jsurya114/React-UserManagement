import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}`;

export const LoginUser = createAsyncThunk(
    "user/login",
    async({email,password},{rejectWithValue})=>{
        try {
            
            const response = await axios.post(`${API_URL}`,{email,password},{withCredentials:true})
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const SignupUser=createAsyncThunk(
    "user/signup",
    async(formData,{rejectWithValue})=>{
        try {
            const response = await axios.post(`${API_URL}/signup`,formData,{withCredentials:true})
        return response.data
        } catch (error) {
             return rejectWithValue(error.response.data.message)
        }
    }
) 

export const VerifyUser= createAsyncThunk(
    "user/verifyuser",
    async(_,{rejectWithValue})=>{
       try {
         let response =await axios.get(`${API_URL}/verifyuser`,{withCredentials:true})
         return response.data
       } catch (error) {
        return rejectWithValue(error.response.data.message)
       }
    }
)

export const Logout= createAsyncThunk(
    "user/logout",
    async(_,{rejectWithValue})=>{
        try {
               let response = await axios.post(`${API_URL}/logout`,{},{withCredentials:true})
        return response.data
        } catch (error) {
             return rejectWithValue(error.response.data.message)
        }
    }
)

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        loading:false,
        usertoken:null,
        error:null,
        signupSuccess:false
    },
    reducers:{
        logout:(state)=>{
            state.user=null
            state.error=null
            state.signupSuccess=false
        }
    },
    extraReducers:(builder)=>{
       builder
       //login
       .addCase(LoginUser.pending,(state)=>{
        state.loading=true
        state.error=null
       })
       .addCase(LoginUser.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload.user
        state.usertoken=action.payload.usertoken
       })
       .addCase(LoginUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
       })
       //signup
       .addCase(SignupUser.pending,(state)=>{
        state.loading=true
        state.error=null
        state.signupSuccess=false
       })
       .addCase(SignupUser.fulfilled,(state)=>{
        state.loading=false
        state.signupSuccess=true
       })
       .addCase(SignupUser.rejected,(state,action)=>{
        state.loading=false
        state.error=action.payload
        state.signupSuccess=false
       })

       .addCase(VerifyUser.pending,(state)=>{
        state.loading=true
       })
       .addCase(VerifyUser.fulfilled,(state,action)=>{
        state.loading=false
        state.user=action.payload.user
        
       })
       .addCase(VerifyUser.rejected,(state,action)=>{
        state.loading=false
        state.user=null
        state.error=action.payload
       })

       .addCase(Logout.pending,(state)=>{
        state.loading=true
       })
       .addCase(Logout.fulfilled,(state,action)=>{
        state.loading=false
        state.user=null
        state.usertoken=null
        state.error=null
       })
       .addCase(Logout.rejected,(state,action)=>{
        state.loading=false
        state.error=null
       })
    }

})


export default userSlice.reducer