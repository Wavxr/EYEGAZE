import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate
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

const App = () => {
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