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

  if (loading) return <p className="text-center mt-10 text-gray-500 animate-pulse">Loading Khet Info...</p>;
  if (!khet) return <p className="text-center text-red-500 mt-10">Khet not found.</p>;

  return (
    <div className="max-w-7xl mx-auto p-6 mt-8 bg-gradient-to-br from-white to-green-50 border border-green-100 shadow-xl rounded-xl transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Image */}
        {khet?.photo ? (
          <img
            src={khet.photo}
            alt="Khet"
            className="w-full max-w-xs h-48 object-cover rounded-2xl border-2 border-green-200 shadow-md"
          />
        ) : (
          <div className="w-full max-w-xs h-48 bg-gray-100 flex items-center justify-center rounded-2xl text-gray-400 border">
            No Image
          </div>
        )}

        {/* Details */}
        <div className="flex-1 space-y-4">
          <h2 className="text-4xl font-bold text-green-700 flex items-center gap-2">
            🌾 {khet?.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-gray-800 text-lg leading-relaxed">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-green-500 text-2xl mt-1" />
              <span><strong className='text-xl'>Location:</strong> {khet?.location?.district || 'N/A'}, Province {khet?.location?.province || 'N/A'}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaRulerCombined className="text-green-500 text-xl mt-1" />
              <span><strong className='text-xl'>Area:</strong> {khet?.area || 'N/A'}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaLeaf className="text-green-500 text-xl mt-1" />
              <span><strong className='text-xl'>Soil Type:</strong> {khet?.soilType || 'N/A'}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaTint className="text-green-500 text-xl mt-1" />
              <span><strong className='text-xl'>Irrigation:</strong> {khet?.irrigationSource || 'N/A'}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaKey className="text-green-500 text-xl mt-1" />
              <span><strong className='text-xl'>Ownership:</strong> {khet?.ownership || 'N/A'}</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapPin className="text-green-500 text-xl mt-1" />
              <span><strong className='text-xl'>Coordinates:</strong> {khet?.location?.gps?.lat || '-'}, {khet?.location?.gps?.lng || '-'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KhetInfo;
