import { useState,useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { SignupUser } from "../../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"

function SignUp(){
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {loading,signupSuccess,error}=useSelector((state)=>state.user)
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        password:"",
        confirmpassword:""
    })
    function handleChange(e){
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(SignupUser(formData))
    }

    useEffect(()=>{
        if(signupSuccess){
            alert("Signed Up successfully please Login")
            navigate("/")
        }
    },[signupSuccess,navigate])
    return(

        <>
           <div className="flex justify-center items-center h-screen bg-gray-100">
           <form onSubmit={handleSubmit} className="bg-white w-80 p-6 rounded shadow-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Signup</h2>
            {error &&(
                <p className="text-red-500 text-sm text-center mb-2">{error}</p>
            )}

            <input type="text" name="name" placeholder="Enter Your Name" className="border w-full p-2 mb-3 rounded" value={formData.name} onChange={handleChange} required />
             <input type="email" name="email" placeholder="Enter Your Email" className="border w-full p-2 mb-3 rounded" value={formData.email} onChange={handleChange} required />
             <input type="password" name="password" placeholder="Enter password" className="border w-full p-2 mb-3 rounded" value={formData.password} onChange={handleChange} required />
             <input type="password" name="confirmpassword" placeholder="Re-enter password" className="border w-full p-2 mb-3 rounded" value={formData.confirmpassword} onChange={handleChange} required />

             <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded w-full hover:bg-blue-700">{loading?"Loading...":"SignUp"}</button>
             <p className="mt-3 text-sm text-center">
                 Already have an account?{" "}
                 <span onClick={()=> navigate("/")} className="text-blue-500 cursor-pointer">
                    Login
                 </span>
             </p>
           </form>

        </div>
        </>
    )

}

export default SignUp