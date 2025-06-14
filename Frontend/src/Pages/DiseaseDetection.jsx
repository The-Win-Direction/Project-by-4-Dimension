import Header from '../Components/Header';
import React, { useState } from 'react';
import axios from 'axios';

function DiseaseDetection() {
  const [dragging, setDragging] = useState(false);
  const [prediction, setPrediction] = useState("");
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
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(res.data);
    } catch (err) {
      console.error("Error uploading the file", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-green-700">🌿 Upload Crop Image for Disease Detection</h2>

        <form onSubmit={handleSubmit}>
          <div
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 transition ${
              dragging ? 'border-green-500 bg-green-50' : 'border-gray-300 bg-gray-100'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <p className="text-gray-600 mb-2">Drag & drop image here</p>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              id="file-input"
              className="hidden"
            />
            <label
              htmlFor="file-input"
              className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              📁 Browse Image
            </label>
          </div>

          {file && (
            <div className="mt-4">
              <p className="text-sm text-gray-700 mb-2">Selected Image:</p>
              <img
                src={URL.createObjectURL(file)}
                alt="Selected preview"
                className="w-full max-h-64 object-contain border rounded-lg"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-6 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? (
              <div className="flex justify-center items-center space-x-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                <span>Predicting...</span>
              </div>
            ) : (
              "Predict"
            )}
          </button>
        </form>

        {prediction && (
          <div className="mt-6 bg-green-50 border border-green-200 p-4 rounded">
            <h3 className="text-lg font-medium text-green-700">Prediction Result</h3>
            <p className="text-gray-800 mt-2">
              <strong>Disease:</strong> {prediction.predicted_disease}
            </p>
            <p className="text-gray-800">
              <strong>Probability:</strong> {prediction.probability.toFixed(2)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DiseaseDetection;
