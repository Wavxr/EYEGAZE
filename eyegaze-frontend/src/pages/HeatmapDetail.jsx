import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import HeatmapComponent from '../components/HeatmapComponent';
import { motion } from 'framer-motion';

const HeatmapDetail = () => {
  const { id } = useParams();
  const [websiteData, setWebsiteData] = useState(null);

  useEffect(() => {
    const fetchWebsiteData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/website-gaze-data/${id}`);
        const data = await response.json();
        setWebsiteData(data);
      } catch (error) {
        console.error('Error fetching website data:', error);
      }
    };

    fetchWebsiteData();
  }, [id]);

  const participant = websiteData?.participants?.[0];
  const sessionTime = participant ? 
    Math.round((new Date(participant.session_end_time) - 
    new Date(participant.session_start_time)) / 1000) : 0;

  return (
    <div className="container mx-auto px-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text"
      >
        {websiteData?.websiteTitle || 'Loading...'}
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <HeatmapComponent websiteId={id} />
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
                  Rating: {participant?.feedback}/5
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Participant</span>
                  <span className="text-gray-200">{participant?.name}</span>
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