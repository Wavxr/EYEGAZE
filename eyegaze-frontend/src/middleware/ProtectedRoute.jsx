import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase';

const ProtectedRoute = ({ children }) => {
  const user = auth.currentUser; // Check if a user is logged in

  if (!user) {
    return <Navigate to="/authenticate" replace />; // Redirect to login if not authenticated
  }

  return children; // Render the protected content if authenticated
};

export default ProtectedRoute;