import React from 'react';
import { auth } from '../config/firebase'; // Import the auth object
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle Logout
  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user
      navigate('/'); // Redirect to the authentication page
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Failed to log out.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Welcome to the Dashboard!
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        You are now logged in. Enjoy your session.
      </p>
      <button
        onClick={handleLogout}
        className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;