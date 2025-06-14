import React from 'react';
import { motion } from 'framer-motion';
import {
  Bot, BrainCircuit, Camera, LineChart, BookText, ActivitySquare
} from 'lucide-react';

function WhatWeDo() {
  const features = [
   {
  icon: <Bot className="w-6 h-6 text-white" />,
  title: 'KrishiGPT Chatbot',
  desc: 'Ask anything about agriculture — powered by RAG and government PDFs for accurate answers.',
},
    {
      icon: <LineChart className="w-6 h-6 text-white" />,
      title: 'Crop Price Forecast',
      desc: 'Find the most profitable months to sell your crops with ML prediction.',
    },
    {
      icon: <Camera className="w-6 h-6 text-white" />,
      title: 'Soil Scanner (OCR)',
      desc: 'Upload lab reports to auto-fill nutrients & get crop suggestions.',
    },
    {
      icon: <ActivitySquare className="w-6 h-6 text-white" />,
      title: 'Pest Predictor',
      desc: 'Detect the most likely pest using real weather data and AI models.',
    },
    {
      icon: <BookText className="w-6 h-6 text-white" />,
      title: 'Khet Tracker',
      desc: 'Track field data, logs, and expenses with image support.',
    },
    {
      icon: <BrainCircuit className="w-6 h-6 text-white" />,
      title: 'AI Log Analyzer',
      desc: 'Get smart insights from your field logs — per category or full summary.',
    },
  ];

  return (
    <section className="bg-green-50 py-16 px-6 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl mx-auto mb-14"
      >
        <h2 className="text-4xl font-bold text-green-800">What We Do</h2>
        <p className="text-gray-600 mt-3 text-lg">
          Empowering Nepali farmers with AI-powered tools for smarter, easier agriculture. 🇳🇵🌱
        </p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1, duration: 0.5 }}
            className="bg-white rounded-2xl shadow-md border border-green-100 p-6 hover:shadow-xl transition-all duration-300"
          >
            <div className="bg-green-600 rounded-full p-3 mb-4 inline-flex">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhatWeDo;
