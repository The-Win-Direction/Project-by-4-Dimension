import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header'; // Add your header component here
import { motion } from 'framer-motion';

function PestPredictorPage() {
  const [formData, setFormData] = useState({
    RF: '23.25',
    Temp_Max: '30.5',
    Temp_Min: '20.86',
    RH_I: '78.45',
    RH_II: '51.92',
    BSS: '6.03',
    Wind_Velocity: '2.73',
  });

  const [predictedPest, setPredictedPest] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

const handleSubmit = async () => {
  setLoading(true);
  try {
    const payload = {
      RF: parseFloat(formData.RF),
      Temp_Max: parseFloat(formData.Temp_Max),
      Temp_Min: parseFloat(formData.Temp_Min),
      RH_I: parseFloat(formData.RH_I),
      RH_II: parseFloat(formData.RH_II),
      BSS: parseFloat(formData.BSS),
      Wind_Velocity: parseFloat(formData.Wind_Velocity),
    };

    const res = await axios.post('https://pest-ai.onrender.com/predict', payload);

    const pestKey = Object.keys(res.data).find((k) => k.startsWith('predicted_'));
    if (pestKey) {
      const pestName = pestKey.replace('predicted_', '');
      const pestValue = res.data[pestKey];
      const unit = res.data.unit || '';
      setPredictedPest({ name: pestName, value: pestValue, unit });
    } else {
      setPredictedPest(null);
    }
  } catch (err) {
    console.error(err);
    setPredictedPest('error');
  } finally {
    setLoading(false);
  }
};


  return (
    <div>
      <Header />
    <div className="min-h-screen bg-green-50  px-4">

      <motion.div
        className="max-w-4xl mx-auto glassmorphic-card p-10 rounded-xl shadow-2xl backdrop-blur-md border border-green-200"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-green-700 mb-10 text-center tracking-tight">
          🐛 Pest Predictor
        </h2>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { name: 'RF', label: '🌧️ Rainfall (mm)', min: 0, max: 90.3 },
            { name: 'Temp_Max', label: '🌡️ Max Temperature (°C)', min: 28, max: 36.6 },
            { name: 'Temp_Min', label: '🌡️ Min Temperature (°C)', min: 10.18, max: 26.2 },
            { name: 'RH_I', label: '💧 Humidity Morning (%)', min: 63.65, max: 92.8 },
            { name: 'RH_II', label: '💧 Humidity Evening (%)', min: 31.25, max: 71.05 },
            { name: 'BSS', label: '☀️ Bright Sunshine (hours)', min: 1, max: 20.7 },
            { name: 'Wind_Velocity', label: '💨 Wind Speed (km/h)', min: 0.55, max: 6.55 },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-md font-medium text-green-800 mb-2">
                {field.label}
              </label>
              <input
                type="number"
                step="any"
                name={field.name}
                min={field.min}
                max={field.max}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-green-300 rounded-xl px-4 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500 shadow-sm"
                required
              />
            </div>
          ))}
        </div>

        {/* Predict Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="mt-10 w-full bg-gradient-to-r from-green-600 to-lime-500 hover:from-green-700 hover:to-lime-600 text-white text-lg font-semibold py-3 rounded-full shadow-md transition duration-300 disabled:opacity-50"
        >
          {loading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Predicting...</span>
            </div>
          ) : (
            '🔍 Predict Pest'
          )}
        </motion.button>

      {predictedPest && predictedPest !== 'error' && (
  <motion.div
    className="mt-10 p-6 bg-white/80 rounded-xl shadow-inner border border-green-200 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <h3 className="text-2xl font-semibold text-green-700 mb-2">Prediction Result</h3>
    <div className="text-xl text-gray-800 font-semibold">
      🪲 <span className="capitalize">{predictedPest.name}</span>
    </div>
    <div className="text-3xl text-green-800 font-bold mt-2">
      {predictedPest.value} <span className="text-base font-medium text-gray-600">{predictedPest.unit}</span>
    </div>
  </motion.div>
)}

{predictedPest === 'error' && (
  <div className="mt-6 text-center text-red-600 font-semibold">
    ❌ Failed to get prediction. Please try again.
  </div>
)}

      </motion.div>
    </div>
    </div>
  );
}

export default PestPredictorPage;
