import React, { useState } from 'react'
import { Info, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const provinces = [
  'Province No. 1', 'Province No. 2', 'Province No. 3',
  'Province No. 4', 'Province No. 5', 'Province No. 6', 'Province No. 7'
]

const commodities = [
  'Apples', 'Bananas', 'Beans (black)', 'Cabbage', 'Carrots', 'Chickpeas',
  'Lentils (broken)', 'Oil (mustard)', 'Oil (soybean)', 'Oranges', 'Peanut',
  'Potatoes (red)', 'Pumpkin', 'Rice (coarse)', 'Rice (medium grain)',
  'Tomatoes', 'Wheat flour'
]

function MarketPriceInput() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCommodity, setSelectedCommodity] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setPrediction(null)
    setError(null)

    try {
      const response = await fetch('https://crop-price-prediction-hackfornepal-4.onrender.com/predict-top-months', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: selectedCommodity, province: selectedProvince })
      })

      if (!response.ok) throw new Error('Failed to fetch predictions')

      const data = await response.json()
      setPrediction(data)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className={`grid gap-10 ${prediction ? 'md:grid-cols-2' : 'md:grid-cols-3'} items-start`}>
        
        {/* Info Section */}
        <div className="bg-white p-6 rounded-3xl border border-green-100 shadow-lg space-y-4 md:col-span-1">
          <div className="flex items-center space-x-3 text-green-800">
            <Info className="text-green-600" />
            <h2 className="text-2xl font-bold">How It Works</h2>
          </div>
          <p className="text-green-700">
            Select your <strong>Province</strong> and <strong>Commodity</strong> to get insights into the most profitable months.
          </p>
          <ul className="list-disc pl-5 text-sm text-green-700 space-y-1">
            <li>🌍 Choose a Province</li>
            <li>🥕 Pick a Crop or Commodity</li>
            <li>📊 Predict Top Selling Months</li>
          </ul>
        </div>

        {/* Input Form */}
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-green-200 space-y-6 md:col-span-1">
          <h3 className="text-2xl font-bold text-green-800 text-center">
            🌱 Predict Market Price
          </h3>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-1 text-green-700">
                Select Province
              </label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                required
                className="w-full border border-green-300 rounded-xl px-4 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
              >
                <option value="" disabled>Select a province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 text-green-700">
                Select Commodity
              </label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                required
                className="w-full border border-green-300 rounded-xl px-4 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
              >
                <option value="" disabled>Select a commodity</option>
                {commodities.map((item) => (
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-xl py-2 text-lg font-semibold hover:from-green-700 hover:to-lime-600 transition duration-200 shadow-md hover:shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Predicting...
                </span>
              ) : (
                <>🔍 Predict Price</>
              )}
            </button>
          </form>

          {error && (
            <div className="text-red-600 font-medium text-center">{error}</div>
          )}
        </div>

        {/* Prediction Output */}
        <AnimatePresence>
          {prediction && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
              className="bg-green-100 p-6 rounded-3xl border border-green-300 shadow-md md:col-span-1"
            >
              <h4 className="text-xl font-semibold text-green-800 mb-4">
                📊 Top Predicted Months for {prediction.crop}
              </h4>
              <ul className="space-y-3">
                {prediction.top_months.map((monthData, index) => (
                  <li
                    key={index}
                    className="flex justify-between bg-white rounded-xl p-3 border border-green-200 shadow-sm"
                  >
                    <span className="text-green-800 font-medium">
                      📅 {monthData.month}
                    </span>
                    <span className="text-emerald-700 font-bold">
                      Rs. {parseFloat(monthData.predicted_price).toFixed(2)}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default MarketPriceInput
