import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../redux/user/userSlice.js";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {  loading, error } = useSelector((state) => state.user);
  const user = useSelector((state)=>state.userprofile.user)||useSelector((state)=>state.user.user)
  

  function handleLogout() {
    alert("Logged out successfully");
    dispatch(Logout());
    navigate("/");
  }

  return (
    <>
      {/* Navbar */}
      <nav className="bg-blue-600 text-white flex justify-between items-center px-6 py-3 shadow-md">
        <h1
          className="text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          User Dashboard
        </h1>

        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/profile")}
            className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded"
          >
            Profile
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96 text-center">
          <h2 className="text-2xl font-semibold mb-4">Welcome Back</h2>

        
          {user ? (
            <>
             <div className="flex justify-center mb-4">
              <img src={user.profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border"/>
             </div>

              <p className="text-lg">
                Hello, <span className="font-bold">{user.name}</span>
              </p>
              <p className="text-gray-600 mt-1">{user.email}</p>
            </>
          ) : (
            <p className="text-gray-600">No user data found</p>
          )}

          {loading && <p className="text-blue-500 mt-3">Loading...</p>}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
