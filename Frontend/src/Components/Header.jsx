import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="bg-white shadow-md h-20  sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-12  justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-16 w-16 object-cover rounded-full" />
          <h1 className="text-3xl font-montserrat text-green-700">FarmFuse</h1>
        </div>

        {/* Navigation */}
        <nav className="flex gap-16 text-lg font-medium text-gray-700">
          <Link to="/" className="hover:text-green-600 transition">Home</Link>
          <Link to="/chatbot" className="hover:text-green-600 transition">Chatbot</Link>
          <Link to="/ai" className="hover:text-green-600 transition">AI</Link>
          <Link to="/about" className="hover:text-green-600 transition">About</Link>
          <Link to="/knowledge" className="hover:text-green-600 transition">Knowledge</Link>
        </nav>

        {/* Login Button */}
        <Link
          to="/login"
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;
