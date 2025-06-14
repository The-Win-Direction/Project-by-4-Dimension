import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const CropLogViewer = () => {
  const { khetId } = useParams();
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchLogs = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/api/khets/${khetId}/crop-logs?page=${pageNumber}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogs(response.data.logs);
      setPages(response.data.pages);
      console.log(response);
    } catch (error) {
      console.error('Failed to fetch crop logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  return (
    <div className="p-6 md:p-8 lg:p-10">
      <h2 className="text-3xl font-bold text-green-800 mb-10 text-center">
        🌱 Crop History Logs
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-gray-600">No crop logs available yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {logs.map((log) => (
  <div
    key={log._id}
    className="bg-green-300 border border-green-200 shadow-md rounded-2xl overflow-hidden transform hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
  >
    {log.photo && (
      <div className="overflow-hidden">
        <img
          src={log.photo}
          alt="Crop log"
          className="w-full h-28 object-cover hover:scale-110 transition-transform duration-500"
        />
      </div>
    )}
    <div className="p-5 space-y-3">
      <h3 className="text-lg font-semibold text-green-800">
        🌾 Crop: <span className="text-gray-800">{log.cropName}</span>
      </h3>
      <p className="text-sm text-gray-800">
        🌱 Variety: <span className="text-gray-700">{log.variety || 'N/A'}</span>
      </p>
      <p className="text-sm text-gray-800">
        📆 Sowing Date: <span className="text-gray-700">{log.sowingDate ? new Date(log.sowingDate).toLocaleDateString() : 'N/A'}</span>
      </p>
      <p className="text-sm text-gray-800">
        🌾 Harvest Date: <span className="text-gray-700">{log.harvestDate ? new Date(log.harvestDate).toLocaleDateString() : 'N/A'}</span>
      </p>
      <p className="text-gray-700 text-sm">
        📝 <span className="font-semibold text-gray-600">Observations:</span> {log.observations || 'No observations provided.'}
      </p>
      <p className="text-xs text-gray-500">
        📅 Created At: {new Date(log.createdAt).toLocaleDateString()}
      </p>
    </div>
  </div>
))}

        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-12 flex-wrap gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                page === i + 1
                  ? 'bg-green-600 text-white border-green-600 shadow-md'
                  : 'bg-white text-green-700 border-green-300 hover:bg-green-100 hover:shadow-sm'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropLogViewer;
