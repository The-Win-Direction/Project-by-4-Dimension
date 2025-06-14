// src/Pages/KhetDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import KhetInfo from '../Components/KhetTracker/KhetInfo';
import { BACKEND_BASE_URL } from '../config';

const KhetDetail = () => {
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
        setKhet(res.data.khet);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching khet:', err);
        setLoading(false);
      }
    };

    fetchKhet();
  }, [khetId]);

  if (loading) return <p className="text-center mt-10">Loading Khet Info...</p>;
  if (!khet) return <p className="text-center mt-10 text-red-500">Failed to load Khet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <KhetInfo khet={khet} />
      {/* Additional log buttons/components will go below later */}
    </div>
  );
};

export default KhetDetail;
