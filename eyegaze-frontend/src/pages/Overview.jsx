import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiCopy, FiCheck } from "react-icons/fi";

const CopyLinkButton = ({ link }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.button
      onClick={handleCopy}
      className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
        copied ? "bg-emerald-500/20 text-emerald-400" : "bg-white/5 text-gray-300 hover:bg-white/10"
      } transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {copied ? (
        <>
          <FiCheck className="w-4 h-4" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <FiCopy className="w-4 h-4" />
          <span>Copy Link</span>
        </>
      )}
    </motion.button>
  );
};

const Overview = () => {
  const navigate = useNavigate();
  const [websites, setWebsites] = useState([]);

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch("http://localhost:8000/websites");
        const data = await response.json();
        setWebsites(data);
      } catch (error) {
        console.error("Error fetching websites:", error);
      }
    };

    fetchWebsites();
  }, []);

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
            <p className="text-2xl font-bold text-cyan-400">48</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Participation Link</p>
            <button
              onClick={() => navigate("/dashboard/website-testing")}
              className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Generate New Link →
            </button>
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

      {/* Diagnostic Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Diagnostic Summary</h3>
          <button
            onClick={() => navigate("/dashboard/diagnostic")}
            className="px-3 py-1 text-sm bg-emerald-400/20 text-emerald-400 rounded-full hover:bg-emerald-400/30 transition-colors"
          >
            View Details
          </button>
        </div>
        <div className="space-y-4">
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Longest Fixation</p>
            <p className="text-lg font-semibold text-white">11.51s on Header</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Total Fixations</p>
            <p className="text-lg font-semibold text-white">9 points</p>
          </div>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-sm text-gray-400">Average Duration</p>
            <p className="text-lg font-semibold text-white">3.60 seconds</p>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-white">Recent Activity</h3>
          <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
            View All →
          </button>
        </div>
        <div className="space-y-4">
          {[
            { action: "New Session", time: "2 minutes ago", status: "Completed" },
            { action: "Heatmap Generated", time: "1 hour ago", status: "Success" },
            { action: "Website Upload", time: "3 hours ago", status: "Success" }
          ].map((activity, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
              <div>
                <p className="text-white font-medium">{activity.action}</p>
                <p className="text-sm text-gray-400">{activity.time}</p>
              </div>
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-400/20 text-emerald-400">
                {activity.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Replace Eye-Tracking Statistics with Websites List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Your Websites</h3>
        <div className="space-y-4">
          {websites.map((website, idx) => (
            <div key={idx} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{website.title}</p>
                  <p className="text-sm text-gray-400">{new Date(website.createdAt).toLocaleDateString()}</p>
                </div>
                <CopyLinkButton 
                  link={`http://localhost:5173/participant-session.html?file_key=${website.s3FileKey}&website_id=${website.id}`}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => navigate("/dashboard/website-testing")}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">Upload Website</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Start a new eye tracking test</p>
          </button>
          <button
            onClick={() => navigate("/dashboard/heatmaps")}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">View Heatmaps</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Analyze gaze patterns</p>
          </button>
          <button
            onClick={() => navigate("/dashboard/diagnostic")}
            className="p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-colors text-left group"
          >
            <div className="flex items-center justify-between">
              <p className="text-white font-medium">View Analysis</p>
              <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
            </div>
            <p className="text-sm text-gray-400 mt-1">Check detailed insights</p>
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
