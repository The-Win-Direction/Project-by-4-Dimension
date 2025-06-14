import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo01.png';

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-12 px-6 md:px-20 lg:px-36">
      <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-12 text-base text-center md:text-left">
        
        {/* Logo & Description */}
        <div className="space-y-4 flex flex-col items-center md:items-start">
          {/* Logo and Title */}
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-start gap-3">
            <img src={logo} alt="FarmFuse Logo" className="w-20 h-20 object-cover" />
            <h2 className="text-2xl font-bold tracking-wide text-white">FarmFuse</h2>
          </div>
          {/* Tagline */}
          <p className="text-white leading-relaxed text-center md:text-left">
            किसानको डिजिटल साथी
          </p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center mt-8 space-y-4">
          <h3 className="text-2xl">Follow Us</h3>
          <div className="flex gap-8 text-3xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition">
              <FaFacebookF />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition">
              <FaLinkedin />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition">
              <FaGithub />
            </a>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 text-center mt-8 md:text-right">
          <h3 className="font-semibold text-2xl">Contact Us</h3>
          <p className="text-white">📧 support@farmfuse.ai</p>
          <p className="text-white">📞 +977-9812345678</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-white/30 pt-6 text-center text-xl text-white">
        © {new Date().getFullYear()} FarmFuse. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
