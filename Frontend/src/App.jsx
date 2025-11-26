import AdminDashboard from "./pages/admin/AdminDashboard.jsx"
import AdminLogin from "./pages/admin/AdminLogin.jsx"
import Create from "./pages/admin/Create.jsx"
import Edit from "./pages/admin/Edit.jsx"
import Dashboard from "./pages/user/Dashboard.jsx"
import Login from "./pages/user/Login.jsx"
import SignUp from "./pages/user/SignUp.jsx"
import { Routes,Route } from "react-router-dom"
import ProtectedAdmin from "./components/ProtectedAdmin.jsx"
import ProtectedUser from "./components/ProtectedUserRoutes.jsx"
import Profile from "./pages/user/Profile.jsx"
import NotFound from "./pages/NotFound.jsx"
import UserDetails from "./pages/admin/UserDetails.jsx"

function App() {
return(
  <>
  <Routes>
   {/* Admin */}
    <Route path="/admin/login" element={<AdminLogin/>}/>
    <Route path="/admin/dashboard" element={<ProtectedAdmin><AdminDashboard/></ProtectedAdmin>}/>
    <Route path="/admin/createuser" element={<ProtectedAdmin><Create/></ProtectedAdmin>}/>
    <Route path="/admin/updateuser/:id" element={<ProtectedAdmin><Edit/></ProtectedAdmin>}/>
    <Route path="/admin/userdetails/:id" element={<ProtectedAdmin><UserDetails/></ProtectedAdmin>} />
    {/* Admin */}


    {/* User */}
    <Route path="/" element={<Login/>}/>
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/dashboard" element={<ProtectedUser><Dashboard/></ProtectedUser>}/>
     <Route path="/profile" element={<ProtectedUser><Profile/></ProtectedUser>}/>
    {/* <Route path="/profile/updateuser/:id" element={<ProtectedUser><Profile/></ProtectedUser>}/>
    <Route path="/profile/image-upload" element={<ProtectedUser><Profile/></ProtectedUser>}/> */}
    {/* User */}

    <Route path="*" element={<NotFound />} />

  </Routes>

  </>
)
}

export default App
