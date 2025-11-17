import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { VerifyAdmin } from "../redux/admin/adminSlice.js";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

function ProtectedAdmin({children}){
const {admin,loading}=useSelector((state)=>state.admin)
const dispatch = useDispatch()

useEffect(()=>{
    if(!admin){
        dispatch(VerifyAdmin())
    }
},[dispatch])

if (loading) return <p>Loading...</p>;
  if (!admin) return <Navigate to="/admin/login" replace />;
return children
}

export default ProtectedAdmin