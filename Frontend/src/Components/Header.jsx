import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header className="bg-gray-100 text-black">
            <div className="flex items-center justify-between px-6 py-4">
                <h2 className="text-xl font-bold">FarmFuse</h2>
                <Link
                    to="/login"
                    className="bg-black text-green-600 font-semibold px-4 py-1 rounded hover:bg-gray-100 transition"
                >
                    Login
                </Link>
            </div>

            <hr className="border-t border-black/30" />

            <nav className="flex justify-center  items-stretch text-black font-medium text-xl">
                <Link to="/" className="px-14 py-3 hover:text-gray-400">
                    Home
                </Link>
                <Link to="/chatbot" className="px-14 py-3 hover:text-gray-400 border-l border-black/30">
                    Chatbot
                </Link>
                <Link to="/ai" className="px-14 py-3 hover:text-gray-400 border-l border-black/30">
                    AI
                </Link>
                <Link to="/about" className="px-14 py-3 hover:text-gray-400 border-l border-black/30">
                    About
                </Link>
                <Link to="/knowledge" className="px-14 py-3 hover:text-gray-400 border-l border-black/30">
                    Knowledge
                </Link>
            </nav>



        </header>
    );
}

export default Header;
