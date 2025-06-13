import React from 'react';
import { motion } from 'framer-motion';
import farmingImage from '../../assets/Homeimage.jpg'; 

function WhoWeAre() {
  return (
    <section className="bg-white py-12 px-4 md:px-16 lg:px-32 text-black">
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <img
            src={farmingImage}
            alt="Smart Farming Illustration"
            className="w-full h-auto rounded-2xl shadow-md"
          />
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-4"
        >
          <h2 className="text-4xl font-bold text-green-700">Who We Are</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            <span className="font-semibold text-black">FarmFuse</span> is an innovative agri-intelligence platform built for farmers, agri-businesses, and policy-makers.
            We blend the wisdom of traditional farming with the power of cutting-edge technology to help users make informed, profitable, and sustainable decisions.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            We exist to bridge the digital divide in agriculture and ensure that even the smallest farms have access to world-class insights and tools.
          </p>
        </motion.div>

      </div>
    </section>
  );
}

export default WhoWeAre;
