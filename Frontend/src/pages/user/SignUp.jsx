import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SignupUser } from "../../redux/user/userSlice.js"
import { useNavigate } from "react-router-dom"

function SignUp() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { loading, signupSuccess, error } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmpassword: ""
    })

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(SignupUser(formData))
    }

    useEffect(() => {
        if (signupSuccess) {
            alert("Signed Up successfully please Login")
            navigate("/")
        }
    }, [signupSuccess, navigate])

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
            <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg border border-gray-100">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-gray-800 text-center">Create Account</h2>
                    <p className="text-gray-500 text-sm text-center mt-2">Join us today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4 text-center">
                        {error}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Full Name"
                            className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="password"
                            name="confirmpassword"
                            placeholder="Confirm Password"
                            className="border border-gray-300 w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            value={formData.confirmpassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 bg-blue-600 text-white py-3 rounded-lg w-full hover:bg-blue-700 transition duration-200 font-medium shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </button>

                <p className="mt-6 text-sm text-center text-gray-600">
                    Already have an account?{" "}
                    <span
                        onClick={() => navigate("/")}
                        className="text-blue-600 font-medium cursor-pointer hover:text-blue-700 hover:underline transition"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    )
}

export default SignUp