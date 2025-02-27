import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeatmapComponent from '../components/HeatmapComponent';

const Heatmaps = () => {
  const [websites, setWebsites] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingWebsite, setViewingWebsite] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { websiteId } = useParams();

  useEffect(() => {
    const fetchWebsites = async () => {
      try {
        const response = await fetch('http://localhost:8000/websites');
        if (!response.ok) throw new Error('Failed to fetch websites');
        const data = await response.json();
        setWebsites(data);
        
        // If there's a websiteId in the URL, fetch its sessions
        if (websiteId) {
          const website = data.find(w => w.id === websiteId);
          if (website) {
            setViewingWebsite(website);
            fetchSessions(websiteId);
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebsites();
  }, [websiteId]);

  const fetchSessions = async (websiteId) => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/website-sessions/${websiteId}`);
      if (!response.ok) throw new Error('Failed to fetch sessions');
      const data = await response.json();
      setSessions(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleWebsiteClick = (website) => {
    navigate(`/dashboard/heatmaps/website/${website.id}`);
    setViewingWebsite(website);
    fetchSessions(website.id);
  };

  const handleBack = () => {
    navigate('/dashboard/heatmaps');
    setViewingWebsite(null);
    setSessions([]);
  };

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
        <h2 className="text-2xl font-semibold text-white">
          {viewingWebsite ? (
            <div className="flex items-center gap-2">
              <button 
                onClick={handleBack}
                className="text-emerald-400 hover:text-emerald-300"
              >
                ←
              </button>
              {viewingWebsite.title} Sessions
            </div>
          ) : (
            "Website Heatmaps"
          )}
        </h2>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {viewingWebsite ? (
          sessions.map((session) => (
            <div key={session.id} className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-4">
              <HeatmapComponent
                websiteId={viewingWebsite.id}
                sessionId={session.id}
                thumbnail={true}
                onClick={() => navigate(`/dashboard/heatmap/${viewingWebsite.id}/${session.id}`)}
              />
              <div className="mt-4 text-gray-300">
                <p className="font-semibold">{session.name}</p>
                <p className="text-sm text-gray-400">Session Duration: {
                  Math.round((new Date(session.session_end_time) - new Date(session.session_start_time)) / 1000)
                }s</p>
              </div>
            </div>
          ))
        ) : (
          websites.map((website) => (
            <HeatmapComponent
              key={website.id}
              websiteId={website.id}
              thumbnail={true}
              onClick={() => handleWebsiteClick(website)}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default Heatmaps;