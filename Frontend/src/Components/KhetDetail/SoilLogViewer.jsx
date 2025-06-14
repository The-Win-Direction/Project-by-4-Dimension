import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const SoilLogViewer = () => {
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
        `${BACKEND_BASE_URL}/api/khets/${khetId}/soil-logs?page=${pageNumber}&limit=6`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setLogs(response.data.logs);
      setPages(response.data.pages);
    } catch (error) {
      console.error('Failed to fetch soil logs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6 text-green-700">🧪 Soil Logs</h2>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-600">No logs available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => (
            <div
              key={log._id}
              className="border rounded-lg shadow p-4 bg-white"
            >
              <p className="font-semibold text-gray-800">
                Soil Test: <span className="text-gray-600">{log.soilTestReport}</span>
              </p>
              <p className="text-sm text-gray-700">Fertilizer: {log.fertilizerUsed}</p>
              <p className="text-sm text-gray-700">Compost: {log.compostUsed}</p>
              <p className="text-sm text-gray-700">Organic: {log.organicPractices}</p>
              {log.imageUrl && (
                <img
                  src={log.imageUrl}
                  alt="Soil log"
                  className="mt-3 rounded-md w-full h-40 object-cover"
                />
              )}
              <p className="text-xs text-gray-500 mt-2">
                Date: {new Date(log.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                page === i + 1
                  ? 'bg-green-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
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

export default SoilLogViewer;
