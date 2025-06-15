import React from 'react';
import { motion } from 'framer-motion';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';
import sunita from '../assets/sunita.jpg'
import manita from '../assets/manita.jpg'
import ramesh from '../assets/ramesh.jpg'
import hari from '../assets/hari.jpg'
import Footer from '../Components/Footer'

const stories = [
  {
    name: 'Ramesh Thapa',
    location: 'Province 3',
    crop: 'Maize & Tomato Farmer',
    image: ramesh,
    highlights: [
      '✅ Switched to high-demand crops',
      '✅ Used weather and market insights',
      '✅ Reduced waste and improved timing', 
    ],
    quote: '“KrishiGPT जस्तो साथी भए पछि, अब डर छैन, भर छ।”',
    story:
      'Before KrishiGPT, I followed old planting patterns without knowing the market. Now I use KrishiGPT\'s AI to decide what to plant and when. My income increased by 40% in just one season.',
  },
  {
    name: 'Sunita Karki',
    location: 'Province 1',
    crop: 'Organic Vegetable Farmer',
    image: sunita,
    highlights: [
      '✅ 60% lower cost on chemical inputs',
      '✅ Boosted income from organic buyers',
      '✅ Learned from the Knowledge Hub daily',
    ],
    quote: '“अब मलाई लाग्छ, साँचो खेती भनेकै जानकारीसहितको खेती हो।”',
    story:
      'KrishiGPT helped me learn how to control pests naturally and understand when to sell for the best price. I now plan my farm around data, not guesswork.',
  },
  {
    name: 'Hari Bahadur',
    location: 'Province 5',
    crop: 'Small Landholder',
    image: hari,
    highlights: [
      '✅ Chose crops with better ROI',
      '✅ Avoided off-season planting losses',
      '✅ Used simple tips from the platform every week',
    ],
    quote: '“KrishiGPT मेरो खेतको साथी मात्रै होइन, आम्दानी बढाउने उपाय पनि हो।”',
    story:
      'KrishiGPT’s AI crop suggestions helped me choose crops that fit my land and the season. I avoided losses during unexpected weather changes thanks to timely alerts and farming tips.',
  },
  {
    name: 'Manita Shrestha',
    location: 'Province 4',
    crop: 'Flower & Fruit Gardener',
    image: manita,
    highlights: [
      '✅ Increased harvest quality',
      '✅ Found local buyers through platform',
      '✅ Adopted eco-friendly practices',
    ],
    quote: '“पहिला केवल मेहनत गर्थें, अहिले स्मार्ट खेती गर्छु।”',
    story:
      'With KrishiGPT, I learned to grow crops suitable for my soil and climate. My flowers are now in demand in local markets, and I feel more connected with my land.',
  },
];

const StoryCard = ({ name, location, crop, story, highlights, quote, image }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 30 }}
    transition={{ duration: 0.5 }}
className="bg-green-100 shadow-sm hover:shadow-green-500 transition p-6 rounded-2xl text-center flex flex-col items-center space-y-4 "
  >
    <img 
      src={image}
      alt={name}
      className="w-40 h-40 object-cover rounded-full border-4 border-green-500 shadow-lg"
    />
    <div>
      <h3 className="text-lg font-bold text-green-800">{name}</h3>
      <p className="text-sm text-gray-600">📍 {location} – {crop}</p>
    </div>
    <p className="text-gray-700 text-md px-2 leading-relaxed">"{story}"</p>
    <ul className="text-md  list-disc list-inside space-y-1 text-left w-full max-w-sm mx-auto">
      {highlights.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
    <p className="text-green-900 font-medium text-sm mt-2 italic border-l-4 pl-3 border-green-300">{quote}</p>
  </motion.div>
);

export default function SuccessStories() {
  return (
    <div className="bg-green-50 min-h-screen">
      <Header />
      <section className="py-4 px-6 md:px-20 lg:px-36">
        {/* Page Title */}
        <div className="text-center mb-4">
          <h1 className="text-4xl font-bold text-green-700">🌾 Farmer Success Stories</h1>
          <p className="text-lg text-gray-500 mt-1">Real stories. Real impact. Real change.</p>
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-10">
          {stories.map((story, idx) => (
            <StoryCard key={idx} {...story} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 border-t pt-12">
          <h3 className="text-2xl font-semibold text-green-700">📬 Want to Share Your Story?</h3>
          <p className="text-gray-600 mt-2">Your journey could inspire thousands of other farmers across Nepal.</p>
          <Link to="/share-story">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="mt-6 mb-6 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold"
            >
              Share Your Story
            </motion.button>
          </Link>

        </div>
      </section>
      <Footer/>
    </div>
  );
}
