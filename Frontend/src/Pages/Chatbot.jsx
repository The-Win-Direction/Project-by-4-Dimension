import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://genai-rag-chatbot-4-dimension.onrender.com/query';

function ChatPage() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const chatHistory = messages
      .filter((msg) => msg.sender === 'user')
      .map((msg) => msg.text)
      .join('\n');

    const fullQuery = chatHistory
      ? `${chatHistory}\n${query}`
      : query;

    try {
      const res = await axios.post(API_URL, {
        query: fullQuery,
      });

      const botMessage = {
        sender: 'bot',
        text: res.data.response,
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuery('');
    } catch (error) {
      console.error('Error contacting the assistant:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: '❌ Something went wrong while contacting the assistant.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-2xl font-bold text-green-700 mb-4 text-center">
          🌾 KrishiGPT: Agricultural Assistant
        </h1>
        <div className="h-[500px] overflow-y-auto space-y-4 border p-4 rounded-md bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-green-100 text-right'
                  : 'bg-white text-left border'
              }`}
            >
              <p className="text-sm">
                <strong>{msg.sender === 'user' ? 'You' : 'KrishiGPT'}:</strong> {msg.text}
              </p>
              {msg.sources && msg.sources.length > 0 && (
                <ul className="mt-2 text-xs text-gray-500">
                  <li><strong>Sources:</strong></li>
                  {msg.sources.map((src, i) => (
                    <li key={i}>🔗 {src.source}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>
        <div className="mt-4 flex">
          <textarea
            className="w-full border rounded-l-md p-2 resize-none"
            placeholder="Type your question here..."
            rows={2}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button
            className="bg-green-600 text-white px-6 rounded-r-md hover:bg-green-700 disabled:opacity-50"
            onClick={sendMessage}
            disabled={loading}
          >
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
