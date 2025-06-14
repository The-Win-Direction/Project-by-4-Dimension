import React from 'react';

const KhetCard = ({ khet }) => {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-green-700">{khet.name}</h3>
      <p className="text-sm text-gray-600">{khet.area}, {khet.district}</p>
      <p className="text-xs text-gray-500">Province: {khet.province}</p>
      {khet.photo && (
        <img src={khet.photo} alt="Khet" className="rounded w-full h-32 object-cover" />
      )}
    </div>
  );
};

export default KhetCard;
