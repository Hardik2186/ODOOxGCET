import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Call backend API for signup
    alert("Signup submitted: " + JSON.stringify(form));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign Up Page</h2>
        <div className="bg-gray-700 text-white text-lg rounded-md py-3 mb-6 text-center font-mono">
          App/Web Logo
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Company Name :-</label>
            <input
              type="text"
              name="company"
              value={form.company}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Name :-</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Email :-</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Phone :-</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="relative">
            <label className="block text-gray-300 mb-1">Password :-</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3 top-8 text-purple-400"
              tabIndex={-1}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Confirm Password :-</label>
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-900 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-1">Upload Logo</label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-purple-500 hover:bg-purple-700 text-white font-semibold rounded transition"
          >
            Sign Up
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

export default Register;