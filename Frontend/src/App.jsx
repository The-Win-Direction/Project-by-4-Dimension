import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Chatbot from './Pages/Chatbot';
import AI from './Pages/AI';
import About from './Pages/About';
import Knowledge from './Pages/Knowledge';
import Login from './Pages/Login';
import MarketPrice from './Pages/MarketPrice';
import SignUp from './Pages/SignUp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/ai" element={<AI />} />
        <Route path="/about" element={<About />} />
        <Route path="/knowledge" element={<Knowledge />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/ai/price-prediction" element={<MarketPrice />} />
      </Routes>
    </Router>
  );
}

export default App;
