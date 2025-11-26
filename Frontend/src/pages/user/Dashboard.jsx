import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../redux/user/userSlice.js";
import { useState } from "react";
import { User, Mail, LogOut, X, Menu } from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const user = useSelector((state) => state.userprofile.user) || useSelector((state) => state.user.user);
  const [selectedImage, setSelectedImage] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function handleLogout() {
    alert("Logged out successfully");
    dispatch(Logout());
    navigate("/");
  }

  function handleImageClick(imageUrl) {
    setSelectedImage(imageUrl);
  }

  function closeImageModal() {
    setSelectedImage(null);
  }

  return (
    <>
      {/* Modern Navbar */}
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Title */}
            <h1
              className="text-xl sm:text-2xl font-bold cursor-pointer hover:text-blue-100 transition-colors duration-300 flex items-center gap-2"
              onClick={() => navigate("/dashboard")}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <User size={20} />
              </div>
              <span className="hidden sm:inline"> Dashboard</span>
              <span className="sm:hidden">Dashboard</span>
            </h1>

            {/* Desktop Menu */}
            <div className="hidden sm:flex items-center gap-3">
            
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-xl transition-all duration-300 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="sm:hidden bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="sm:hidden pb-4 space-y-2 animate-in slide-in-from-top duration-200">
             
              <button
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-red-500 hover:bg-red-600 px-5 py-2.5 rounded-xl transition-all duration-300 font-medium flex items-center gap-2 justify-center"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-2xl">
          {/* Welcome Card */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
            {/* Header with Gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 p-6 sm:p-8 text-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                Welcome Back! {user.name}
              </h2>
              <p className="text-blue-100 text-sm sm:text-base">
                Great to see you again
              </p>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8">
              {user ? (
                <div className="space-y-6">
                  {/* Profile Image */}
                  <div className="flex justify-center">
                    <div className="relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                      <img
                        src={user.profileImage}
                        alt="Profile"
                        className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-white shadow-xl cursor-pointer transition-transform duration-300 group-hover:scale-105"
                        onClick={() => handleImageClick(user.profileImage)}
                      />
                      <div
                        className="absolute inset-0 bg-black/0 hover:bg-black/20 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center"
                        onClick={() => handleImageClick(user.profileImage)}
                      >
                        <span className="text-white opacity-0 group-hover:opacity-100 text-sm font-medium">
                          View Large
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* User Info Cards */}
                  <div className="space-y-4">
                    {/* Name Card */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 border border-blue-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 p-3 rounded-xl shadow-lg">
                          <User size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            Full Name
                          </p>
                          <p className="text-xl font-bold text-gray-800">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Email Card */}
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-100 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <div className="bg-purple-600 p-3 rounded-xl shadow-lg">
                          <Mail size={24} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-600 font-medium mb-1">
                            Email Address
                          </p>
                          <p className="text-lg font-semibold text-gray-800 break-words">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="pt-4">
                    <button
                      onClick={() => navigate("/profile")}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <User size={20} />
                      View Full Profile
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="inline-block p-4 bg-gray-100 rounded-full mb-4">
                    <User size={48} className="text-gray-400" />
                  </div>
                  <p className="text-gray-600 text-lg font-medium">
                    No user data found
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    Please try logging in again
                  </p>
                </div>
              )}

              {/* Status Messages */}
              {loading && (
                <div className="flex items-center justify-center gap-2 text-blue-600 font-medium mt-6 bg-blue-50 py-3 rounded-xl">
                  <div className="w-5 h-5 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Loading your data...
                </div>
              )}
              {error && (
                <div className="mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl font-medium">
                  {error}
                </div>
              )}
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
  );
}

export default Dashboard;