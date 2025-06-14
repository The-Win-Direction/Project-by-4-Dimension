import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const PestLogViewer = () => {
  const { khetId } = useParams();
  const [logs, setLogs] = useState([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  const fetchLogs = async (pageNumber = 1) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BACKEND_BASE_URL}/api/khets/${khetId}/pest-logs?page=${pageNumber}&limit=6`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLogs(res.data.logs);
      setPages(res.data.pages);
    } catch (err) {
      console.error('Failed to fetch pest logs', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs(page);
  }, [page]);

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-6 text-green-700">🐛 Pest Logs</h2>

      {loading ? (
        <p>Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-gray-600">No pest logs available yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logs.map((log) => (
            <div key={log._id} className="border rounded-lg shadow p-4 bg-white">
              <p className="font-semibold text-gray-800">Pest Observed: <span className="text-gray-600">{log.pestObserved}</span></p>
              <p className="text-sm text-gray-700">Severity: {log.severity}</p>
              <p className="text-sm text-gray-700">Action Taken: {log.actionTaken}</p>
              {log.imageUrl && (
                <img
                  src={log.imageUrl}
                  alt="Pest log"
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

export default PestLogViewer;
