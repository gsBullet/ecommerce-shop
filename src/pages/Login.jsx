import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Axios from "../service/Axios"; // your axios instance
import { Eye, EyeOff, Loader2 } from "lucide-react";

import "./css/register.css";
import SweetAlert from "../components/common/SweetAlert";
import { FrontendAuthContext } from "../context/FrontendAuthContext";

const Login = () => {
  const { setUser, setIsAuthenticated } = useContext(FrontendAuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = async (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await Axios.post("/auth/general-user-login", formData);
      console.log("res", res);

      if (res.data.success) {
        localStorage.setItem("usertoken", res.data.data.token);
        setIsAuthenticated({
          isAuth: true,
          token: res.data.data?.token,
        });
        setUser(res.data.data?.user);
        SweetAlert({
          icon: "success",
          title: res.data.message,
        });
        navigate("/");
      }
    } catch (err) {
      SweetAlert({
        icon: "error",
        title: err.response.data?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginsignup">
      <div className="max-w-lg w-full m-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 text-center">
            Welcome Back
          </h1>
          <p className="mt-3 text-gray-600">Sign in to continue shopping</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition pr-12"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="ml-2 text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 rounded-lg  hover:from-blue-700 hover:to-purple-700 transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="bg-white px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Sign up link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-800"
              >
                Sign up free
              </Link>
            </p>
          </div>
        </div>

        {/* Optional: Footer */}
        <p className="mt-10 text-center text-xs text-gray-500">
          By signing in, you agree to our{" "}
          <a href="#" className="underline">
            Terms
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
