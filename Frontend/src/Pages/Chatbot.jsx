import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setLoading(true);

    try {
      // Build chat history text array
      const history = updatedMessages.map((msg) => `${msg.sender === 'user' ? 'You' : 'KrishiGPT'}: ${msg.text}`);

      const res = await axios.post('https://genai-rag-chatbot-4-dimension.onrender.com/query', {
        query,
        history
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.response || '❌ Sorry, I could not find an answer.',
        sources: res.data.sources || []
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [...prev, {
        sender: 'bot',
        text: '⚠️ Error contacting KrishiGPT server.'
      }]);
    }

    setQuery('');
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  // Scroll to bottom on new message
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="min-h-screen bg-green-50 font-sans">
      <Header />
      <div className="max-w-3xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-green-800 text-center mb-2">
          🌾 KrishiGPT – Your Farming AI Assistant
        </h2>
        <p className="text-sm text-center text-gray-600 mb-4">
          Ask anything about crops, weather, pests, government schemes, etc.
        </p>

        <div
          ref={chatBoxRef}
          className="border border-green-200 bg-green-100 rounded-lg p-4 mb-4 max-h-[60vh] overflow-y-auto"
        >
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-3 p-3 rounded-lg whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-green-200 text-right'
                  : 'bg-white border border-green-300 text-left'
              }`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'KrishiGPT'}:</strong> {msg.text}
              {msg.sources && msg.sources.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                  🔗 <strong>Sources:</strong>{' '}
                  {msg.sources.map((s, i) => (
                    <span key={i} className="mr-2 underline decoration-dotted">
                      [{s.source}]
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500">⌛ Generating response...</p>}
        </div>

        <div className="flex gap-2 mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about agriculture, crop care, fertilizer tips..."
            className="flex-1 px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button
            onClick={sendMessage}
            className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
