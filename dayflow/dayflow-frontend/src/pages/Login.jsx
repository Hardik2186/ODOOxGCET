import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api.js";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      const res = await authAPI.login(form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/employee/dashboard");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600"
          />

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Password"
            className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-500 hover:bg-purple-700 text-white rounded"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-purple-400">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
