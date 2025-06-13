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
import CropPrediction from './Pages/CropPrediction';
import ShareYourStory from './Pages/ShareYourStory';

import ProtectedRoute from './Components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai"
          element={
            <ProtectedRoute>
              <AI />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/knowledge"
          element={
            <ProtectedRoute>
              <Knowledge />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/price-prediction"
          element={
            <ProtectedRoute>
              <MarketPrice />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ai/crop-prediction"
          element={
            <ProtectedRoute>
              <CropPrediction />
            </ProtectedRoute>
          }
        />
        <Route
          path="/share-story"
          element={
            <ProtectedRoute>
              <ShareYourStory />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
