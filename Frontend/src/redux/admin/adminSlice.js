import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = `${import.meta.env.VITE_API_URL}`;

export const LoginAdmin=createAsyncThunk(
    "admin/login",
    async({email,password},{rejectWithValue})=>{
        try {
            const response = await axios.post(`${API_URL}/admin/login`,{email,password},{withCredentials:true})
            return response.data
        } catch (error) {
             return rejectWithValue(error.response.data.message)
        }
    }
)

export const VerifyAdmin=createAsyncThunk(
    "admin/verify",
    async(__,{rejectWithValue})=>{
        try {
            let response = await axios.get(`${API_URL}/admin/verify`,{withCredentials:true})
        return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)

export const Logout=createAsyncThunk(
    "admin/logout",
    async(_,{rejectWithValue})=>{
        try {
          let response = await axios.post(`${API_URL}/admin/logout`,{},{withCredentials:true})
        return response.data
        } catch (error) {
            return rejectWithValue(error.response.data.message)
        }
    }
)


const adminSlice = createSlice({
    name:"admin",
    initialState:{
        admin:null,
        token:null,
        loading:false,
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAdmin.pending,(state)=>{
            state.loading=true
            state.error=null
        })
        .addCase(LoginAdmin.fulfilled,(state,action)=>{
            state.loading=false
            state.admin=action.payload.admin
            state.token=action.payload.token
        })
        .addCase(LoginAdmin.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
        })

        .addCase(VerifyAdmin.pending,(state)=>{
            state.loading=true
        })
        .addCase(VerifyAdmin.fulfilled,(state,action)=>{
            state.loading=false
            state.admin=action.payload.admin
            console.log(action.payload)
        })
        .addCase(VerifyAdmin.rejected,(state,action)=>{
            state.loading=false
            state.admin=null
            state.error=action.payload
        })
        .addCase(Logout.pending,(state)=>{
            state.loading=true
        })
        .addCase(Logout.fulfilled,(state,action)=>{
            state.loading=false
            state.admin=null
            state.token=null
            state.error =null
        })
        .addCase(Logout.rejected,(state,action)=>{
            state.loading=false
            state.error=null
        })
    }
})

export default adminSlice.reducer