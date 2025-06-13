import React from "react";
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-green-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-800 leading-tight">
          Smarter Farming Starts Here with <span className="text-green-600">Farmfuse</span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto">
          Harness the power of AI to predict crop prices, monitor plant health, and boost your farm’s profitability — all in one platform.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <Link to='/ai' className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition">
            Try Now
          </Link>
          <Link to='/about' className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-50 transition">
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
