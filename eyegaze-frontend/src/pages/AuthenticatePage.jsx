import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase'; // Import the auth object
import { useNavigate } from 'react-router-dom';

const AuthenticatePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const navigate = useNavigate();

  const provider = new GoogleAuthProvider();

  // Handle Google Sign-In
  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard'); // Redirect to dashboard after successful authentication
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google.');
    }
  };

  // Handle Email/Password Sign-In or Sign-Up
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard'); // Redirect to dashboard after successful authentication
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#121212] text-white">
      {/* Left Image Section */}
      <div className="hidden lg:block lg:w-1/2 h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://via.placeholder.com/800x1200')" }}>
      </div>

      {/* Right Form Section */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-center px-8">
        <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
          Welcome to EYEGAZE Authentication
        </h1>
        <p className="text-lg text-gray-400 mb-8">
          {isLogin ? 'Sign in to access our platform.' : 'Create an account to get started.'}
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="mt-4 flex items-center justify-between w-full max-w-md">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-400 hover:underline cursor-pointer"
          >
            {isLogin ? 'Create a new account' : 'Already have an account? Sign In'}
          </button>
          <button
            onClick={handleGoogleSignIn}
            className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-6 h-6 mr-2" />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthenticatePage;