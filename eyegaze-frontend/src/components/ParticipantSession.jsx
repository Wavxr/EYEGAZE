import React from "react";
import { useParams, useSearchParams } from "react-router-dom";

const ParticipantSession = () => {
  const { sessionId } = useParams();
  const [searchParams] = useSearchParams();

  const fileKey = searchParams.get("file_key");
  if (!fileKey) {
    // If there's no file key, just render an error message:
    return <p>Error: No file key provided.</p>;
  }

  // Construct the raw-HTML endpoint URL
  const rawUrl = `http://localhost:8000/api/get-html-raw/${fileKey}`;

  /**
   * Render an <iframe> filling the screen,
   * pointing directly to the raw HTML endpoint.
   * The user sees the page EXACTLY as it was uploaded, with no Tailwind overwriting it.
   */
  return (
    <iframe
      title="Participant Session"
      src={rawUrl}
      style={{
        width: "100vw",
        height: "100vh",
        border: "none",
        margin: 0,
        padding: 0,
      }}
    />
  );
};

export default ParticipantSession;
