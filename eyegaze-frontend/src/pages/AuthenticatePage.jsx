import React from 'react';

const AuthenticatePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#121212] text-white">
      <h1 className="text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
        Welcome to EYEGAZE Authentication
      </h1>
      <p className="text-lg text-gray-400 mb-8">
        Please sign in or create an account to access our platform.
      </p>
      <div className="flex space-x-4">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
          Sign In
        </button>
        <button className="px-6 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition">
          Create Account
        </button>
      </div>
    </div>
  );
};

export default AuthenticatePage;