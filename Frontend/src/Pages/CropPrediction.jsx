import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

function CropPrediction() {
  const [formData, setFormData] = useState({
    N: '',
    P: '',
    K: '',
    temperature: '',
    humidity: '',
    ph: '',
    rainfall: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, min, max } = e.target;
    const numericValue = Number(value);

    if (value === '' || (numericValue >= Number(min) && numericValue <= Number(max))) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('https://crop-recommender-from-soil-4-dimension.onrender.com/predict', {
        N: parseInt(formData.N),
        P: parseInt(formData.P),
        K: parseInt(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall),
      });
      setPrediction(response.data.predicted_crop);
    } catch (err) {
      setError('Failed to get prediction. Please check input values and try again.');
    }
    setLoading(false);
  };

  const fieldLabels = {
    N: 'Nitrogen (N)',
    P: 'Phosphorus (P)',
    K: 'Potassium (K)',
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    ph: 'Soil pH Level',
    rainfall: 'Rainfall (mm)'
  };

  const fieldLimits = {
    N: { min: 0, max: 140 },
    P: { min: 5, max: 145 },
    K: { min: 5, max: 205 },
    temperature: { min: 5.0, max: 50.0 },
    humidity: { min: 0.0, max: 100.0 },
    ph: { min: 3.0, max: 10.0 },
    rainfall: { min: 0.0, max: 300.0 }
  };

  return (
    <div className="min-h-screen bg-green-50 p-6 font-sans">
      <Header />
      <div className="max-w-2xl mx-auto mt-6 bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-green-800 mb-4">Crop Recommendation</h2>
        <div className="grid grid-cols-2 gap-4">
          {Object.keys(fieldLabels).map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-1 text-sm font-medium text-gray-700">{fieldLabels[field]}</label>
              <input
                id={field}
                name={field}
                type="number"
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Enter ${fieldLabels[field]}`}
                min={fieldLimits[field].min}
                max={fieldLimits[field].max}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <small className="text-gray-500 text-xs mt-1">
                Range: {fieldLimits[field].min} - {fieldLimits[field].max}
              </small>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Predicting...' : 'Get Crop Recommendation'}
          </button>
        </div>
        {prediction && (
          <div className="text-center text-xl text-green-700 mt-6">
            Recommended Crop: <span className="font-bold">{prediction}</span>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 mt-4">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default CropPrediction;
