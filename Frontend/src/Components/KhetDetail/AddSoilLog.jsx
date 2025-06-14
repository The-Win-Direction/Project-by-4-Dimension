import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const AddSoilLog = ({ khetId }) => {
  const [formData, setFormData] = useState({
    soilTestReport: '',
    fertilizerUsed: '',
    compostUsed: '',
    organicPractices: '',
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
      await axios.post(`${BACKEND_BASE_URL}/api/khets/${khetId}/soil-log`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(true);
      setFormData({
        soilTestReport: '',
        fertilizerUsed: '',
        compostUsed: '',
        organicPractices: '',
      });
      setPhoto(null);
    } catch (err) {
      console.error(err);
      setError('Failed to submit soil log');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="text" name="soilTestReport" placeholder="Soil Test Report" value={formData.soilTestReport} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="text" name="fertilizerUsed" placeholder="Fertilizer Used" value={formData.fertilizerUsed} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="compostUsed" placeholder="Compost Used" value={formData.compostUsed} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="organicPractices" placeholder="Organic Practices" value={formData.organicPractices} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="block" />
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Soil Log'}
      </button>
      {success && <p className="text-green-600">Log submitted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddSoilLog;
