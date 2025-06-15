import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../assets/logo01.png';

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/khet-tracker', label: 'Khet Tracker' },
    { to: '/chatbot', label: 'Rag AI' },
    { to: '/ai', label: 'AI Tools' },
    { to: '/success-stories', label: 'Success Stories' },
    { to: '/about', label: 'About Us' },
    { to: '/khet-defenders', label: 'Game' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="px-5 md:px-20 mx-auto h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-14 w-14 object-cover rounded-full" />
          <span className="text-xl font-bold text-green-700">KrishiGPT</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-16">
          <nav className="flex gap-10 text-[16px] font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `relative transition duration-200 pb-1 ${
                    isActive
                      ? 'text-green-700 font-semibold border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[2.5rem] text-green-700 hover:text-green-800 transition"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl border rounded-xl py-2 z-20 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-green-50 text-gray-700 transition"
                >
                  👤 View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-3xl text-green-700"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Profile Icon */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="text-[2rem] text-green-700 hover:text-green-800 transition"
            >
              <FaUserCircle />
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white shadow-xl border rounded-xl py-2 z-20 animate-fade-in">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-green-50 text-gray-700 transition"
                >
                  👤 View Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 text-red-600 transition"
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 text-[16px] font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block transition duration-200 pb-1 ${
                    isActive
                      ? 'text-green-700 font-semibold border-b-2 border-green-600'
                      : 'text-gray-600 hover:text-green-700 hover:border-b-2 hover:border-green-400'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
