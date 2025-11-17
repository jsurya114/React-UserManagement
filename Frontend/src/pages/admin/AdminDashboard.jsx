import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Logout } from "../../redux/admin/adminSlice.js"
import { useEffect } from "react"
import { DeleteUser, GetAllUsers } from "../../redux/admin/manageuserSlice.js"

function AdminDashboard() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, loading, error, message } = useSelector((state) => state.manageUsers)

  async function handleLogout() {
    try {
      alert("logged out successfully")
      await dispatch(Logout())
      navigate("/admin/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  useEffect(() => {
    dispatch(GetAllUsers())
  }, [dispatch])

  function handleDelete(id) {
    const confirmDelete = confirm("Do you want to delete the user")
    if (!confirmDelete) return
    dispatch(DeleteUser(id))
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-6 flex justify-center">
        <div className="w-full max-w-5xl bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-gray-200">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6 text-center">Admin Dashboard </h1>

          <div className="flex flex-col sm:flex-row gap-3 mb-6 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 transition px-4 py-2 rounded-lg shadow text-white text-sm sm:text-base" onClick={() => navigate("/admin/createuser")}>Create User</button>
            <button className="bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-lg shadow text-white text-sm sm:text-base" onClick={handleLogout}>Logout</button>
          </div>

          {loading && <p className="text-blue-500 font-medium text-center text-sm sm:text-base">Loading...</p>}
          {error && <p className="text-red-500 font-medium text-center text-sm sm:text-base">{error}</p>}
          {message && <p className="text-green-600 font-medium text-center text-sm sm:text-base">{message}</p>}

          <div className="overflow-x-auto mt-4">
            <table className="w-full border border-gray-300 rounded-lg overflow-hidden shadow">
              <thead>
                <tr className="bg-blue-600 text-white text-sm sm:text-base">
                  <th className="p-3 border border-blue-500">UserId</th>
                  <th className="p-3 border border-blue-500">Name</th>
                  <th className="p-3 border border-blue-500">Email</th>
                  <th className="p-3 border border-blue-500">Actions</th>
                </tr>
              </thead>

              <tbody>
                {users?.length > 0 ? (
                  users.map((u) => (
                    <tr key={u._id} className="text-center bg-white hover:bg-blue-50 transition">
                        <td className="p-3 border border-gray-300">{u.name}_{u._id.slice(0,3)}</td>
                      <td className="p-3 border border-gray-300">{u.name}</td>
                      <td className="p-3 border border-gray-300">{u.email}</td>
                      <td className="p-3 border border-gray-300 flex justify-center gap-3">
                        <button className="bg-green-500 hover:bg-green-600 transition text-white px-3 py-1 rounded-lg text-xs sm:text-sm shadow" onClick={() => navigate(`/admin/updateuser/${u._id}`)}>Edit</button>
                        <button className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-lg text-xs sm:text-sm shadow" onClick={() => handleDelete(u._id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-4 text-center text-gray-600" colSpan="3">No Users Found</td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </>
  )
}

export default AdminDashboard
