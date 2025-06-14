import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const AddPestLog = ({ khetId }) => {
  const [formData, setFormData] = useState({
    problem: '',
    dateObserved: '',
    actionTaken: '',
    result: '',
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
      await axios.post(`${BACKEND_BASE_URL}/api/khets/${khetId}/pest-log`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setFormData({ problem: '', dateObserved: '', actionTaken: '', result: '' });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit pest log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-6 border border-green-200"
    >
      <h3 className="text-xl font-bold text-green-700">🐛 Add Pest/Disease Log</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Problem Observed</label>
          <input
            type="text"
            name="problem"
            placeholder="e.g., Aphids on leaves, Yellowing"
            value={formData.problem}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Observed
            <span className="text-xs text-gray-500 block">When was the pest/disease seen?</span>
          </label>
          <input
            type="date"
            name="dateObserved"
            value={formData.dateObserved}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Action Taken</label>
          <input
            type="text"
            name="actionTaken"
            placeholder="e.g., Used neem spray"
            value={formData.actionTaken}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Result</label>
          <input
            type="text"
            name="result"
            placeholder="e.g., Pest reduced, Still spreading"
            value={formData.result}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo</label>
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
        {loading ? 'Submitting...' : 'Submit Pest Log'}
      </button>

      {success && (
        <p className="text-green-600 mt-2 font-medium">✅ Pest log submitted successfully!</p>
      )}
      {error && <p className="text-red-600 mt-2">{error}</p>}
    </form>
  );
};

export default AddPestLog;
