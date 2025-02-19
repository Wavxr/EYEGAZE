import React from "react";
import { motion } from "framer-motion";

const Overview = () => {
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
            <p className="text-sm text-gray-400">Total Sessions</p>
            <p className="text-2xl font-bold text-emerald-400">24</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Active Tests</p>
            <p className="text-2xl font-bold text-cyan-400">3</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Total Views</p>
            <p className="text-2xl font-bold text-purple-400">142</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Avg. Duration</p>
            <p className="text-2xl font-bold text-yellow-400">2.5m</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Recent Activity</h3>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white/5 rounded-xl p-4 flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-emerald-400/20 flex items-center justify-center">
                <span className="text-emerald-400">👁️</span>
              </div>
              <div>
                <p className="text-white">Website Test #{item}</p>
                <p className="text-sm text-gray-400">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Heatmap Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Latest Heatmap Analysis</h3>
        <div className="aspect-video rounded-xl bg-white/5 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-400 mb-2">Select a website to view heatmap</p>
            <button className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition">
              View Heatmaps
            </button>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
            <p className="text-white font-medium">New Test</p>
            <p className="text-sm text-gray-400">Create a new eye tracking test</p>
          </button>
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
            <p className="text-white font-medium">View Reports</p>
            <p className="text-sm text-gray-400">Access detailed analytics</p>
          </button>
          <button className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left">
            <p className="text-white font-medium">Share Results</p>
            <p className="text-sm text-gray-400">Export and share insights</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
