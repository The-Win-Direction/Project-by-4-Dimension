import React, { useState } from 'react';
import Header from '../Components/Header';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function DiseaseDetection() {
  const [dragging, setDragging] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    setFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('https://vecrosoft-ai.onrender.com/predict/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setPrediction(res.data);
    } catch (err) {
      console.error("Error uploading the file", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white pb-10">
      <Header />

      <motion.div
        className="max-w-2xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
          🌿 Upload Crop Image for Disease Detection
        </h2>

        <form onSubmit={handleSubmit}>
          <motion.div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 transition-all ${
              dragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-100'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            whileHover={{ scale: 1.02 }}
          >
            <p className="text-gray-600 mb-3 text-lg">📷 Drag & drop your crop image here</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="file-input"
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-green-600  text-white px-6 py-3 rounded-full hover:from-green-700 hover:to-lime-600 transition"
            >
              📁 Browse Image
            </label>
          </motion.div>

          {file && (
            <motion.div
              className="mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-sm text-gray-700 mb-2 font-medium">🖼️ Preview:</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected"
                className="w-full max-h-72 object-contain border rounded-lg"
              />
            </motion.div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-green-600 text-white py-3 rounded-full font-semibold hover:from-green-700 hover:to-lime-600 transition disabled:opacity-60"
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-3">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Predicting...</span>
              </div>
            ) : (
              "🧠 Predict Disease"
            )}
          </button>
        </form>

        <AnimatePresence>
          {prediction && (
            <motion.div
              className="mt-8 bg-green-50 border border-green-200 p-6 rounded-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="text-xl font-semibold text-green-700 mb-2">📊 Prediction Result</h3>
              <p className="text-gray-800 mb-1">
                <strong>Disease:</strong> {prediction.predicted_disease}
              </p>
              <p className="text-gray-800">
                <strong>Probability:</strong> {(prediction.probability * 100).toFixed(2)}%
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

export default DiseaseDetection;
