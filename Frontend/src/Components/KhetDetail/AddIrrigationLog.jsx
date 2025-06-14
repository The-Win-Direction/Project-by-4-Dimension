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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="text" name="waterSource" placeholder="Water Source" value={formData.waterSource} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="date" name="date" placeholder="Date" value={formData.date} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="text" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="issues" placeholder="Issues (if any)" value={formData.issues} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="block" />
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Irrigation Log'}
      </button>
      {success && <p className="text-green-600">Log submitted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddIrrigationLog;
