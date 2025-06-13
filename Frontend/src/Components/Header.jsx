import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

function Header() {
  return (
    <header className="bg-gray-100 text-black border-b border-black/30 h-20">
      <div className="flex items-center justify-between px-6 h-full">

        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-16 w-16 object-cover" />
          <h2 className="text-2xl font-bold">FarmFuse</h2>
        </div>

        <nav className="flex h-full text-black font-medium text-xl">
          <Link to="/" className="px-6 h-full flex items-center hover:text-gray-400">Home</Link>
          <Link to="/chatbot" className="px-6 h-full flex items-center border-l border-black/30 hover:text-gray-400">Chatbot</Link>
          <Link to="/ai" className="px-6 h-full flex items-center border-l border-black/30 hover:text-gray-400">AI</Link>
          <Link to="/about" className="px-6 h-full flex items-center border-l border-black/30 hover:text-gray-400">About</Link>
          <Link to="/knowledge" className="px-6 h-full flex items-center border-l border-black/30 hover:text-gray-400">Knowledge</Link>
        </nav>

        <Link
          to="/login"
          className="bg-black text-green-600 font-semibold px-4 py-2 rounded hover:bg-gray-100 transition"
        >
          Login
        </Link>
      </div>
    </header>
  );
}

export default Header;
