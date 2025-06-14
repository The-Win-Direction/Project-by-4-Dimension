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
    <div className="p-6 md:p-8 lg:p-10">
      <h2 className="text-2xl font-bold text-green-800 mb-8 text-center">
        🐛 Pest Observation Logs
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">Loading logs...</p>
      ) : logs.length === 0 ? (
        <p className="text-center text-gray-600">No pest logs available yet.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-gradient-to-br from-green-100 via-green-200 to-green-300 border border-green-200 shadow-sm rounded-xl overflow-hidden transform hover:scale-[1.02] hover:shadow-green-300 transition-all duration-300"
            >
              {log.photo && (
                <div className="overflow-hidden">
                  <img
                    src={log.photo}
                    alt="Pest log"
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-4 space-y-1.5">
                <p className="text-base font-semibold text-green-900">
                  🐞 Problem: <span className="text-gray-800">{log.problem}</span>
                </p>
                <p className="text-sm text-gray-800">
                  🗓️ Observed On:{" "}
                  <span className="text-gray-700">
                    {new Date(log.dateObserved).toLocaleDateString()}
                  </span>
                </p>
                <p className="text-sm text-gray-800">
                  🛠️ Action Taken: <span className="text-gray-700">{log.actionTaken || 'N/A'}</span>
                </p>
                <p className="text-sm text-gray-800">
                  ✅ Result: <span className="text-gray-700">{log.result || 'N/A'}</span>
                </p>
                <p className="text-[10px] text-gray-500 italic pt-2">
                  Submitted: {new Date(log.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pages > 1 && (
        <div className="flex justify-center mt-10 flex-wrap gap-2">
          {Array.from({ length: pages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-200 ${
                page === i + 1
                  ? 'bg-green-600 text-white border-green-600 shadow-sm'
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

export default PestLogViewer;
