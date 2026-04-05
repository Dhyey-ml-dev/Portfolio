import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Chatbot from './components/Chatbot.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Admin from './pages/Admin.jsx';
import axios from 'axios';

// Helper to check for auth
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
};

function App() {
  const [settings, setSettings] = useState({
    assets: { logo: '/logo.png', audio: '', audioEnabled: false },
    about: { title: 'About', body: '' },
    services: [],
    contact: { email: 'pavagadhidhyey2@gmail.com', whatsapp: '' }
  });

  useEffect(() => {
    // Fetch global settings
    const fetchSettings = async () => {
      try {
        const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
        const res = await axios.get(`${apiBase}/settings`);
        setSettings(res.data);
      } catch (err) {
        console.error("Error fetching settings:", err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar logo={settings.assets.logo} />
        
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home settings={settings} />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute>
                <Admin settings={settings} setSettings={setSettings} />
              </ProtectedRoute>
            } 
          />
        </Routes>

        <Chatbot />
      </div>
    </Router>
  );
}

export default App;
