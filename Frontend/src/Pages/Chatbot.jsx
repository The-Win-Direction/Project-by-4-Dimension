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
    const userMsg = { sender: 'user', text: query };
    const updated = [...messages, userMsg];
    setMessages(updated);
    setLoading(true);

    const history = updated.map(m => `${m.sender === 'user' ? 'You' : 'KrishiGPT'}: ${m.text}`);

    try {
      const res = await axios.post('http://localhost:8000/query', {
        query,
        history
      });

      const botMsg = {
        sender: 'bot',
        text: res.data.response,
        sources: res.data.sources
      };
      setMessages([...updated, botMsg]);
    } catch {
      setMessages(prev => [...prev, { sender: 'bot', text: '⚠️ Error contacting server.' }]);
    }
    setQuery('');
    setLoading(false);
  };

  const handleKeyDown = e => e.key === 'Enter' && sendMessage();

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
        <div
          ref={chatBoxRef}
          className="border border-green-200 bg-green-100 rounded-lg p-4 mb-4 max-h-[60vh] overflow-y-auto"
        >
          {messages.map((m, i) => (
            <div key={i} className={`mb-3 p-3 rounded ${m.sender === 'user' ? 'bg-green-200 text-right' : 'bg-white border'} whitespace-pre-line`}>
              <strong>{m.sender === 'user' ? 'You' : 'KrishiGPT'}:</strong> {m.text}
              {m.sources?.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                  🔗 <strong>Sources:</strong>{' '}
                  {m.sources.map((s, idx) => <span key={idx} className="mr-2 underline decoration-dotted">[{s.source}]</span>)}
                </div>
              )}
            </div>
          ))}
          {loading && <p className="text-sm text-gray-500">⌛ Generating response...</p>}
        </div>
        <div className="flex gap-2 mt-4">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, pests, or fertilizer..."
            className="flex-1 px-4 py-2 border rounded focus:ring"
          />
          <button onClick={sendMessage} disabled={loading} className="px-5 py-2 bg-green-600 text-white rounded-lg">
            {loading ? '...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
