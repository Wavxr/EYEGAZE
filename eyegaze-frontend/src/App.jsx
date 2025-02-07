import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import LandingPage from './pages/LandingPage';
import AuthenticatePage from './pages/AuthenticatePage'; 

const App = () => {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/authenticate" element={<AuthenticatePage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;