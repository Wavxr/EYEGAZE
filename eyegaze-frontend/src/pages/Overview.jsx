import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Overview = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Analytics Overview Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Analytics Overview</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Total Websites</p>
            <p className="text-2xl font-bold text-emerald-400">12</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Total Sessions</p>
            <p className="text-2xl font-bold text-cyan-400">48</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Avg. Rating</p>
            <p className="text-2xl font-bold text-purple-400">4.2</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Avg. Duration</p>
            <p className="text-2xl font-bold text-yellow-400">3.2m</p>
          </div>
        </div>
      </motion.div>

      {/* Latest Heatmap Analysis */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Latest Heatmap</h3>
          <button 
            onClick={() => navigate('/dashboard/heatmaps')}
            className="px-3 py-1 text-sm bg-emerald-400/20 text-emerald-400 rounded-full hover:bg-emerald-400/30 transition-colors"
          >
            View All
          </button>
        </div>
        <div className="aspect-video rounded-xl bg-white/5 overflow-hidden">
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <p className="text-gray-400 mb-2">No recent heatmaps</p>
              <button 
                onClick={() => navigate('/dashboard/upload')}
                className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition"
              >
                Upload Website
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => navigate('/dashboard/upload')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">Upload Website</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Start a new eye tracking test</p>
          </button>
          <button 
            onClick={() => navigate('/dashboard/heatmaps')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">View Heatmaps</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Analyze gaze patterns</p>
          </button>
          <button 
            onClick={() => navigate('/dashboard/settings')}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">Settings</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Configure your workspace</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
