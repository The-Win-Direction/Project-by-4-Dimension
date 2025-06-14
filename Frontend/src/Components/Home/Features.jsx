import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "📊",
    title: "AI Market Price Prediction",
    description: "Accurately predict future prices and decide the best time to sell your crops.",
  },
  {
    icon: "📍",
    title: "Province-wise Insights",
    description: "Get region-specific forecasts tailored to your province’s market trends.",
  },
  {
    icon: "🌾",
    title: "Crop Profitability Guide",
    description: "Compare potential earnings from different crops in your region.",
  },
  {
    icon: "📅",
    title: "Top Selling Months",
    description: "See the historically best months to sell each crop profitably.",
  },
  {
    icon: "🧠",
    title: "Smart AI Engine",
    description: "Machine learning-powered predictions to support smarter decisions.",
  },
  {
    icon: "📱",
    title: "User Friendly",
    description: "Mobile-first, farmer-focused design for ease of use on all devices.",
  },
  {
    icon: "📷",
    title: "Disease Detection from Image",
    description: "Upload plant photos to instantly detect diseases using AI vision models.",
  },
  {
    icon: "🧾",
    title: "Soil Scan with OCR",
    description: "Snap a soil report and auto-extract values for instant analysis.",
  },
  {
    icon: "💬",
    title: "RAG Chatbot Assistant",
    description: "Chat with an AI that pulls real documents and answers farming queries.",
  },
  {
    icon: "🗂️",
    title: "Personalized Khet Tracker",
    description: "Track soil, crops, irrigation, pests, and expenses per field in one place.",
  },
  {
    icon: "📈",
    title: "AI Log Analyzer",
    description: "Get AI insights from your field logs – from soil to economics and more.",
  },
  {
    icon: "🌱",
    title: "Crop Recommendation",
    description: "Get the best crop suggestions from your soil values using AI.",
  },
  {
    icon: "🐛",
    title: "Pest Prediction",
    description: "Anticipate pest outbreaks before they happen using AI forecasting.",
  },
  {
    icon: "🤖",
    title: "All-in-One AI Assistant",
    description: "Your digital krishi expert — always ready to help with smart insights.",
  },
];

const FeatureSection = () => {
  return (
    <section className=" py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-green-700 mb-12">
          🌟 KrishiGPT Key Features
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="bg-white border border-green-100 rounded-2xl shadow-md hover:shadow-xl transition p-6 text-left"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
