import React,{useState,useEffect} from "react"

import { useDispatch,useSelector } from "react-redux"

import { LoginAdmin } from "../../redux/admin/adminSlice.js"

import { useNavigate } from "react-router-dom"


function AdminLogin(){

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading,error,admin}=useSelector((state)=>state.admin)

    const [formData,setFormData]= useState({
        email:"",
        password:""
    })
    // const [shown,setShown]=useState(false)


    useEffect(()=>{
        if(admin){
          
            navigate("/admin/dashboard")
        }
    },[admin,navigate])

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(LoginAdmin(formData))
    }

 return (
  <>
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="bg-white/10 backdrop-blur-lg shadow-2xl p-8 rounded-2xl w-96 border border-white/20">
        
        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-white mb-1 tracking-wide">
          Admin Panel
        </h2>
        <p className="text-center text-gray-300 text-sm mb-6">Sign in to continue</p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input 
            type="email" 
            name="email"
            placeholder="Email Address"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 outline-none transition"
            onChange={handleChange} 
          />

          <input 
            type="password" 
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:border-blue-500 outline-none transition"
            onChange={handleChange} 
          />

          {/* Error Message */}
          {error && (
            <p className="text-red-400 text-sm text-center bg-red-900/20 py-2 rounded-lg border border-red-700">
              {error}
            </p>
          )}

          {/* Button */}
          <button 
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all rounded-lg text-white font-semibold shadow-lg"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  </>
);

}

export default AdminLogin