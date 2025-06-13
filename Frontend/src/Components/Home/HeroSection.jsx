import React from "react";
import { Link } from 'react-router-dom';
import image from '../../assets/homepic.jpg';

const HeroSection = () => {
  return (
    <section className="bg-green-50 py-20 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-24">
        
        {/* Text Content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl font-bold text-green-800 leading-tight">
            Smarter Farming Starts Here with <span className="text-green-600">Farmfuse</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700">
            Harness the power of AI to predict crop prices, monitor plant health, and boost your farm’s profitability — all in one platform.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <Link to='/ai' className="bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition">
              Get Started
            </Link>
            <Link to='/about' className="bg-white border border-green-600 text-green-600 px-6 py-3 rounded-xl hover:bg-green-100 transition">
              Learn More
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="flex  md:justify-end">
          <img src={image} alt="Farmfuse AI Illustration" className="h-[20rem]  rounded-xl shadow-lg" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
