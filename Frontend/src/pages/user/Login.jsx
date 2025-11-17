import React,{useState} from "react";
import { useDispatch,useSelector } from "react-redux";
import { LoginUser } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function Login(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading , error,user} = useSelector((state)=>state.user)

    const [formData,setFormData]=useState({
        email:"",
        password:""
    })
    
    console.log(formData)

    useEffect(()=>{
           console.log("Current user:", user)
        if(user){
            navigate("/dashboard")
        }
    },[user,navigate])

    function handleChange(e){
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    function submitHandler(e){
        e.preventDefault()
        dispatch(LoginUser(formData))
    }

    return(
        <>
         <div className="h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={submitHandler} className="bg-white p-6 rounded-lg shadow-md w-80">
               <h2 className="text-xl font-semibold text-center mb-4">Login</h2>
                <input type="email" name="email" placeholder="Email Email" className="border p-2 w-full rounded mb-3" onChange={handleChange} required/>
                <input type="password" name="password" placeholder="Enter Password" className="border p-2 w-full rounded mb-3" onChange={handleChange} required/>
                {error && (
                     <p className="text-red-500 text-sm mb-2 text-center">{error}</p>
                )}

                <button type="submit"className="bg-blue-500 w-full text-white p-2 rounded hover:bg-blue-600" disabled={loading}>
                    {loading?"Loading...":"Login"}
                </button>

                <p className="mt-3 text-sm text-center" onClick={()=>navigate("/signup")}>SignUp</p>

            </form>

        </div>
        
        </>
    )


}

export default Login