import React from 'react';
import { motion } from 'framer-motion';
import { FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Ramesh Thapa',
    role: 'Farmer from Chitwan',
    text: 'This AI tool helped me decide the right crop to plant. My yield improved significantly!',
    avatar: 'https://i.pravatar.cc/150?img=12',
  },
  {
    name: 'Anjali Karki',
    role: 'Agricultural Officer',
    text: 'A revolutionary platform for both farmers and officials. Insightful, accurate, and easy to use.',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
  {
    name: 'Bikash Adhikari',
    role: 'Farmer from Pokhara',
    text: 'Previously, I used to guess market prices. Now I can plan the best time to sell my crops.',
    avatar: 'https://i.pravatar.cc/150?img=33',
  },
];

const TestimonialCard = ({ name, role, text, avatar }) => (
  <motion.div
    className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col gap-4"
    whileHover={{ scale: 1.03 }}
  >
    <FaQuoteLeft className="text-green-500 text-2xl" />
    <p className="text-gray-700 text-sm italic">"{text}"</p>
    <div className="flex items-center gap-4 mt-4">
      <img
        src={avatar}
        alt={name}
        className="w-12 h-12 rounded-full object-cover border-2 border-green-500"
      />
      <div>
        <p className="text-sm font-semibold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  </motion.div>
);

export default function Testimonials() {
  return (
    <section className="bg-gray-50 py-16 px-6 md:px-20 lg:px-36">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-green-700">What People Are Saying</h2>
        <p className="text-gray-600 mt-2">Real experiences from our users</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <TestimonialCard key={idx} {...t} />
        ))}
      </div>

      <div className="text-center mt-16">
        <p className="text-gray-700 text-lg font-medium">
          Have thoughts? <span className="text-green-600 underline cursor-pointer hover:text-green-800">Share your feedback</span>
        </p>
      </div>
    </section>
  );
}
