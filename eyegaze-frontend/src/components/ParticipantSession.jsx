// src/components/ParticipantSession.jsx
import React, { useEffect, useRef } from "react";
import axios from "axios";

const ParticipantSession = ({ sessionId }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    console.log("Participant Session ID:", sessionId); // Debugging
    const fetchHtml = async () => {
      try {
        const response = await axios.get(`/api/get-html/${sessionId}`);
        console.log("Fetched HTML:", response.data.html); // Debugging
        containerRef.current.innerHTML = response.data.html;
      } catch (error) {
        console.error("Error fetching HTML file:", error.message);
      }
    };
    fetchHtml();
  }, [sessionId]);
  

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
};

export default ParticipantSession;