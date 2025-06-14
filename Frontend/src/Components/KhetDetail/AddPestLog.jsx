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
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <input type="text" name="problem" placeholder="Pest Problem" value={formData.problem} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="date" name="dateObserved" value={formData.dateObserved} onChange={handleChange} className="border p-2 rounded w-full" required />
      <input type="text" name="actionTaken" placeholder="Action Taken" value={formData.actionTaken} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="text" name="result" placeholder="Result" value={formData.result} onChange={handleChange} className="border p-2 rounded w-full" />
      <input type="file" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} className="block" />
      <button type="submit" disabled={loading} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
        {loading ? 'Submitting...' : 'Submit Pest Log'}
      </button>
      {success && <p className="text-green-600">Log submitted successfully!</p>}
      {error && <p className="text-red-600">{error}</p>}
    </form>
  );
};

export default AddPestLog;
