import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCropLog from './AddCropLog';
import AddSoilLog from './AddSoilLog';
import AddIrrigationLog from './AddIrrigationLog';
import AddPestLog from './AddPestLog';
import AddEconomicLog from './AddEconomicLog';
import AddCustomLog from './AddCustomLog';

const logOptions = [
  {
    key: 'crop-log',
    title: '🌱 Crop Log',
    description: 'Record crop type, variety, dates, and observations.',
    Component: AddCropLog,
  },
  {
    key: 'soil-log',
    title: '🧪 Soil Log',
    description: 'Track soil test, fertilizers, compost, and practices.',
    Component: AddSoilLog,
  },
  {
    key: 'irrigation-log',
    title: '💧 Irrigation Log',
    description: 'Log irrigation details including water source and quantity.',
    Component: AddIrrigationLog,
  },
  {
    key: 'pest-log',
    title: '🐛 Pest Log',
    description: 'Report pest issues, actions taken, and results.',
    Component: AddPestLog,
  },
  {
    key: 'economic-log',
    title: '💰 Economic Log',
    description: 'Track costs, yields, sale price, and profitability.',
    Component: AddEconomicLog,
  },
  {
    key: 'custom-log',
    title: '📝 Custom Log',
    description: 'Add general notes or observations about your field.',
    Component: AddCustomLog,
  },
];

const LogOptions = () => {
  const { khetId } = useParams();
  const [openLog, setOpenLog] = useState(null);

  const toggleLogForm = (key) => {
    setOpenLog((prev) => (prev === key ? null : key));
  };

  return (
    <div className="mt-8 p-12 px-16">
      <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Details to this Khet</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logOptions.map((log) => (
          <div
            key={log.key}
            className="bg-white border border-gray-200 rounded-xl shadow-md p-5"
          >
            <div>
              <h4 className="text-lg font-semibold text-green-700 mb-1">{log.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{log.description}</p>
              <button
                onClick={() => toggleLogForm(log.key)}
                className="bg-green-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                {openLog === log.key ? 'Close Form' : 'Fill Log'}
              </button>
            </div>
            {openLog === log.key && (
              <div className="mt-4">
                <log.Component khetId={khetId} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LogOptions;
