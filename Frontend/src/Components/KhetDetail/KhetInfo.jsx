import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';
import {
  FaMapMarkerAlt, FaRulerCombined, FaTint,
  FaLeaf, FaKey, FaMapPin
} from 'react-icons/fa';

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

        const khetData = Array.isArray(res.data) ? res.data[0] : res.data.khet || res.data;
        setKhet(khetData);
      } catch (error) {
        console.error('Failed to fetch khet info:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchKhet();
  }, [khetId, token]);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading Khet Info...</p>;
  if (!khet) return <p className="text-center text-red-500 mt-10">Khet not found.</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white border border-gray-200 shadow-lg rounded-2xl mt-6">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        {/* Image */}
        {khet?.photo && (
          <img
            src={khet.photo}
            alt="Khet"
            className="w-60 h-40 object-cover rounded-xl border shadow"
          />
        )}

        {/* Details */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🌾 {khet?.name}</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-gray-800 text-[16px]">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-600" />
              <span><strong>Location:</strong> {khet?.location?.district || 'N/A'}, Province {khet?.location?.province || 'N/A'}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaRulerCombined className="text-green-600" />
              <span><strong>Area:</strong> {khet?.area || 'N/A'}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaLeaf className="text-green-600" />
              <span><strong>Soil Type:</strong> {khet?.soilType || 'N/A'}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaTint className="text-green-600" />
              <span><strong>Irrigation:</strong> {khet?.irrigationSource || 'N/A'}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaKey className="text-green-600" />
              <span><strong>Ownership:</strong> {khet?.ownership || 'N/A'}</span>
            </p>

            <p className="flex items-center gap-2">
              <FaMapPin className="text-green-600" />
              <span>
                <strong>Coordinates:</strong> {khet?.location?.gps?.lat || '-'}, {khet?.location?.gps?.lng || '-'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhetInfo;
