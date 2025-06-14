import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../config';

const KhetInfo = () => {
  const { khetId } = useParams();
  const [khet, setKhet] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchKhet = async () => {
      try {
        const res = await axios.get(`${BACKEND_BASE_URL}/api/khets/${khetId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // If it's returned as an array (e.g., [ {...} ])
        const khetData = Array.isArray(res.data) ? res.data[0] : res.data.khet || res.data;
        setKhet(khetData);
        console.log(res);
      } catch (error) {
        console.error('Failed to fetch khet info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKhet();
  }, [khetId, token]);

  if (loading) return <p className="text-center mt-10">Loading Khet Info...</p>;
  if (!khet) return <p className="text-center text-red-500 mt-10">Khet not found.</p>;

  return (
    <div className="bg-white shadow rounded-xl p-6 mb-6 space-y-2 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-green-700">🌾 {khet.name}</h2>
      <p><strong>📍 Location:</strong> {khet.location?.district || 'N/A'}, Province {khet.location?.province || 'N/A'}</p>
      <p><strong>📐 Area:</strong> {khet.area}</p>
      <p><strong>🌱 Soil Type:</strong> {khet.soilType || 'N/A'}</p>
      <p><strong>🚰 Irrigation Source:</strong> {khet.irrigationSource || 'N/A'}</p>
      <p><strong>🔑 Ownership:</strong> {khet.ownership}</p>
      <p><strong>📌 Coordinates:</strong> {khet.location?.gps?.lat}, {khet.location?.gps?.lng}</p>
      {khet.photo && (
        <img
          src={khet.photo}
          alt="Khet"
          className="w-full h-60 object-cover rounded mt-4"
        />
      )}
    </div>
  );
};

export default KhetInfo;
