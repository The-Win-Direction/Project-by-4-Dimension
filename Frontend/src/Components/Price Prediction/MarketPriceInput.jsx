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

const content = {
  en: {
    title: "How to Use?",
    description:
      "This tool shows the most profitable months based on your selected province and crop. It's useful for farmers, traders, and buyers.",
    steps: [
      "📍 Select your province",
      "🌾 Select a crop or commodity",
      "📊 View the most profitable months"
    ]
  },
  np: {
    title: "कसरी प्रयोग गर्ने?",
    description:
      "यो टुलले तपाईंको प्रदेश र बाली अनुसार सबैभन्दा मुनाफा दिने महिना देखाउँछ। किसान, व्यापारी र खरिदकर्ताहरूका लागि उपयोगी छ।",
    steps: [
      "📍 आफ्नो प्रदेश छान्नुहोस्",
      "🌾 बाली वा वस्तु छान्नुहोस्",
      "📊 लाभदायक महिना हेर्नुहोस्"
    ]
  }
}

function MarketPriceInput() {
  const [selectedProvince, setSelectedProvince] = useState('')
  const [selectedCommodity, setSelectedCommodity] = useState('')
  const [prediction, setPrediction] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [language, setLanguage] = useState('en') 

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

  const t = content[language]

  return (
    <div className='bg-green-50 h-[100vh] w-100vh pb-12'>
    <div className=" max-w-6xl mx-auto px-4  py-20 space-y-14">
      {/* TOP: Info + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* LEFT: Info Section with Language Switcher */}
        <div className="text-neutral-800 space-y-6 border-b md:border-none pb-6 md:pb-0 relative">
          {/* Language Switcher */}
          <div className="absolute top-7 right-10">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border px-2 py-1 rounded bg-white text-gray-700 shadow-sm"
            >
              <option value="en">English</option>
              <option value="np">नेपाली</option>
            </select>
          </div>

          <div className="flex items-center space-x-3 mt-6">
            <Info className="text-green-600" size={26} />
            <h2 className="text-4xl font-bold">{t.title}</h2>
          </div>
          <p className="text-xl leading-relaxed text-gray-700">{t.description}</p>
          <ol className="space-y-2 text-lg list-decimal list-inside text-gray-800 font-medium">
            {t.steps.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>

        {/* RIGHT: Form Section */}
        <div className="space-y-6">
          <h3 className="text-3xl font-bold text-green-800 border-b pb-2">🌱 Market Price Prediction</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xl font-semibold mb-1 text-gray-700">Select Province</label>
              <select
                value={selectedProvince}
                onChange={(e) => setSelectedProvince(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 bg-transparent text-gray-800"
              >
                <option value="" disabled>Select a province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>{province}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xl font-semibold mb-1 text-gray-700">Select Commodity</label>
              <select
                value={selectedCommodity}
                onChange={(e) => setSelectedCommodity(e.target.value)}
                required
                className="w-full border-b-2 border-gray-300 focus:border-green-500 outline-none py-2 bg-transparent text-gray-800"
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
              className="bg-green-600 text-white px-6 py-2 rounded-md text-lg font-semibold hover:bg-green-700 transition"
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
              <div className="text-red-600 text-sm mt-2">{error}</div>
            )}
          </form>
        </div>
      </div>

      {/* BOTTOM: Prediction Results */}
      <AnimatePresence>
        {prediction && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <h4 className="text-xl font-bold text-green-700 mb-6">
              📈 Top Months for <span className="underline">{prediction.crop}</span>
            </h4>
            <div className="max-w-md mx-auto space-y-4">
              {prediction.top_months.map((monthData, index) => (
                <div key={index} className="flex justify-between border-b pb-2 text-gray-800 font-medium">
                  <span>📅 {monthData.month}</span>
                  <span>Rs. {parseFloat(monthData.predicted_price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </div>
  )
}

export default MarketPriceInput
