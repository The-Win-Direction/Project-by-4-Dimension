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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="text" name="title" placeholder="Log Title" value={formData.title} onChange={handleChange} className="border p-2 rounded w-full" required />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 rounded w-full" rows="3" required></textarea>
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="block" />
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Custom Log'}
      </button>
      {success && <p className="text-green-600">Log submitted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddCustomLog;
