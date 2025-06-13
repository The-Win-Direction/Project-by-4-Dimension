import React, { useState } from 'react'
import { Info, Loader2 } from 'lucide-react'

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop: selectedCommodity,
          province: selectedProvince
        })
      })

      if (!response.ok) throw new Error('Failed to fetch predictions')

      const data = await response.json()
      setPrediction(data)
      console.log(response)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row bg-green-50 p-6 md:p-10 rounded-3xl shadow-2xl max-w-6xl mx-auto mt-10 space-y-6 md:space-y-0 md:space-x-10 border border-green-100">
      
      {/* Left Instructions */}
      <div className="md:w-1/2 space-y-5 text-green-900">
        <div className="flex items-center space-x-2">
          <Info className="text-green-600" />
          <h2 className="text-3xl font-extrabold">How It Works</h2>
        </div>
        <p className="text-base leading-relaxed">
          Select your <strong>Province</strong> and <strong>Commodity</strong> to predict market prices.
          Useful for <span className="text-emerald-700 font-semibold">farmers</span>, <span className="text-lime-700 font-semibold">traders</span>, and <span className="text-teal-700 font-semibold">buyers</span>.
        </p>
        <ul className="list-disc pl-5 space-y-2 text-sm text-green-800">
          <li>🌿 Choose your province</li>
          <li>🥬 Select a crop or commodity</li>
          <li>📈 Click to see the top profitable months</li>
        </ul>
      </div>

      {/* Right Form + Output */}
      <div className="md:w-1/2 space-y-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-3xl shadow-inner space-y-6 border border-green-200"
        >
          <h3 className="text-2xl font-semibold text-green-800 text-center mb-2">
            🌱 Predict Market Price
          </h3>

          <div>
            <label className="block text-sm font-medium mb-1 text-green-700">
              Select Province
            </label>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value)}
              required
              className="w-full border border-green-300 rounded-xl px-3 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
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
              className="w-full border border-green-300 rounded-xl px-3 py-2 bg-green-50 text-green-800 focus:ring-2 focus:ring-green-400"
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

        {/* Prediction Output */}
        {error && (
          <div className="text-red-600 font-medium text-center">{error}</div>
        )}

        {prediction && (
          <div className="bg-green-100 p-5 rounded-xl border border-green-300 shadow">
            <h4 className="text-lg font-semibold text-green-800 mb-3">
              📊 Top Predicted Months for {prediction.crop}
            </h4>
            <ul className="space-y-2">
              {prediction.top_months.map((monthData, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-white rounded-lg p-3 border border-green-200 shadow-sm"
                >
                  <span className="text-green-800 font-medium">
                    Month: {monthData.month}
                  </span>
                  <span className="text-emerald-700 font-bold">
                    Rs. {parseFloat(monthData.predicted_price).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default MarketPriceInput
