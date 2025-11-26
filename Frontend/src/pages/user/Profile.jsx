import { useSelector, useDispatch } from "react-redux"
import { UploadProfile, UpdateUser } from "../../redux/user/profileSlice.js"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Mail, Upload, Save, ArrowLeft, Camera, X } from "lucide-react"

function Profile() {
  const { user, loading, error, message } = useSelector((state) => state.userprofile)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [editUser, setEditUser] = useState({ name: "", email: "" })
  const [selectedImage, setSelectedImage] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const [showMessage, setShowMessage] = useState(false)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (user) {
      setEditUser({ name: user.name || "", email: user.email || "" })
    }
  }, [user])

  // Auto-hide success message after 6 seconds
  useEffect(() => {
    if (message) {
      setShowMessage(true)
      const timer = setTimeout(() => {
        setShowMessage(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [message])

  // Auto-hide error message after 6 seconds
  useEffect(() => {
    if (error) {
      setShowError(true)
      const timer = setTimeout(() => {
        setShowError(false)
      }, 6000)
      return () => clearTimeout(timer)
    }
  }, [error])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (!file) return
    
    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
    
    const formData = new FormData()
    formData.append("profileImage", file)
    dispatch(UploadProfile({ formData }))
  }

  const handleSave = () => {
    const formData = { name: editUser.name, email: editUser.email }
    dispatch(UpdateUser({ id: user._id, formData }))
  }

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl)
  }

  const closeImageModal = () => {
    setSelectedImage(null)
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 text-lg font-medium">Loading user...</p>
        </div>
      </div>
    )
  }

  const currentImage = previewImage || user.profileImage || "https://via.placeholder.com/200"

  return (
    <>
      {/* Modern Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 
              className="text-xl sm:text-2xl font-bold cursor-pointer hover:text-blue-100 transition-colors duration-300 flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <User size={20} />
              </div>
              <span>User Profile</span>
            </h1>
            <button 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm px-5 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <ArrowLeft size={18} />
              <span className="hidden sm:inline">Back to Dashboard</span>
              <span className="sm:hidden">Back</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Status Messages */}
          {loading && (
            <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3 animate-pulse">
              <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-blue-700 font-medium">Saving changes...</p>
            </div>
          )}
          {showError && error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 font-medium animate-in slide-in-from-top duration-300">
              {error}
            </div>
          )}
          {showMessage && message && (
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-medium flex items-center gap-2 animate-in slide-in-from-top duration-300">
              <Save size={20} />
              {message}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Image Section */}
            <div className="lg:col-span-1">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-gray-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">Profile Picture</h3>
                
                {/* Image Container */}
                <div className="flex justify-center mb-6">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                      <img
                        className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        src={currentImage}
                        alt="Profile"
                        onClick={() => handleImageClick(currentImage)}
                      />
                      <div 
                        className="absolute inset-0 bg-black/0 hover:bg-black/40 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center"
                        onClick={() => handleImageClick(currentImage)}
                      >
                        <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                          View Large
                        </span>
                      </div>
                      {/* Camera Icon Badge */}
                      <div className="absolute bottom-2 right-2 bg-blue-600 p-2.5 rounded-full shadow-lg border-2 border-white">
                        <Camera size={18} className="text-white" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upload Button */}
                <label className="block cursor-pointer">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                    <Upload size={20} />
                    Change Photo
                  </div>
                  <input 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Recommended: Square image, at least 400x400px
                </p>
              </div>

              {/* User ID Card */}
              <div className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded-2xl shadow-lg p-5 text-white">
                <p className="text-xs text-gray-300 mb-1 uppercase tracking-wider">User ID</p>
                <p className="font-mono text-sm font-semibold break-all">
                  {user.name}_{user._id.slice(0, 4)}
                </p>
              </div>
            </div>

            {/* Edit Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile Information</h3>

                <div className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={editUser.name}
                        onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 font-medium"
                        placeholder="Enter your name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Mail size={20} className="text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={editUser.email}
                        onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                        className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-300 text-gray-800 font-medium"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:cursor-not-allowed"
                  >
                    <Save size={20} />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </div>

            
              </div>

            
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeImageModal}
        >
          <div
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
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
    </>
  )
}

export default Profile