import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../lib/api.js";

const Signup = () => {
  const [form, setForm] = useState({
    company: "",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    logo: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("company", form.company);
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("phone", form.phone);
      formData.append("password", form.password);
      formData.append("logo", form.logo);

      const res = await authAPI.register(formData);

      // Save token & user
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Admin created → go to admin dashboard
      navigate("/admin");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 text-purple-400"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 bg-gray-900 text-white border border-gray-600 rounded"
          />

          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-gray-300"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded"
          >
            {loading ? "Creating..." : "Create Company"}
          </button>
        </form>

        <div className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-400 hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
