import React,{useEffect,useState} from "react"
import { useDispatch,useSelector } from "react-redux"
import { GetUsersById,UpdateUser } from "../../redux/admin/manageuserSlice.js"

import { useParams,useNavigate } from "react-router-dom"

function Edit(){
    const {id}=useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {singleUser,loading,error,message}=useSelector((state)=>state.manageUsers)
    const [formData,setFormData]=useState({
        name:"",
        email:"",

    })

    useEffect(()=>{
        dispatch(GetUsersById(id))
    },[dispatch])

    useEffect(()=>{
        if(singleUser){
            setFormData({
                name:singleUser.name,
                email:singleUser.email
            })
        }
    },[singleUser])

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

   async function handleSubmit(e){
    e.preventDefault()
    await dispatch(UpdateUser({id,formData}))
    alert("user Updated Successfully")
    navigate("/admin/dashboard")
    }

    return(
        <>
         <div className="min-h-screen flex justify-center items-center bg-gray-100">
            <form className="bg-white p-6 rounded shadow-md w-80" onSubmit={handleSubmit}>
               <h2 className="text-xl font-bold text-center mb-4">Edit User</h2>

        {loading && <p className="text-blue-500 mb-2">Loading...</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-500 mb-2">{message}</p>}
         
         <input type="text" name="name" placeholder="Enter name" value={formData.name} onChange={handleChange} className="border p-2 rounded w-full mb-3" required/>
         <input type="email" name="email" placeholder="Enter name" value={formData.email} onChange={handleChange} className="border p-2 rounded w-full mb-3" required/>
         
<button className="bg-green-600 w-full text-white p-2 rounded hover:bg-green-700" disabled={loading} type="submit">{loading?"Updating":"Update"}</button>
<p  className="text-blue-600 text-sm mt-3 cursor-pointer text-center" onClick={() => navigate("/admin/dashboard")}> ← Back to Dashboard</p>
            </form>

        </div>
        </>
    )
}

export default Edit