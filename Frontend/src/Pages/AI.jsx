import React from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const aiTools = [
  {
    title: '🌱 Plant Disease Detection',
    description:
      'Upload an image of your crop, and our AI will detect signs of common plant diseases. Get instant diagnosis and prevention tips to save your yield.',
    route: '/ai/disease-detection',
    bg: 'from-red-100 to-pink-50',
    icon: '🦠',
    action: 'Detect Disease',
  },
  {
    title: '🌾 Crop Type Recommendation',
    description:
      'Not sure what to plant? Based on your soil, location, and climate, our AI recommends the most profitable and sustainable crop choices.',
    route: '/ai/crop-prediction',
    bg: 'from-yellow-100 to-green-50',
    icon: '🌿',
    action: 'Get Recommendation',
  },
  {
    title: '📈 Market Price Forecast',
    description:
      'Track past trends and forecast future prices for your crops. Maximize profit by selling in the right month, at the right market.',
    route: '/ai/price-prediction',
    bg: 'from-blue-100 to-cyan-50',
    icon: '📊',
    action: 'Forecast Prices',
  },
  {
  title: '🪲 Pest Prediction AI',
  description:
    'Enter current weather and environmental conditions to get the most likely pest prediction for your field.',
  route: 'pest-ai',
  bg: 'from-green-100 to-lime-50',
  icon: '🌾',
  action: 'Predict Pest',
},
];

function AI() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-7xl mx-auto px-4 pt-4">
        <motion.h2
          className="text-4xl sm:text-3xl font-extrabold text-green-800 mb-8 text-center leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          🌿 Smart AI Tools for Smarter Farming
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {aiTools.map((tool, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onClick={() => navigate(tool.route)}
              className={`cursor-pointer rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 p-7 border border-gray-100 bg-gradient-to-br ${tool.bg} group relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 opacity-20 text-9xl pointer-events-none select-none">
                {tool.icon}
              </div>
              <div className="relative z-10">
                <div className="text-5xl mb-4">{tool.icon}</div>
                <h3 className="text-2xl font-semibold text-green-800 group-hover:text-green-600 mb-3 transition">
                  {tool.title}
                </h3>
                <p className="text-gray-700 text-base leading-relaxed mb-4">
                  {tool.description}
                </p>
                <span className="text-green-600 font-semibold group-hover:underline">
                  {tool.action} →
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AI;
