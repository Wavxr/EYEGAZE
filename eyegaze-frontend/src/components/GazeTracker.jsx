// src/components/GazeTracker.jsx
import React, { useEffect } from "react";

const GazeTracker = ({ sessionId }) => {
  useEffect(() => {
    // Initialize WebGazer.js
    webgazer.setRegression("ridge");
    webgazer.setTracker("clmtrackr");
    webgazer.begin();

    const gazePoints = [];

    // Collect gaze points
    webgazer.setGazeListener((data, elapsedTime) => {
      if (data) {
        gazePoints.push({ x: data.x, y: data.y, timestamp: elapsedTime });
      }
    });

    // Send gaze points to the backend after 10 seconds
    setTimeout(async () => {
      try {
        await axios.post("/api/upload-gaze-data", {
          session_id: sessionId,
          gaze_points: gazePoints,
        });
        console.log("Gaze data uploaded successfully!");
      } catch (error) {
        console.error("Error uploading gaze data:", error.message);
      }
    }, 10000); // Wait 10 seconds to collect gaze data

    return () => {
      webgazer.end();
    };
  }, [sessionId]);

  return null;
};

export default GazeTracker;