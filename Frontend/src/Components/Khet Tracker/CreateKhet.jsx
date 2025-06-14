import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KhetCard from './KhetCard';
import { BACKEND_BASE_URL } from '../../config';
import { FaLeaf, FaRulerCombined, FaMapMarkedAlt, FaImage, FaSeedling, FaWater, FaGlobeAsia, FaUserShield } from 'react-icons/fa';

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
  const [previewUrl, setPreviewUrl] = useState(null);
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
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreviewUrl(URL.createObjectURL(file));
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
      alert('✅ Khet created successfully!');
      setFormData(prev => ({ ...prev, name: '', area: '', province: '', district: '', lat: '', lng: '', soilType: '', irrigationSource: '' }));
      setPhoto(null);
      setPreviewUrl(null);
      fetchKhets();
    } catch (error) {
      console.error(error);
      alert('❌ Failed to create khet');
    }
  };

  const fetchKhets = async () => {
    try {
      const res = await axios.get(`${BACKEND_BASE_URL}/api/khets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKhets(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchKhets();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-4 space-y-4">
      <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
        <FaSeedling className="text-green-500" /> Create New Khet
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-md p-4 px-8 grid grid-cols-1 md:grid-cols-2 gap-4" 
        encType="multipart/form-data"
      >
        <div className="flex flex-col gap-1">
          <label className="font-medium flex items-center gap-1"><FaLeaf /> Name</label>
          <input name="name" onChange={handleChange} value={formData.name} required placeholder="e.g., Main Field" className="input input-bordered" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium flex items-center gap-1"><FaRulerCombined /> Area</label>
          <input name="area" onChange={handleChange} value={formData.area} required placeholder="e.g., 2 bigha" className="input input-bordered" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium flex items-center gap-1"><FaGlobeAsia /> Province</label>
          <input name="province" onChange={handleChange} value={formData.province} required placeholder="e.g., Madhesh" className="input input-bordered" />
        </div>

        <div className="flex flex-col gap-1">
          <label className="font-medium flex items-center gap-1"><FaMapMarkedAlt /> District</label>
          <input name="district" onChange={handleChange} value={formData.district} required placeholder="e.g., Dhanusha" className="input input-bordered" />
        </div>

        <input name="lat" type="number" onChange={handleChange} value={formData.lat} required placeholder="Latitude" className="input input-bordered" />
        <input name="lng" type="number" onChange={handleChange} value={formData.lng} required placeholder="Longitude" className="input input-bordered" />
        <input name="soilType" onChange={handleChange} value={formData.soilType} placeholder="Siol type e.g., Sandy Loam" className="input input-bordered" />
        <input name="irrigationSource" onChange={handleChange} value={formData.irrigationSource} placeholder="Irrigation Type e.g., Tube Well" className="input input-bordered" />

        <div className="flex flex-col gap-1">
          <label className="font-medium flex items-center gap-1"><FaUserShield /> Ownership</label>
          <select name="ownership" onChange={handleChange} value={formData.ownership} className="input input-bordered">
            <option value="Owned">Owned</option>
            <option value="Leased">Leased</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
          <label className="font-medium flex items-center gap-1"><FaImage /> Upload Khet Image</label>
          <input type="file" onChange={handleFileChange} className="input input-bordered" />
          {previewUrl && <img src={previewUrl} alt="Preview" className="w-40 mt-2 rounded shadow" />}
        </div>

        <button
          type="submit"
          className="col-span-1 md:col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
        >
          ➕ Create Khet
        </button>
      </form>

      <hr className="border-gray-600 border-[1px]" />

      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaLeaf /> Your Khets
        </h2>
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
