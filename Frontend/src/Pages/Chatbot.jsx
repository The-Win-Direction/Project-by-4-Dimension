import React, { useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    try {
      const res = await axios.post('https://genai-rag-chatbot-4-dimension.onrender.com/query', {
        query,
        history: updatedMessages.map((msg) => `${msg.sender}: ${msg.text}`).join('\n')
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.response || 'Sorry, no answer found.',
        sources: res.data.sources || []
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error contacting server.' }]);
    }

    setQuery('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-semibold text-green-800 text-center mb-2">
          🌾 KrishiGPT – Agricultural Assistant Chatbot
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Powered by Google Gemini & FAISS with RAG (Retrieval-Augmented Generation) using government PDFs, policies, manuals, and agricultural schemes.
        </p>
        <div className="border border-green-200 bg-green-100 rounded-lg p-4 mb-4 max-h-[60vh] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 p-2 rounded-lg whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-green-200 text-right'
                  : 'bg-white border border-green-300 text-left'
              }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'KrishiGPT'}:</strong> {msg.text}
              {msg.sources && msg.sources.length > 0 && msg.sender === 'bot' && (
                <div className="text-xs text-gray-500 mt-1">
                  Sources: {msg.sources.map((s, i) => <span key={i}>{s.source}</span>)}
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about agriculture, schemes, practices..."
            className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
