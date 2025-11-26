import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LoginUser } from "../../redux/user/userSlice.js";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error, user } = useSelector((state) => state.user)

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    console.log(formData)

    useEffect(() => {
        console.log("Current user:", user)
        if (user) {
            navigate("/dashboard")
        }
    }, [user, navigate])

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    function submitHandler(e) {
        e.preventDefault()
        dispatch(LoginUser(formData))
    }

    return (
        <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <form onSubmit={submitHandler} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Welcome Back</h2>
                    <p className="text-gray-500 text-sm text-center mt-2">Login to your account</p>
                </div>

                <div className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            onChange={handleChange}
                            value={formData.email}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            onChange={handleChange}
                            value={formData.password}
                            required
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mt-4 text-center">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    className="mt-6 bg-blue-600 w-full text-white p-3 rounded-lg hover:bg-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Don't have an account?{" "}
                    <span
                        onClick={() => navigate("/signup")}
                        className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 hover:underline transition"
                    >
                        Sign Up
                    </span>
                </p>
            </form>
        </div>
    )
}

export default Login