import React, { useState } from 'react';

const categories = [
  'Crop Tracking',
  'Soil Fertility',
  'Irrigation',
  'Pests & Diseases',
  'Economics / Expenses',
  'Custom Notes',
];

export default function KhetInputForm() {
  const [form, setForm] = useState({
    name: '',
    area: '',
    areaUnit: 'bigha',
    location: '',
    soilType: '',
    irrigationSource: '',
    ownership: '',
    photo: null,
    enabledCategories: [],
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFile = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleCategoryToggle = (category) => {
    setForm((prev) => {
      const enabled = prev.enabledCategories.includes(category)
        ? prev.enabledCategories.filter((c) => c !== category)
        : [...prev.enabledCategories, category];
      return { ...prev, enabledCategories: enabled };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitting khet data:', form);
    // Add API logic here
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">🌾 Add New Khet</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-white p-4 shadow rounded-lg grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold">Khet Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleInput}
              placeholder="e.g. North Field"
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Area</label>
            <div className="flex gap-2">
              <input
                type="number"
                name="area"
                value={form.area}
                onChange={handleInput}
                placeholder="e.g. 2.5"
                className="w-full border p-2 rounded"
              />
              <select
                name="areaUnit"
                value={form.areaUnit}
                onChange={handleInput}
                className="border p-2 rounded"
              >
                <option value="bigha">Bigha</option>
                <option value="hectare">Hectare</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block font-semibold">Location (Province/District)</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleInput}
              placeholder="e.g. Province 1, Morang"
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Soil Type</label>
            <input
              type="text"
              name="soilType"
              value={form.soilType}
              onChange={handleInput}
              placeholder="e.g. Clay, Loam"
              className="w-full border p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Irrigation Source</label>
            <select
              name="irrigationSource"
              value={form.irrigationSource}
              onChange={handleInput}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Canal">Canal</option>
              <option value="Tube Well">Tube Well</option>
              <option value="Rainfed">Rainfed</option>
              <option value="Drip">Drip</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Ownership</label>
            <select
              name="ownership"
              value={form.ownership}
              onChange={handleInput}
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              <option value="Owned">Owned</option>
              <option value="Leased">Leased</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold">Khet Photo</label>
            <input
              type="file"
              name="photo"
              onChange={handleFile}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        {/* Category Tracking */}
        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-xl font-semibold mb-2">📊 What would you like to track?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {categories.map((cat) => (
              <label key={cat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.enabledCategories.includes(cat)}
                  onChange={() => handleCategoryToggle(cat)}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold"
        >
          Save Khet
        </button>
      </form>
    </div>
  );
}
