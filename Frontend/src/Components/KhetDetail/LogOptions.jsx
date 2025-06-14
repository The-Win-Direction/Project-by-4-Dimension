import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddCropLog from './AddCropLog';
import AddSoilLog from './AddSoilLog';
import AddIrrigationLog from './AddIrrigationLog';
import AddPestLog from './AddPestLog';
import AddEconomicLog from './AddEconomicLog';
import AddCustomLog from './AddCustomLog';
import { motion, AnimatePresence } from 'framer-motion';

const logOptions = [
  {
    key: 'crop-log',
    title: 'Crop Log',
    icon: '🌱',
    description: 'Record crop type, variety, dates, and observations.',
    Component: AddCropLog,
  },
  {
    key: 'soil-log',
    title: 'Soil Log',
    icon: '🧪',
    description: 'Track soil test, fertilizers, compost, and practices.',
    Component: AddSoilLog,
  },
  {
    key: 'irrigation-log',
    title: 'Irrigation Log',
    icon: '💧',
    description: 'Log irrigation details including water source and quantity.',
    Component: AddIrrigationLog,
  },
  {
    key: 'pest-log',
    title: 'Pest Log',
    icon: '🐛',
    description: 'Report pest issues, actions taken, and results.',
    Component: AddPestLog,
  },
  {
    key: 'economic-log',
    title: 'Economic Log',
    icon: '💰',
    description: 'Track costs, yields, sale price, and profitability.',
    Component: AddEconomicLog,
  },
  {
    key: 'custom-log',
    title: 'Custom Log',
    icon: '📝',
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
    <div className="mt-10 px-4 md:px-16">
      <h3 className="text-3xl font-bold text-green-800 mb-8">
        📋 Add Details to This Khet
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {logOptions.map(({ key, title, description, icon, Component }) => (
          <motion.div
            key={key}
            whileHover={{ scale: 1.02 }}
            className="bg-white border border-green-100 shadow-md rounded-2xl p-6 transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{icon}</span>
              <h4 className="text-lg font-semibold text-green-800">{title}</h4>
            </div>

            <p className="text-sm text-gray-600 mb-4">{description}</p>

            <button
              onClick={() => toggleLogForm(key)}
              className={`${
                openLog === key
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-green-600 hover:bg-green-700'
              } text-white text-sm px-4 py-2 w-[10rem]  rounded-xl font-medium transition-all`}
            >
              {openLog === key ? 'Close Form' : 'Fill Log'}
            </button>

            <AnimatePresence>
              {openLog === key && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-5 pt-4 border-t border-gray-200"
                >
                  <Component khetId={khetId} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LogOptions;
