import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const AddCustomLog = ({ khetId }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
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
      await axios.post(`${BACKEND_BASE_URL}/api/khets/${khetId}/custom-log`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setFormData({ title: '', description: '' });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit custom log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8 bg-white p-6 rounded-xl shadow max-w-3xl mx-auto space-y-6 border border-green-200"
    >
      <h3 className="text-xl font-bold text-green-700">📝 Add Custom Field Log</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Log Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Irrigation Pipe Installation"
            value={formData.title}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Add custom notes, observations, or events"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            required
            className="border p-2 rounded w-full"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photo (optional)</label>
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
          {loading ? 'Submitting...' : 'Submit Custom Log'}
        </button>

        {success && (
          <p className="text-green-600 mt-2 font-medium">✅ Custom log submitted successfully!</p>
        )}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </form>
  );
};

export default AddCustomLog;
