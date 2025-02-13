// src/pages/SessionPage.jsx
import React from "react";
import ParticipantSession from "../components/ParticipantSession";
import GazeTracker from "../components/GazeTracker";

const SessionPage = ({ match }) => {
  const sessionId = match.params.sessionId;

  return (
    <>
      <ParticipantSession sessionId={sessionId} />
      <GazeTracker sessionId={sessionId} />
    </>
  );
};

export default SessionPage;