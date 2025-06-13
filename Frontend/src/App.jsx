import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Chatbot from './Pages/Chatbot';
import AI from './Pages/AI';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/ai" element={<AI />} />
      </Routes>
    </Router>
  );
}

export default App;
