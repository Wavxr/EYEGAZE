import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import HeatmapComponent from '../components/HeatmapComponent';
import { motion } from 'framer-motion';

const HeatmapDetail = () => {
  const { websiteId, sessionId } = useParams();  // Changed from { id }
  const navigate = useNavigate();
  const [websiteData, setWebsiteData] = useState(null);
  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch session-specific gaze data
        const gazeResponse = await fetch(
          `http://localhost:8000/website-gaze-data/${websiteId}?session_id=${sessionId}`
        );
        if (!gazeResponse.ok) throw new Error('Failed to fetch gaze data');
        const gazeData = await gazeResponse.json();
        setWebsiteData(gazeData);

        // Fetch session details
        const sessionResponse = await fetch(
          `http://localhost:8000/website-sessions/${websiteId}`
        );
        if (!sessionResponse.ok) throw new Error('Failed to fetch session data');
        const sessions = await sessionResponse.json();
        const currentSession = sessions.find(s => s.id === sessionId);
        setSessionData(currentSession);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (websiteId && sessionId) {
      fetchData();
    }
  }, [websiteId, sessionId]);

  if (!websiteData || !sessionData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  const sessionTime = Math.round(
    (new Date(sessionData.session_end_time) - new Date(sessionData.session_start_time)) / 1000
  );

  return (
    <div className="container mx-auto px-6 space-y-6">
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <button
          onClick={() => navigate(`/dashboard/heatmaps/website/${websiteId}`)}
          className="text-emerald-400 hover:text-emerald-300"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
          {websiteData.websiteTitle || 'Loading...'}
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <HeatmapComponent 
            websiteId={websiteId} 
            sessionId={sessionId}
            thumbnail={false}
          />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6 h-fit"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-emerald-400">Session Details</h3>
                <span className="px-3 py-1 rounded-full bg-emerald-400/20 text-emerald-400 text-sm">
                  Rating: {sessionData.feedback || 'N/A'}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Participant</span>
                  <span className="text-gray-200">{sessionData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Session Duration</span>
                  <span className="text-gray-200">{sessionTime}s</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeatmapDetail;