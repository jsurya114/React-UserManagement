import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { GetUsersById, UpdateUser } from "../../redux/admin/manageuserSlice.js"
import { useParams, useNavigate } from "react-router-dom"
import { CheckCircle } from "lucide-react"

function Edit() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { singleUser, loading, error, message } = useSelector((state) => state.manageUsers)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
    })
    const [showSuccessModal, setShowSuccessModal] = useState(false)

    useEffect(() => {
        dispatch(GetUsersById(id))
    }, [dispatch, id])

    useEffect(() => {
        if (singleUser) {
            setFormData({
                name: singleUser.name,
                email: singleUser.email
            })
        }
    }, [singleUser])

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                // Message will auto-clear after 6 seconds
            }, 6000)
            return () => clearTimeout(timer)
        }
    }, [message])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await dispatch(UpdateUser({ id, formData }))
        setShowSuccessModal(true)
    }

    function closeSuccessModal() {
        setShowSuccessModal(false)
        navigate("/admin/dashboard")
    }

    return (
        <>
            <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-emerald-50 to-teal-100 p-4">
                <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <h2 className="text-3xl font-bold text-gray-800 text-center">Edit User</h2>
                        <p className="text-gray-500 text-sm text-center mt-2">Update user information</p>
                    </div>

                    {loading && (
                        <div className="bg-blue-50 border border-blue-200 text-blue-600 text-sm p-3 rounded-lg mb-4 text-center">
                            Loading user data...
                        </div>
                    )}

                    {error && (
                        <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                            {error}
                        </div>
                    )}

                    {message && (
                        <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg mb-4 text-center animate-in fade-in duration-300">
                            {message}
                        </div>
                    )}

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter full name"
                                value={formData.name}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                placeholder="Enter email address"
                                value={formData.email}
                                onChange={handleChange}
                                className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                                required
                            />
                        </div>
                    </div>

                    <button
                        className="mt-6 bg-emerald-600 w-full text-white p-3 rounded-lg hover:bg-emerald-700 transition duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Updating..." : "Update User"}
                    </button>

                    <div className="mt-6 text-center">
                        <button
                            type="button"
                            onClick={() => navigate("/admin/dashboard")}
                            className="text-emerald-600 text-sm font-medium hover:text-emerald-700 hover:underline transition inline-flex items-center gap-1"
                        >
                            <span>←</span> Back to Dashboard
                        </button>
                    </div>
                </form>
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={closeSuccessModal}
                >
                    <div 
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-in zoom-in duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex flex-col items-center text-center">
                            <div className="bg-emerald-100 p-4 rounded-full mb-4">
                                <CheckCircle size={64} className="text-emerald-600" />
                            </div>
                            
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Success!
                            </h3>
                            
                            <p className="text-gray-600 mb-6">
                                User has been updated successfully.
                            </p>

                            <button
                                className="bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl w-full"
                                onClick={closeSuccessModal}
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Edit