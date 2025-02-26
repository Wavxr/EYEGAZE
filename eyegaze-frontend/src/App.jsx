import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import AuthenticatePage from './pages/AuthenticatePage';
import Dashboard from './pages/Dashboard';
import Overview from './pages/Overview';
import WebsiteTesting from './pages/WebsiteTesting';
import Heatmaps from './pages/Heatmaps';
import Prescription from './pages/Prescription';
import Diagnostic from './pages/Diagnostic';
import HelpSupport from './pages/HelpSupport';
import Profile from './pages/Profile'; 
import Settings from './pages/Settings';
import ProtectedRoute from './middleware/ProtectedRoute';
import SessionPage from './pages/SessionPage';
import HeatmapDetail from './pages/HeatmapDetail';

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
        <div className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10">
          <div className="text-emerald-400">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/authenticate" element={<AuthenticatePage />} />
          {/* Protected Route for Dashboard */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Overview />} />
            <Route path="overview" element={<Overview />} />
            <Route path="website-testing" element={<WebsiteTesting />} />
            <Route path="heatmaps" element={<Heatmaps />} />
            <Route path="heatmap/:id" element={<HeatmapDetail />} />
            <Route path="prescription" element={<Prescription />} />
            <Route path="diagnostic" element={<Diagnostic />} />
            <Route path="help-support" element={<HelpSupport />} />
            <Route path="profile" element={<Profile />} /> 
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route 
            path="/session/:sessionId" 
            element={<SessionPage />} 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;