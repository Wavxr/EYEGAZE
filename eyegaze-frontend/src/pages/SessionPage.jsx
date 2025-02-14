// src/components/SessionPage.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SessionPage = () => {
  const { sessionId } = useParams();

  useEffect(() => {
    // Perform full-page redirect with query parameters
    window.location.href = `/participant-session.html${window.location.search}`;
  }, [sessionId]);

  return null; // Or a loading spinner
};

export default SessionPage;