import React, { useState } from 'react';
import Header from '../Components/Header';

export default function ShareYourStory() {
  const [form, setForm] = useState({
    name: '',
    location: '',
    crop: '',
    story: '',
    highlights: '',
    quote: '',
    image: null,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: URL.createObjectURL(files[0]) });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Replace this with API POST call
    console.log(form);
    setSubmitted(true);
  };

  if (submitted) {
    return (  
      <div className="min-h-screen flex items-center justify-center px-6 bg-green-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Thank You!</h2>
          <p className="text-gray-600">Your story has been submitted and will inspire other farmers soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div><Header/>
    <section className="min-h-screen py-4 px-6  lg:px-36 bg-green-50">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-green-700 mb-6">📬 Share Your Success Story</h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="location"
            placeholder="Your Province / Location"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.location}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="crop"
            placeholder="What Crops Do You Grow?"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.crop}
            onChange={handleChange}
            required
          />
          <textarea
            name="story"
            rows={4}
            placeholder="Tell us your story. How did FarmFuse help you?"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.story}
            onChange={handleChange}
            required
          />
          <textarea
            name="highlights"
            rows={3}
            placeholder="Write 2-3 bullet points (e.g. ✅ Switched to high-demand crops)"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.highlights}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="quote"
            placeholder="A quote in Nepali or English (optional)"
            className="w-full border border-gray-300 px-4 py-2 rounded-md"
            value={form.quote}
            onChange={handleChange}
          />
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Upload Your Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full"
            />
            {form.image && (
              <img src={form.image} alt="Preview" className="mt-4 h-32 w-32 object-cover rounded-lg" />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
          >
            Submit My Story
          </button>
        </form>
      </div>
    </section>
    </div>
  );
}
