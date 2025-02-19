import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AuthenticatePage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in with Google.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 relative overflow-hidden">
      {/* Background gradient circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/5 p-8 rounded-2xl border border-white/10 w-full max-w-md relative z-10"
      >
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Welcome to EYEGAZE
          </span>
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-400/50"
              placeholder="Email"
              required
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-400/50"
              placeholder="Password"
              required
            />
          </motion.div>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            {isLogin ? 'Sign In' : 'Create Account'}
          </motion.button>
        </form>

        <div className="mt-6 flex flex-col items-center space-y-4">
          <div className="w-full flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-white/10"></div>
            <span className="text-gray-400">or</span>
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={handleGoogleSignIn}
            className="w-full py-3 bg-white/5 border border-white/10 rounded-lg hover:border-emerald-400/50 transition flex items-center justify-center text-white"
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google Icon" className="w-5 h-5 mr-2" />
            Sign in with Google
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-400 hover:text-emerald-400 transition"
          >
            {isLogin ? 'Create a new account' : 'Already have an account? Sign In'}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthenticatePage;