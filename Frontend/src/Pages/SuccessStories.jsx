import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';


const stories = [
  {
    name: 'Ramesh Thapa',
    location: 'Province 3',
    crop: 'Maize & Tomato Farmer',
    highlights: [
      '✅ Switched to high-demand crops',
      '✅ Used weather and market insights',
      '✅ Reduced waste and improved timing',
    ],
    quote:
      '“FarmFuse जस्तो साथी भए पछि, अब डर छैन, भर छ।”',
    story:
      'Before FarmFuse, I followed old planting patterns without knowing the market. Now I use FarmFuse\'s AI to decide what to plant and when. My income increased by 40% in just one season.',
  },
  {
    name: 'Sunita Karki',
    location: 'Province 1',
    crop: 'Organic Vegetable Farmer',
    highlights: [
      '✅ 60% lower cost on chemical inputs',
      '✅ Boosted income from organic buyers',
      '✅ Learned from the Knowledge Hub daily',
    ],
    quote: '“अब मलाई लाग्छ, साँचो खेती भनेकै जानकारीसहितको खेती हो।”',
    story:
      'FarmFuse helped me learn how to control pests naturally and understand when to sell for the best price. I now plan my farm around data, not guesswork.',
  },
  {
    name: 'Hari Bahadur',
    location: 'Province 5',
    crop: 'Small Landholder',
    highlights: [
      '✅ Chose crops with better ROI',
      '✅ Avoided off-season planting losses',
      '✅ Used simple tips from the platform every week',
    ],
    quote: '“FarmFuse मेरो खेतको साथी मात्रै होइन, आम्दानी बढाउने उपाय पनि हो।”',
    story:
      'FarmFuse’s AI crop suggestions helped me choose crops that fit my land and the season. I avoided losses during unexpected weather changes thanks to timely alerts and farming tips.',
  },
];

const StoryCard = ({ name, location, crop, story, highlights, quote }) => (
  <motion.div
    whileHover={{ scale: 1.01 }}
    className="bg-white shadow-md rounded-xl p-6 space-y-4 border border-green-100"
  >
    <h3 className="text-xl font-semibold text-green-800">{name} – <span className="text-gray-600">{crop}</span></h3>
    <p className="text-sm text-gray-500">📍 {location}</p>
    <p className="text-gray-700 italic">"{story}"</p>
    <ul className="text-sm text-green-700 space-y-1">
      {highlights.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
    <p className="text-green-900 font-medium text-sm mt-3">{quote}</p>
  </motion.div>
);

export default function SuccessStories() {
  return (
    <div>
        <Header/>
    
    <section className="min-h-screen bg-gray-50 py-4 px-6 md:px-20 lg:px-36">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-700">Farmer Success Stories</h1>
        <p className="text-lg text-gray-600 mt-2">किसान सफलताका कथाहरू</p>
        <p className="text-sm text-gray-500 mt-1">Real stories. Real impact. Real change.</p>
      </div>

      {/* Story Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map((story, index) => (
          <StoryCard key={index} {...story} />
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-16 border-t pt-10">
        <h3 className="text-2xl font-semibold text-green-700">📬 Want to Share Your Story?</h3>
        <p className="text-gray-600 mt-2">Your journey could inspire thousands of other farmers across Nepal.</p>
       <Link to="/share-story">
  <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition">
    Share Your Story
  </button>
</Link>
      </div>
    </section>
    </div>
  );
}
