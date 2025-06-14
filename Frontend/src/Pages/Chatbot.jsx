import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import { SendHorizonal, Bot, User, Loader2 } from 'lucide-react';

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

    const fullQuery = chatHistory ? `${chatHistory}\n${query}` : query;

    try {
      const res = await axios.post(API_URL, { query: fullQuery });

      const botMessage = {
        sender: 'bot',
        text: res.data.response,
        sources: res.data.sources || [],
      };

      setMessages((prev) => [...prev, botMessage]);
      setQuery('');
      console.log(res);
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
    <div className='bg-green-50 h-[100vh]'>
      <Header />
      <div className="bg-green-50  flex items-center justify-center px-4 ">
        <div className="w-full max-w-6xl bg-white  shadow-2xl p-8">
          <h1 className="text-3xl font-semibold text-green-700 mb-6 text-center">
            🌿 KrishiGPT - Your Smart Agricultural Assistant
          </h1>

          {/* Chat Display */}
          <div className="h-[400px] overflow-y-auto px-4 py-4 rounded-2xl bg-green-100 border border-green-200 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-3 ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {msg.sender === 'bot' && (
                  <div className="p-2 bg-green-200 rounded-full">
                    <Bot className="h-5 w-5 text-green-800" />
                  </div>
                )}
                <div
                  className={`p-4 max-w-[70%] rounded-2xl shadow-md whitespace-pre-line ${
                    msg.sender === 'user'
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-white text-gray-900 rounded-bl-none'
                  }`}
                >
                  <p className="text-md leading-relaxed">{msg.text}</p>
                  {/* {msg.sources && msg.sources.length > 0 && (
                    <ul className="mt-2 text-xs text-gray-500 space-y-1">
                      <li><strong>Sources:</strong></li>
                      {msg.sources.map((src, i) => (
                        <li key={i}>🔗 {src.source}</li>
                      ))}
                    </ul>
                  )} */}
                </div>
                {msg.sender === 'user' && (
                  <div className="p-2 bg-green-600 rounded-full">
                    <User className="h-5 w-5 text-white" />
                  </div>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-200 rounded-full">
                  <Bot className="h-5 w-5 text-green-800" />
                </div>
                <div className="text-sm text-gray-600 animate-pulse">
                  <Loader2 className="inline-block w-4 h-4 mr-2 animate-spin" />
                  KrishiGPT is thinking...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="mt-6 flex">
            <textarea
              className="w-full border border-green-300 rounded-l-2xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Ask your farming question here..."
              rows={2}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={loading}
            />
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 flex items-center justify-center rounded-r-2xl transition duration-200 disabled:opacity-50"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <SendHorizonal className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
