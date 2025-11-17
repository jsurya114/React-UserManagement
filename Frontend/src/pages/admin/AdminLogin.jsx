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

 return(
        <>
         <div className="h-screen flex justify-center items-center bg-gray-100">
           
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-80">
               <h2 className="text-xl font-semibold text-center mb-4">Admin Login</h2>
                <input type="email" name="email" placeholder="Email Email" className="border p-2 w-full rounded mb-3" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Enter Password" className="border p-2 w-full rounded mb-3" onChange={handleChange} required/>
                {error && (
                     <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
                )}

                <button type="submit"className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                    {loading?"Loading...":"Login"}
                </button>

                

            </form>

        </div>
        
        </>
 )

}

export default AdminLogin