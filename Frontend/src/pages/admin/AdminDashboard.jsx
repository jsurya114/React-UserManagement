import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Logout } from "../../redux/admin/adminSlice.js"
import { useEffect, useState } from "react"
import { DeleteUser, GetAllUsers } from "../../redux/admin/manageuserSlice.js"
import { X, Edit, Trash2, User, Mail, AlertTriangle, CheckCircle, LogOut } from "lucide-react"

function AdminDashboard() {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, loading, error, message } = useSelector((state) => state.manageUsers)
  const [selectedImage, setSelectedImage] = useState(null)
  const [deleteModal, setDeleteModal] = useState({ show: false, userId: null, userName: "" })
  const [logoutModal, setLogoutModal] = useState(false)

  async function handleLogout() {
    try {
      await dispatch(Logout())
      setLogoutModal(true)
      setTimeout(() => {
        navigate("/admin/login")
      }, 1500)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  useEffect(() => {
    dispatch(GetAllUsers())
  }, [dispatch])

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        // Message will auto-clear after 6 seconds
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [message])

  function openDeleteModal(id, name) {
    setDeleteModal({ show: true, userId: id, userName: name })
  }

  function closeDeleteModal() {
    setDeleteModal({ show: false, userId: null, userName: "" })
  }

  function confirmDelete() {
    dispatch(DeleteUser(deleteModal.userId))
    closeDeleteModal()
  }

  function handleImageClick(imageUrl) {
    setSelectedImage(imageUrl)
  }

  function closeImageModal() {
    setSelectedImage(null)
  }

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="bg-white/95 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-gray-200 mb-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <div className="flex flex-wrap gap-3 justify-center">
                <button 
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-white font-medium flex items-center gap-2"
                  onClick={() => navigate("/admin/createuser")}
                >
                  <User size={18} />
                  Create User
                </button>
                <button 
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-300 px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-white font-medium"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </div>

            {/* Status Messages */}
            <div className="mt-4">
              {loading && (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium">
                  <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading users...
                </div>
              )}
              {error && (
                <p className="text-red-600 font-medium text-center bg-red-50 py-2 px-4 rounded-lg">
                  {error}
                </p>
              )}
              {message && (
                <p className="text-green-700 font-medium text-center bg-green-50 py-2 px-4 rounded-lg animate-in fade-in duration-300">
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Users Grid */}
          {users?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200 group hover:scale-105"
                >
                  {/* Profile Image */}
                  <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 p-6 flex justify-center">
                    <div className="relative">
                      <img
                        src={u.profileImage}
                        alt={`${u.name}'s profile`}
                        className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer transition-transform duration-300 group-hover:scale-110"
                        onClick={() => handleImageClick(u.profileImage)}
                      />
                      <div 
                        className="absolute inset-0 bg-black/0 hover:bg-black/20 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center"
                        onClick={() => handleImageClick(u.profileImage)}
                      >
                        <span className="text-white opacity-0 hover:opacity-100 text-sm font-medium">
                          View
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Info */}
                  <div className="p-5">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={16} className="text-gray-500" />
                        <h3 className="font-bold text-lg text-gray-800 truncate">
                          {u.name}
                        </h3>
                      </div>
                      <div className="flex items-start gap-2">
                        <Mail size={16} className="text-gray-500 mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-gray-600 break-words">
                          {u.email}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-2">
  <button
    className="flex-1 h-12 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white rounded-xl font-medium shadow-md"
    onClick={() => navigate(`/admin/userdetails/${u._id}`)}
  >
    <User size={16} />
    <span className="text-sm truncate">View</span>
  </button>

  <button
    className="flex-1 h-12 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 transition-all duration-300 text-white rounded-xl font-medium shadow-md"
    onClick={() => navigate(`/admin/updateuser/${u._id}`)}
  >
    <Edit size={16} />
    <span className="text-sm truncate">Edit</span>
  </button>

  <button
    className="flex-1 h-12 flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 transition-all duration-300 text-white rounded-xl font-medium shadow-md"
    onClick={() => openDeleteModal(u._id, u.name)}
  >
    <Trash2 size={16} />
    <span className="text-sm truncate">Delete</span>
  </button>
</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (
              <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-12 text-center border border-gray-200">
                <div className="flex flex-col items-center gap-4">
                  <User size={64} className="text-gray-300" />
                  <p className="text-gray-500 text-lg font-medium">No Users Found</p>
                  <button 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition-all duration-300 px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl text-white font-medium"
                    onClick={() => navigate("/admin/createuser")}
                  >
                    Create Your First User
                  </button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeDeleteModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div className="bg-red-100 p-4 rounded-full mb-4">
                <AlertTriangle size={48} className="text-red-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Delete User?
              </h3>
              
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-800">{deleteModal.userName}</span>? This action cannot be undone.
              </p>

              <div className="flex gap-3 w-full">
                <button
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-medium transition-all duration-300"
                  onClick={closeDeleteModal}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={confirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeImageModal}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              className="absolute -top-12 right-0 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-all duration-300"
              onClick={closeImageModal}
            >
              <X size={24} />
            </button>
            <img
              src={selectedImage}
              alt="Profile large view"
              className="w-full h-auto max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      )}

      {/* Logout Success Modal */}
      {logoutModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-4">
                <CheckCircle size={64} className="text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Logged Out Successfully
              </h3>
              <p className="text-gray-600">
                Redirecting to login page...
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AdminDashboard