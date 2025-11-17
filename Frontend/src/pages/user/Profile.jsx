import { useSelector, useDispatch } from "react-redux"
import { UploadProfile, UpdateUser } from "../../redux/user/profileSlice.js"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Profile() {
  const { user, loading, error, message } = useSelector((state) => state.userprofile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [editUser, setEditUser] = useState({ name: "", email: "" })

  useEffect(() => {
    if (user) {
      setEditUser({ name: user.name || "", email: user.email || "" })
    }
  }, [user])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const formData = new FormData()
    formData.append("profileImage", file)
    dispatch(UploadProfile({ formData }))
  }

  const handleSave = () => {
    const formData = { name: editUser.name, email: editUser.email }
    dispatch(UpdateUser({ id: user._id, formData }))
  }

  if (!user) return <p className="text-center mt-10 text-gray-700 text-base sm:text-lg">Loading user...</p>

  return (
    <>
      <nav className="bg-blue-600 text-white flex justify-between items-center px-4 sm:px-6 py-3 shadow-md">
        <h1 className="text-lg sm:text-xl font-semibold cursor-pointer" onClick={() => navigate("/dashboard")}>User Profile</h1>
        <button className="bg-blue-500 hover:bg-blue-700 px-3 py-1 rounded text-sm sm:text-base" onClick={() => navigate("/dashboard")}>Back</button>
      </nav>

      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:w-96 text-center">

          <h2 className="text-xl sm:text-2xl font-semibold mb-4">Your Profile</h2>

          {loading && <p className="text-blue-600 mb-2 text-sm sm:text-base">Saving...</p>}
          {error && <p className="text-red-600 mb-2 text-sm sm:text-base">{error}</p>}
          {message && <p className="text-green-600 mb-2 text-sm sm:text-base">{message}</p>}

          <div className="mb-4 flex justify-center">
            <img className="w-20 h-20 sm:w-24 sm:h-24 rounded-full border object-cover" src={user.profileImage || "https://via.placeholder.com/100"} alt="Profile" />
          </div>

          <input type="file" className="block w-full mb-4 text-gray-600 text-sm sm:text-base" onChange={handleImageUpload} />

          <input type="text" value={editUser.name} onChange={(e) => setEditUser({ ...editUser, name: e.target.value })} className="border p-2 w-full rounded mb-3 text-sm sm:text-base" placeholder="Name" />

          <input type="email" value={editUser.email} onChange={(e) => setEditUser({ ...editUser, email: e.target.value })} className="border p-2 w-full rounded mb-3 text-sm sm:text-base" placeholder="Email" />

          <button onClick={handleSave} className="w-full bg-green-600 hover:bg-green-700 text-white p-2 rounded text-sm sm:text-base">Save Changes</button>

          <p className="text-gray-600 mt-4 text-xs sm:text-sm">User ID: {user.name}_{user._id.slice(0, 4)}</p>
        </div>
      </div>
    </>
  )
}

export default Profile
