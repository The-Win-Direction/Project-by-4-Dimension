import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={styles.header}>
      <h2 style={styles.logo}>KrishiGPT</h2>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/chatbot" style={styles.link}>Chatbot</Link>
        <Link to="/ai" style={styles.link}>AI</Link>
        <Link to="/about" style={styles.link}>About</Link>
        <Link to="/knowledge" style={styles.link}>Knowledge</Link>
      </nav>
    </header>
  );
}

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: '#4CAF50', 
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
  },
};

export default Header;
