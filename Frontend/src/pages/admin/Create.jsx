import React,{useState,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux"
import { CreateUser } from "../../redux/admin/manageuserSlice.js"

import { useNavigate } from "react-router-dom"

function Create(){
    const dispatch = useDispatch()
    const navigate =useNavigate()

    const {loading,error,message}=useSelector((state)=>state.manageUsers)

    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:""
    })

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await dispatch(CreateUser(formData))
        alert("User created successfully")
        navigate("/admin/dashboard")
    }

    return(
        <>
        <div className="min-h-screen flex justify-center items-center bg-gray-100">
          <form onSubmit={handleSubmit}  className="bg-white p-6 rounded shadow-md w-80">
             <h2 className="text-xl font-bold text-center mb-4">Create New User</h2>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        {message && <p className="text-green-500 text-sm text-center mb-2">{message}</p>}

        <input type="text" name="name" placeholder="Enter Name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full mb-3" required/>
          <input type="email" name="email" placeholder="Enter Email" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full mb-3" required/>
           <input type="password" name="password" placeholder="Enter Password" value={formData.password} onChange={handleChange} className="border p-2 rounded w-full mb-3" required/>
           <button type="submit" disabled={loading} className="bg-blue-600 w-full text-white p-2 rounded hover:bg-blue-700" >{loading?"Creating...":"Crete User"}</button>

             <p onClick={()=>navigate("/admin/dashboard")} className="text-blue-600 text-sm mt-3 cursor-pointer text-center">← Back to Dashboard</p>
          </form>
        </div>
        </>
    )

}

export default Create