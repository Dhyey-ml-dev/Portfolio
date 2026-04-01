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
    logo: '/logo.png',
    about: '',
    services: [],
    contactInfo: {}
  });

  useEffect(() => {
    // Fetch global settings (logo, etc)
    const fetchSettings = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/upload/settings');
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
        <Navbar logo={settings.logo} />
        
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
