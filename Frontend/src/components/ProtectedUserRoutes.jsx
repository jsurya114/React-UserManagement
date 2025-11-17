import { Navigate } from "react-router-dom";
import { VerifyUser } from "../redux/user/userSlice.js";
import { useDispatch,useSelector } from "react-redux";
import { useEffect } from "react";

function ProtectedUser({children}){
    const {user,loading}=useSelector((state)=>state.user)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(!user){
            dispatch(VerifyUser())
        }
    },[dispatch])

    if(loading) return <p>Loading...</p>
    if(!user) return <Navigate to="/" replace/>
    return children
}
export default ProtectedUser
