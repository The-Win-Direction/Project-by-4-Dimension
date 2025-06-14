import React, { useState } from 'react';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../../config';

const LOG_OPTIONS = [
  { label: '🌾 Crop Logs', value: 'crop' },
  { label: '🌱 Soil Logs', value: 'soil' },
  { label: '💧 Irrigation Logs', value: 'irrigation' },
  { label: '🐛 Pest Logs', value: 'pest' },
  { label: '💰 Economic Logs', value: 'economic' },
  { label: '📝 Custom Logs', value: 'custom' },
];

const AnalyzeLogs = ({ khetId }) => {
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [useOverall, setUseOverall] = useState(false);
  const [limit, setLimit] = useState(10);
  const [query, setQuery] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnalysis('');
    setError('');

    try {
      const token = localStorage.getItem('token');
      const logTypesToAnalyze = useOverall ? ['overall'] : selectedLogs.map(log => log.value);

      if (logTypesToAnalyze.length === 0) {
        setError("Please select at least one log type or use 'Overall'.");
        setLoading(false);
        return;
      }

      const results = [];

      for (const type of logTypesToAnalyze) {
        const response = await axios.post(
          `${BACKEND_BASE_URL}/api/ai/analyze/${type}/${khetId}`,
          { limit: Number(limit), query: query.trim() || undefined },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        results.push({ type, analysis: response.data.analysis });
        console.log(response);
      }

      const formatted = results.map(res => `🔍 ${res.type.toUpperCase()}:\n${res.analysis}`).join('\n\n');
      setAnalysis(formatted);
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
<div className="w-full bg-green-50 py-6 px-4 sm:px-6 lg:px-10">
  <div className="max-w-7xl mx-auto bg-white  shadow-2xl p-6 sm:p-8 transition-all duration-300">
    <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-green-700 mb-4 tracking-tight">
      🌿 AI Log Analyzer
    </h2>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Log Selection */}
      <div>
        <label className="block text-lg font-bold text-gray-800 mb-2">Select Log Types</label>
        {!useOverall && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 ">
            {LOG_OPTIONS.map((log) => {
              const isSelected = selectedLogs.some((selected) => selected.value === log.value);
              return (
                <div
                  key={log.value}
                  onClick={() => {
                    if (isSelected) {
                      setSelectedLogs(selectedLogs.filter((item) => item.value !== log.value));
                    } else {
                      setSelectedLogs([...selectedLogs, log]);
                    }
                  }}
                  className={`cursor-pointer p-3 rounded-xl border-2  border-green-300 transition-all duration-200 ease-in-out hover:scale-[1.02] ${
                    isSelected
                      ? 'border-green-600 bg-green-100 shadow'
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-medium text-gray-900">{log.label}</span>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="accent-green-600 scale-110"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="mt-3 flex items-center gap-2">
          <input
            type="checkbox"
            id="overall"
            checked={useOverall}
            onChange={(e) => {
              setUseOverall(e.target.checked);
              setSelectedLogs([]);
            }}
            className="accent-green-600 scale-110"
          />
          <label htmlFor="overall" className="text-gray-800 font-medium text-sm">Use Overall Analysis Instead</label>
        </div>
      </div>

      {/* Log Limit */}
      <div>
        <label className="block text-lg font-bold text-gray-800 mb-1">Number of Latest Logs</label>
        <input
          type="number"
          min={1}
          max={10}
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 text-base"
        />
      </div>

      {/* Custom Question */}
      <div>
        <label className="block text-lg font-bold text-gray-800 mb-1">Custom Question (Optional)</label>
        <textarea
          rows={2}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-400 text-base"
          placeholder="e.g. How to improve irrigation efficiency?"
        />
      </div>

      {/* Submit Button */}
      <div className="text-center">
        <button
          type="submit"
          disabled={loading}
          className={`inline-flex items-center justify-center px-8 py-2.5 rounded-full text-white text-base font-semibold transition-all duration-300 ${
            loading
              ? 'bg-green-400 cursor-wait'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? (
            <>
              <svg className="animate-spin mr-2 h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              Analyzing...
            </>
          ) : (
            '🔍 Analyze Logs'
          )}
        </button>
      </div>
    </form>

    {/* Error */}
    {error && (
      <div className="mt-4 text-center text-red-600 text-sm font-semibold">{error}</div>
    )}

    {/* Analysis Output */}
    {analysis && (
      <div className="mt-6 bg-white border border-green-300 rounded-xl p-4 shadow-md">
        <h3 className="text-xl font-bold text-green-800 mb-2 text-center">📊 AI Insights</h3>
        <pre className="whitespace-pre-wrap text-gray-800 text-sm max-h-[250px] overflow-y-auto p-3 bg-gray-50 rounded border">
          {analysis}
        </pre>
      </div>
    )}
  </div>
</div>

  );
};

export default AnalyzeLogs;
