import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiService } from "../../services/apiService";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaSignInAlt,
  FaReact,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
      const response = await apiService({
        method: "POST",
        url: "/auth/login",
        data: {
          username: formData.get("username"),
          password: formData.get("password"),
        },
      });

      if (response.status !== 200) {
        toast.error("Login failed. Please check your credentials.");
        return;
      }

      Cookies.set("accessToken", response.data.accessToken, {
        expires: 1,
        secure: false,
        sameSite: "Strict",
      });

      Cookies.set("refreshToken", response.data.refreshToken, {
        expires: 7,
        secure: false,
        sameSite: "Strict",
      });


      localStorage.setItem(
        "user",
        JSON.stringify({
          username: response.data.username,
          email: response.data.email,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          gender: response.data.gender,
          profile_image: response.data.image,
        })
      );


      // localStorage.setItem("accessToken", response.data.accessToken);
      // localStorage.setItem("refreshToken", response.data.refreshToken);

      toast.success("Login Successfully");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <FaReact className="text-6xl text-sky-500 animate-spin" />
          <h1 className="text-3xl font-bold mt-3 text-gray-800">
            React Login
          </h1>
          <p className="text-gray-500 mt-1">
            Sign in to continue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Username
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <FaEnvelope className="text-gray-400" />

              <input
                type="text"
                name="username"
                placeholder="Enter your username"
                className="w-full ml-3 outline-none"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="mt-2 flex items-center border rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500">
              <FaLock className="text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                className="w-full ml-3 outline-none"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Remember */}
          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="remember"
                className="accent-blue-600"
              />
              Remember Me
            </label>

            <a
              href="#"
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
          >
            <FaSignInAlt />
            Login
          </button>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <a
            href="#"
            className="text-blue-600 font-medium hover:underline"
          >
            Register
          </a>
        </p>

        <p className="text-center text-gray-500 text-sm mt-8">
          <Link to="/about_us" className="text-blue-600 font-medium hover:underline">
            About US
          </Link>
        </p>


        <p className="text-center text-gray-500 text-sm mt-8">
          <Link to="/tc" className="text-blue-600 font-medium hover:underline">
            Terms and Conditions
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;