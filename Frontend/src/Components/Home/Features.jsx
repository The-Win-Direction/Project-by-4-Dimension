import React from "react";

const features = [
  {
    icon: "📊",
    title: "AI Market Price Prediction",
    description: "Get accurate forecasts of crop prices to know the best time to sell.",
  },
  {
    icon: "📍",
    title: "Province-wise Insights",
    description: "Understand market trends specific to your region or province.",
  },
  {
    icon: "🌾",
    title: "Crop Profitability Guide",
    description: "Compare crop options to pick the most profitable one for your location.",
  },
  {
    icon: "📅",
    title: "Top Selling Months",
    description: "See the best months to sell each crop based on historical market trends.",
  },
  {
    icon: "🧠",
    title: "Smart AI Engine",
    description: "Powered by machine learning for reliable agricultural forecasting.",
  },
  {
    icon: "📱",
    title: "User Friendly",
    description: "Access predictions and insights on any device, designed for farmers, built with tech.",
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-green-50 py-16 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-8">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-green-600 p-6 rounded-2xl shadow hover:shadow-md transition"
            >
              <div className="text-green-600 text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
