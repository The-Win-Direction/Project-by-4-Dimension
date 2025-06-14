import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KhetCard from './KhetCard';
import { BACKEND_BASE_URL } from '../../config';


const CreateKhet = () => {
  const [formData, setFormData] = useState({
    name: '',
    area: '',
    province: '',
    district: '',
    lat: '',
    lng: '',
    soilType: '',
    irrigationSource: '',
    ownership: 'Owned',
    crop: true,
    soil: true,
    irrigation: true,
    pest: true,
    economic: true,
    custom: true,
  });
  const [photo, setPhoto] = useState(null);
  const [khets, setKhets] = useState([]);

  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value);
    });
    if (photo) data.append('photo', photo);

    try {
      await axios.post(`${BACKEND_BASE_URL}/api/khets/create`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Khet created successfully!');
      fetchKhets(); // Refresh list
    } catch (error) {
      console.error(error);
      alert('Failed to create khet');
    }
  };

  const fetchKhets = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/khets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKhets(res.data.khets || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKhets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-10">
      <h1 className="text-3xl font-bold text-green-700">🌾 Create New Khet</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow p-6 grid grid-cols-1 md:grid-cols-2 gap-6"
        encType="multipart/form-data"
      >
        <input name="name" onChange={handleChange} value={formData.name} required placeholder="Khet Name" className="input" />
        <input name="area" onChange={handleChange} value={formData.area} required placeholder="Area (e.g., 2 bigha)" className="input" />
        <input name="province" onChange={handleChange} value={formData.province} required placeholder="Province" className="input" />
        <input name="district" onChange={handleChange} value={formData.district} required placeholder="District" className="input" />
        <input name="lat" type="number" onChange={handleChange} value={formData.lat} required placeholder="Latitude" className="input" />
        <input name="lng" type="number" onChange={handleChange} value={formData.lng} required placeholder="Longitude" className="input" />
        <input name="soilType" onChange={handleChange} value={formData.soilType} placeholder="Soil Type" className="input" />
        <input name="irrigationSource" onChange={handleChange} value={formData.irrigationSource} placeholder="Irrigation Source" className="input" />
        <select name="ownership" onChange={handleChange} value={formData.ownership} className="input">
          <option value="Owned">Owned</option>
          <option value="Leased">Leased</option>
        </select>
        <input type="file" onChange={handleFileChange} className="input" />


        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Create Khet
        </button>
      </form>

      <hr />

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">🧺 Your Khets</h2>
        {khets.length === 0 ? (
          <p className="text-gray-500">No khets found.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {khets.map((khet) => (
              <KhetCard key={khet._id} khet={khet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateKhet;
