import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import image from '../assets/login.png';
import { BACKEND_BASE_URL } from '../config';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const res = await axios.post(`${BACKEND_BASE_URL}/api/auth/signin`, formData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      setSuccessMsg('✅ Login successful!');
      navigate('/'); 
    } catch (err) {
      const msg = err.response?.data?.message || '❌ Login failed. Please try again.';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
      setFormData({ email: '', password: '' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-green-50">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10 bg-white shadow-lg">
        <div className="w-full max-w-md space-y-6">
          <h2 className="text-3xl font-bold text-green-700 text-center">Welcome Back 👋</h2>
          <p className="text-center text-gray-500">Login to access your account</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
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
                value={formData.password}
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
            {errorMsg && <p className="text-red-600 text-sm font-medium">{errorMsg}</p>}
            {successMsg && <p className="text-green-600 text-sm font-medium">{successMsg}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition duration-300 disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{' '}
              <Link to="/sign-up" className="text-green-600 hover:underline font-medium">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Image Section */} 
      <div className="hidden md:flex w-full md:w-1/2 bg-green-100 items-center justify-center">
        <img src={image} alt="Login Illustration" className="w-4/5" />
      </div>
    </div>
  );
};

export default Login;
