import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import image from '../assets/signup.jpg';
import { BACKEND_BASE_URL } from '../config';

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/api/auth/signup`, form);
      setMessage(response.data.message);
      setForm({ name: '', email: '', password: '' });
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white shadow-lg">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-green-700 text-center">Create Account ✨</h2>
          <p className="text-center text-gray-500">Sign up to get started</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="Dipa Joshi"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="you@example.com"
              />
            </div>

            <div className="relative">
              <label className="block text-sm text-gray-600 mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 pr-10 border rounded-lg focus:ring-2 focus:ring-green-400"
                placeholder="••••••••"
              />
              <div
                className="absolute right-3 top-10 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Feedback Messages */}
            {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
            {message && <p className="text-green-600 text-sm font-medium">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 hover:underline font-medium">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Image Section */}
      <div className="hidden md:flex w-full md:w-1/2 bg-green-100 items-center justify-center">
        <img src={image} alt="Signup Illustration" className="w-4/5" />
      </div>
    </div>
  );
}
