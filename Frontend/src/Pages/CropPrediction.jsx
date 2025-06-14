import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

function CropPrediction() {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '',
    temperature: '', humidity: '',
    ph: '', rainfall: ''
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ocrLoading, setOcrLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoFilledFields, setAutoFilledFields] = useState([]);

  const fieldLabels = {
    N: 'Nitrogen (N)',
    P: 'Phosphorus (P)',
    K: 'Potassium (K)',
    temperature: 'Temperature (°C)',
    humidity: 'Humidity (%)',
    ph: 'Soil pH',
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const num = Number(value);
    if (value === '' || (num >= fieldLimits[name].min && num <= fieldLimits[name].max)) {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const clampValue = (value, min, max) => {
    if (value < min) return min;
    if (value > max) return max;
    return value;
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setOcrLoading(true);
    setError(null);
    setAutoFilledFields([]);
    setPrediction(null);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await axios.post('https://ocr-4-dimension.onrender.com/soil-ocr/', form);
      const parsed = res.data.parsed_data;
      const updated = {};
      const filled = [];

      // Normalize all OCR keys to lowercase
      const normalizedParsed = {};
      Object.entries(parsed).forEach(([key, value]) => {
        normalizedParsed[key.toLowerCase()] = value;
      });

      Object.keys(fieldLimits).forEach((key) => {
        const rawValue = normalizedParsed[key.toLowerCase()];
        if (rawValue !== undefined && rawValue !== null && rawValue !== '') {
          const num = parseFloat(rawValue);
          const clamped = clampValue(num, fieldLimits[key].min, fieldLimits[key].max);
          updated[key] = clamped.toString();
          filled.push(key);
        }
      });

      setFormData(prev => ({ ...prev, ...updated }));
      setAutoFilledFields(filled);
    } catch (err) {
      setError('⚠️ Failed to extract data. Please upload a clear soil report.');
    }

    setOcrLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setPrediction(null);

    try {
      const res = await axios.post('https://crop-recommender-from-soil-4-dimension.onrender.com/predict', {
        N: parseInt(formData.N),
        P: parseInt(formData.P),
        K: parseInt(formData.K),
        temperature: parseFloat(formData.temperature),
        humidity: parseFloat(formData.humidity),
        ph: parseFloat(formData.ph),
        rainfall: parseFloat(formData.rainfall)
      });

      setPrediction(res.data.predicted_crop);
    } catch (err) {
      setError('⚠️ Failed to get prediction. Please check values and try again.');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-green-100 to-lime-50 p-6 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto mt-6 bg-white shadow-xl rounded-2xl p-6">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-4">🌿 Crop Recommendation</h2>

        <div className="flex justify-center mb-4">
          <label className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg cursor-pointer shadow-md">
            📷 Upload Soil Report
            <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {ocrLoading && (
          <p className="text-center text-sm text-green-600 mb-2">🔄 Analyzing image...</p>
        )}

        {autoFilledFields.length > 0 && (
          <p className="text-center text-sm text-gray-500 italic mb-4">
            ✅ Autofilled values (corrected if out of range): {autoFilledFields.join(', ')}
          </p>
        )}

        <div className="grid grid-cols-2 gap-4">
          {Object.keys(fieldLabels).map((field) => (
            <div key={field} className="flex flex-col">
              <label htmlFor={field} className="mb-1 text-sm font-semibold text-gray-700">{fieldLabels[field]}</label>
              <input
                id={field}
                name={field}
                type="number"
                value={formData[field]}
                onChange={handleChange}
                min={fieldLimits[field].min}
                max={fieldLimits[field].max}
                placeholder={`Enter ${fieldLabels[field]}`}
                className={`border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
                  autoFilledFields.includes(field) ? 'border-green-400 bg-green-50' : 'border-gray-300'
                }`}
              />
              <small className="text-xs text-gray-500">Range: {fieldLimits[field].min} - {fieldLimits[field].max}</small>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            disabled={loading || ocrLoading}
            className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl shadow-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? '🔍 Predicting...' : '🌾 Get Recommendation'}
          </button>
        </div>

        {prediction && (
          <div className="mt-6 text-center text-2xl font-semibold text-green-700">
            ✅ Recommended Crop: <span className="font-bold underline">{prediction}</span>
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
