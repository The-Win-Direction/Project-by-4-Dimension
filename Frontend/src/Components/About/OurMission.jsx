import React from 'react';
import { motion } from 'framer-motion';
import { Target, Leaf, TrendingUp } from 'lucide-react';

function OurMission() {
  return (
    <section className="bg-green-50 py-16 px-4 md:px-16 lg:px-32 text-black">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center space-y-6"
      >
        {/* Section Badge */}
        <span className="text-sm uppercase font-semibold tracking-wider text-green-600 bg-green-100 px-4 py-1 rounded-full">
          Our Mission
        </span>

        {/* Quote */}
        <h2 className="text-4xl md:text-5xl font-bold text-green-800 leading-tight">
          To make smart agriculture accessible to every farmer — from local fields to national markets.
        </h2>

        {/* Supporting Text */}
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          We aim to bridge the technological gap in agriculture by delivering powerful tools and insights directly to farmers’ hands — no matter where they are.
        </p>
      </motion.div>

      {/* Goals Row */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-12 grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <Target className="text-green-700 w-10 h-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Precision Decision-Making</h3>
          <p className="text-gray-600 text-sm">
            Help farmers make the right choices at the right time using data and AI.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <TrendingUp className="text-green-700 w-10 h-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Profit-Driven Guidance</h3>
          <p className="text-gray-600 text-sm">
            Maximize yields and market timing to increase profitability for all users.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center text-center hover:shadow-xl transition">
          <Leaf className="text-green-700 w-10 h-10 mb-3" />
          <h3 className="text-xl font-semibold mb-2">Sustainable Future</h3>
          <p className="text-gray-600 text-sm">
            Promote practices that protect the environment and ensure long-term productivity.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default OurMission;
