import React from 'react';
import { motion } from 'framer-motion';
import { Bot, LineChart, BookOpenText, CloudSun, Cpu } from 'lucide-react';

function WhatWeDo() {
  const features = [
    {
      icon: <Bot className="w-6 h-6 text-green-700" />,
      title: 'AI Chatbot',
      desc: '24/7 KrishiGPT for instant answers.',
    },
    {
      icon: <LineChart className="w-6 h-6 text-green-700" />,
      title: 'Price Prediction',
      desc: 'Know when to sell for max profit.',
    },
    {
      icon: <BookOpenText className="w-6 h-6 text-green-700" />,
      title: 'Knowledge Base',
      desc: 'Easy guides on crops & techniques.',
    },
    {
      icon: <CloudSun className="w-6 h-6 text-green-700" />,
      title: 'Smart Suggestions',
      desc: 'Weather-based crop care (beta).',
    },
    {
      icon: <Cpu className="w-6 h-6 text-green-700" />,
      title: 'Data Insights',
      desc: 'Agri dashboards for smarter planning.',
    },
  ];

  return (
    <section className="bg-white py-12 px-4 md:px-16 lg:px-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <h2 className="text-3xl font-bold text-green-800">What We Do</h2>
        <p className="text-gray-600 mt-3 text-base">
          We simplify farming with technology — focused, fast, and farmer-first.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5  mx-auto">
        {features.map((feature, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08, duration: 0.4 }}
            className="bg-green-50 border border-green-100 rounded-xl p-4 text-sm flex flex-col gap-2 items-start hover:shadow-md transition"
          >
            {feature.icon}
            <h3 className="text-md font-semibold text-green-700">{feature.title}</h3>
            <p className="text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhatWeDo;
