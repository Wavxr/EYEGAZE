import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const HeatmapComponent = ({ websiteId, sessionId = null, thumbnail = false, onClick }) => {
  const [heatmapData, setHeatmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        // Fetch gaze data with optional session ID
        const endpoint = sessionId 
          ? `http://localhost:8000/website-gaze-data/${websiteId}?session_id=${sessionId}`
          : `http://localhost:8000/website-gaze-data/${websiteId}`;

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch heatmap data');
        }
        const data = await response.json();
        setHeatmapData(data);
        
        // If no heatmap is generated yet, just show the original image
        setImageUrl(`http://localhost:8000/get-image/${data.imageUrl}`);

        // Only try to get heatmap if we have a session ID
        if (sessionId) {
          try {
            const heatmapResponse = await fetch(`http://localhost:8000/get-heatmap/${websiteId}/${sessionId}`);
            if (heatmapResponse.ok) {
              const blob = await heatmapResponse.blob();
              setImageUrl(URL.createObjectURL(blob));
            }
          } catch (imgError) {
            console.error('Error loading session heatmap:', imgError);
          }
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeatmapData();
    
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [websiteId, sessionId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 p-4">
        Error: {error}
      </div>
    );
  }

  const containerClass = thumbnail 
    ? "cursor-pointer overflow-hidden rounded-xl hover:shadow-lg transition-all duration-200"
    : "rounded-xl overflow-hidden";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={containerClass}
      onClick={onClick}
    >
      <div className="relative">
        {imageUrl && (
          <img 
            src={imageUrl}
            alt={heatmapData?.websiteTitle}
            className={`w-full ${thumbnail ? 'h-48 object-cover' : 'h-auto'}`}
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <h3 className="text-white font-semibold">{heatmapData?.websiteTitle}</h3>
          {!thumbnail && (
            <p className="text-gray-200 text-sm mt-1">
              {heatmapData?.participants?.length || 0} participants
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default HeatmapComponent;
