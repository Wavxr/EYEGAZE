import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeatmapComponent from '../components/HeatmapComponent';

const Heatmaps = () => {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch('http://localhost:8000/websites');
        if (!response.ok) throw new Error('Failed to fetch websites');
        const data = await response.json();
        setWebsites(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-white">Website Heatmaps</h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {websites.map((website) => (
          <HeatmapComponent
            key={website.id}
            websiteId={website.id}
            thumbnail={true}
            onClick={() => navigate(`/dashboard/heatmap/${website.id}`)}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default Heatmaps;