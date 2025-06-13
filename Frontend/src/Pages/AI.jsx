import React from 'react';
import Header from '../Components/Header';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const aiTools = [
  {
    title: '🌾 Crop Type Prediction',
    description:
      'Discover the most suitable crops for your land by analyzing soil health, pH levels, and climate. Boost your productivity and farm smarter with data-backed crop selection.',
    route: '/ai/crop-prediction',
  },
  {
    title: '📈 Market Price Forecast',
    description:
      'Plan your sales like a pro. Analyze historical price trends and region-specific market data to pinpoint the most profitable months to sell your harvest.',
    route: '/ai/price-prediction',
  },
  {
    title: '🧪 Fertilizer & Pesticide Suggestion',
    description:
      'Get AI-driven recommendations tailored to your crop and soil condition. Apply just the right amount of fertilizer and pesticide to maximize yield and reduce costs.',
    route: '/ai/fertilizer-pesticide',
  },
  {
    title: '💬 AI Chatbot Assistant',
    description:
      'Have questions about your crops or facing farm issues? Chat with our AI assistant anytime for instant support, tips, and troubleshooting.',
    route: '/chatbot',
  },
];

function AI() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <motion.h2
          className="text-3xl font-bold text-green-700 mb-10 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🌿 Explore Our AI Tools
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-10">
          {aiTools.map((tool, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(tool.route)}
              className="cursor-pointer bg-white rounded-3xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-green-400 transition-all duration-300 p-6 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-transparent to-transparent opacity-0 group-hover:opacity-30 transition-all duration-300 rounded-3xl z-0" />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-green-800 mb-3 group-hover:text-green-600 transition">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {tool.description}
                </p>
                <div className="mt-4 text-green-500 font-medium group-hover:underline">
                  {tool.title.includes('Crop Type')
                    ? 'Predict Suitable Crops →'
                    : tool.title.includes('Market Price')
                    ? 'Forecast Prices →'
                    : tool.title.includes('Fertilizer')
                    ? 'Get Smart Suggestions →'
                    : tool.title.includes('Chatbot')
                    ? 'Ask the Assistant →'
                    : 'Explore →'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AI;
