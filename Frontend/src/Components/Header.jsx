import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo01.png';
import { NavLink } from 'react-router-dom';


function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md h-20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center gap-12 justify-between">

        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-16 w-16 object-cover rounded-full" />
        </div>

        {/* Navigation */}
        <nav className="flex gap-16 text-lg font-medium text-gray-700">
          {[
            { to: '/', label: 'Home' },
            { to: '/chatbot', label: 'Chatbot' },
            { to: '/ai', label: 'AI' },
            { to: '/about', label: 'About' },
            { to: '/success-stories', label: 'Success Stories' },

            { to: '/disease-detection', label: 'Detection' },

          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? 'border-b-2 border-green-600 text-green-700 transition'
                  : 'hover:text-green-600 transition'
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>


        {/* Profile Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-5xl text-green-700 cursor-pointer "
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg border rounded-md py-2 z-10">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                View Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
