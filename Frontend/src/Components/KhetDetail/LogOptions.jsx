import React from 'react';
import { Link, useParams } from 'react-router-dom';

const logOptions = [
  {
    title: '🌱 Crop Log',
    description: 'Record crop type, variety, dates, and observations.',
    link: 'crop-log',
  },
  {
    title: '🧪 Soil Log',
    description: 'Track soil test, fertilizers, compost, and practices.',
    link: 'soil-log',
  },
  {
    title: '💧 Irrigation Log',
    description: 'Log irrigation details including water source and quantity.',
    link: 'irrigation-log',
  },
  {
    title: '🐛 Pest Log',
    description: 'Report pest issues, actions taken, and results.',
    link: 'pest-log',
  },
  {
    title: '💰 Economic Log',
    description: 'Track costs, yields, sale price, and profitability.',
    link: 'economic-log',
  },
  {
    title: '📝 Custom Log',
    description: 'Add general notes or observations about your field.',
    link: 'custom-log',
  },
];

const LogOptions = () => {
  const { khetId } = useParams();

  return (
    <div className="mt-8 p-12 px-16">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Details to this Khet</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logOptions.map((log, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-5 flex flex-col justify-between"
          >
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-1">{log.title}</h4>
              <p className="text-sm text-gray-600">{log.description}</p>
            </div>
            <Link
              to={`/khet/${khetId}/add/${log.link}`}
              className="mt-4 inline-block bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Fill Log
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogOptions;
