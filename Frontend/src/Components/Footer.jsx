import React from 'react';
import { FaFacebookF, FaGithub, FaLinkedin } from 'react-icons/fa';
import logo from '../assets/logo01.png';

function Footer() {
  return (
    <footer className="bg-gray-700 text-white py-8 px-6 md:px-20 lg:px-32">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
        
        {/* Logo & Description */}
        <div className="space-y-5 flex flex-col items-center md:items-start">
          <div className="flex items-center gap-4">
            <img src={logo} alt="KrishiGPT Logo" className="w-16 h-16 object-cover" />
            <h2 className="text-2xl font-bold tracking-wide">KrishiGPT</h2>
          </div>
          <p className="text-white text-sm md:text-base">किसानको डिजिटल साथी</p>
        </div>

        {/* Social Media */}
        <div className="flex flex-col items-center md:items-center gap-5">
          <h3 className="text-xl font-semibold">Follow Us</h3>
          <div className="flex gap-6 text-2xl">
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
        <div className="space-y-4 flex flex-col items-center md:items-end text-sm md:text-base">
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p>📧 support@KrishiGPT.ai</p>
          <p>📞 +977-9864311321</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-8 border-t border-white/20 pt-6 text-center text-md text-white/80">
        © {new Date().getFullYear()} KrishiGPT. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
