import React, { useState } from 'react';
import Header from '../Components/Header';

function Chatbot() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!query.trim()) return;

    const userMessage = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const res = await fetch('https://genai-rag-chatbot-4-dimension.onrender.com/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      const botMessage = {
        sender: 'bot',
        text: data.response || 'Sorry, no answer found.',
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
    <div>
      <Header />
      <div style={styles.container}>
        <div style={styles.chatBox}>
          {messages.map((msg, idx) => (
            <div key={idx} style={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
              <strong>{msg.sender === 'user' ? 'You' : 'Bot'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={styles.inputArea}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something..."
            style={styles.input}
          />
          <button onClick={sendMessage} style={styles.button}>Send</button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '700px',
    margin: '20px auto',
    padding: '20px',
  },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '10px',
    minHeight: '300px',
    maxHeight: '60vh',
    overflowY: 'auto',
    backgroundColor: '#f9f9f9',
  },
  userMsg: {
    textAlign: 'right',
    margin: '10px 0',
    color: '#1a73e8',
  },
  botMsg: {
    textAlign: 'left',
    margin: '10px 0',
    color: '#34a853',
  },
  inputArea: {
    marginTop: '15px',
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px 15px',
    fontSize: '16px',
    backgroundColor: '#1a73e8',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default Chatbot;
