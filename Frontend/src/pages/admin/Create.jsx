import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { CreateUser } from "../../redux/admin/manageuserSlice.js"
import { useNavigate } from "react-router-dom"

function Create() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, error, message } = useSelector((state) => state.manageUsers)

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    })

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await dispatch(CreateUser(formData))
        alert("User created successfully")
        navigate("/admin/dashboard")
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create New User</h2>
                    <p className="text-gray-500 text-sm text-center mt-2">Add a new user to the system</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                {message && (
                    <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-lg mb-4 text-center">
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
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
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
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition"
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 bg-purple-600 w-full text-white p-3 rounded-lg hover:bg-purple-700 transition duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating..." : "Create User"}
                </button>

                <div className="mt-6 text-center">
                    <button
                        type="button"
                        onClick={() => navigate("/admin/dashboard")}
                        className="text-purple-600 text-sm font-medium hover:text-purple-700 hover:underline transition inline-flex items-center gap-1"
                    >
                        <span>←</span> Back to Dashboard
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Create