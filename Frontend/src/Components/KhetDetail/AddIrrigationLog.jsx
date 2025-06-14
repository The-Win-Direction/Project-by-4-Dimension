import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const AddIrrigationLog = ({ khetId }) => {
  const [formData, setFormData] = useState({
    waterSource: '',
    date: '',
    quantity: '',
    issues: '',
  });
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const token = localStorage.getItem('token');
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (photo) data.append('photo', photo);

    try {
      await axios.post(`${BACKEND_BASE_URL}/api/khets/${khetId}/irrigation-log`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setFormData({ waterSource: '', date: '', quantity: '', issues: '' });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit irrigation log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-6 border border-green-200"
    >
      <h3 className="text-xl font-bold text-green-700">💧 Add Irrigation Log</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Water Source</label>
          <input
            type="text"
            name="waterSource"
            placeholder="e.g., Canal, Groundwater"
            value={formData.waterSource}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Irrigation</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Quantity / Duration <span className="text-xs text-gray-500">(How long the irrigation was done, e.g., 2 hours)</span>
          </label>
          <input
            type="text"
            name="quantity"
            placeholder="e.g., 2 hours, 30 minutes"
            value={formData.quantity}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Issues (if any)</label>
          <input
            type="text"
            name="issues"
            placeholder="e.g., Leakage, Low flow"
            value={formData.issues}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Irrigation Photo</label>
        <label className="cursor-pointer inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded shadow">
          📷 Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="hidden"
          />
        </label>
        {photo && (
          <p className="mt-1 text-sm text-green-700">
            Selected: <strong>{photo.name}</strong>
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
      >
        {loading ? 'Submitting...' : 'Submit Irrigation Log'}
      </button>

      {success && (
        <p className="text-green-600 mt-2 font-medium">✅ Irrigation log submitted successfully!</p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default AddIrrigationLog;
