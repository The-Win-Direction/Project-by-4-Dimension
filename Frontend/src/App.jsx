import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home';
import Chatbot from './Pages/Chatbot';
import AI from './Pages/AI';
import About from './Pages/About';
import Login from './Pages/Login';
import MarketPrice from './Pages/MarketPrice';
import SignUp from './Pages/SignUp';
import CropPrediction from './Pages/CropPrediction';
import PestAi from './Pages/PestAi'
import ShareYourStory from './Pages/ShareYourStory';
import ProtectedRoute from './Components/ProtectedRoute';
import SuccessStories from './Pages/SuccessStories';
import KhetTracker from './Pages/KhetTracker';
import DiseaseDetection from './Pages/DiseaseDetection';
import KhetDetail from './Pages/KhetDetail';
import Footer from './Components/Footer';

import KhetDefendersPage from './Pages/KhetDefendersPage';



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
          path="/success-stories"
          element={
            <ProtectedRoute>
              <SuccessStories/>
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
          path="ai/pest-ai"
          element={
            <ProtectedRoute>
              <PestAi />
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

          <Route path="/khet-defenders" element={<KhetDefendersPage />} />


        <Route
          path="/ai/disease-detection"
          element={
            <ProtectedRoute>
              <DiseaseDetection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/khet-tracker"
          element={
            <ProtectedRoute>
              <KhetTracker />
            </ProtectedRoute>
          }
        />
        <Route path="/khet/:khetId" element={<ProtectedRoute><KhetDetail /></ProtectedRoute> } />


      </Routes>
    </Router>
  );
}

export default App;
