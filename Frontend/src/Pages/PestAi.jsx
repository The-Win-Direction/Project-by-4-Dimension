import React, { useState } from 'react';
import axios from 'axios';

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

      const key = Object.keys(res.data).find((k) => k.startsWith('predicted_'));
      if (key) {
        const pestName = key.replace('predicted_', '');
        setPredictedPest(pestName);
      } else {
        setPredictedPest('Unknown');
      }
    } catch (err) {
      console.error(err);
      setPredictedPest('Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
          🌿 Predict Most Likely Pest
        </h2>

        {/* Input Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: 'RF', label: 'Rainfall (mm)', min: 0, max: 90.3 },
            { name: 'Temp_Max', label: 'Max Temperature (°C)', min: 28, max: 36.6 },
            { name: 'Temp_Min', label: 'Min Temperature (°C)', min: 10.18, max: 26.2 },
            { name: 'RH_I', label: 'Relative Humidity - Morning (%)', min: 63.65, max: 92.8 },
            { name: 'RH_II', label: 'Relative Humidity - Evening (%)', min: 31.25, max: 71.05 },
            { name: 'BSS', label: 'Bright Sunshine (hours)', min: 1, max: 20.7 },
            { name: 'Wind_Velocity', label: 'Wind Speed (km/h)', min: 0.55, max: 6.55 },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
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
                className="w-full border border-green-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded-xl w-full transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Predicting...' : 'Predict Pest'}
        </button>

        {/* Prediction Result */}
        {predictedPest && (
          <div className="mt-8 text-center">
            <h3 className="text-xl font-semibold text-green-700 mb-2">Predicted Pest:</h3>
            <div className="text-2xl text-gray-800 font-bold">
              🪲 {predictedPest}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PestPredictorPage;
