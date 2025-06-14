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
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-10">
      {/* TOP: LEFT (INFO) + RIGHT (FORM) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Left Section: Info */}
        <div className="bg-gradient-to-br from-green-50 to-white border border-green-200 rounded-3xl p-8 shadow-md space-y-5 text-green-800">
          <div className="flex items-center space-x-3">
            <Info className="text-green-600" size={28} />
            <h2 className="text-3xl font-extrabold">कसरी प्रयोग गर्ने?</h2>
          </div>
          <p className="text-lg leading-relaxed">
            यस टुलले तपाईंलाई <span className="font-semibold text-emerald-700">प्रदेश</span> र <span className="font-semibold text-lime-700">बाली</span> अनुसार
            सबैभन्दा बढी मुनाफा हुने महिना बताउँछ। किसान, व्यापारी र खरिदकर्ताहरूका लागि उपयोगी छ।
          </p>
          <ul className="list-disc list-inside space-y-2 text-green-700">
            <li>📍 आफ्नो प्रदेश छान्नुहोस्</li>
            <li>🌽 बाली वा वस्तु छान्नुहोस्</li>
            <li>📊 सबभन्दा लाभदायक महिना हेर्नुहोस्</li>
          </ul>
        </div>

        {/* Right Section: Form */}
        <div className="bg-white border border-green-200 rounded-3xl p-8 shadow-md space-y-6">
          <h3 className="text-2xl font-bold text-center text-green-800">🌱 Market Price Prediction</h3>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Select Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                required
                className="w-full rounded-xl border border-green-300 px-4 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
              >
                <option value="" disabled>Select a province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-green-700 mb-1">Select Commodity</label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                required
                className="w-full rounded-xl border border-green-300 px-4 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
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
              className="w-full bg-gradient-to-r from-green-600 to-lime-500 text-white rounded-xl py-2 text-lg font-semibold hover:from-green-700 hover:to-lime-600 transition duration-200 shadow-md"
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

            {error && (
              <div className="text-red-600 text-center font-medium mt-2">{error}</div>
            )}
          </form>
        </div>
      </div>

      {/* Bottom Section: Prediction Output */}
      <AnimatePresence>
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl bg-green-50 border border-green-300 rounded-3xl p-8 shadow-lg"
          >
            <h4 className="text-xl font-bold text-green-800 mb-4 text-center">
              📈 Top Months for <span className="text-emerald-700">{prediction.crop}</span>
            </h4>
            <ul className="space-y-3">
              {prediction.top_months.map((monthData, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center bg-white rounded-xl px-4 py-3 border border-green-200 shadow-sm"
                >
                  <span className="text-green-800 font-medium">
                    📅 {monthData.month}
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    Rs. {parseFloat(monthData.predicted_price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default MarketPriceInput
