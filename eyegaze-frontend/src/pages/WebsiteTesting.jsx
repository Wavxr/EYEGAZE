import React, { useState } from "react";
import axios from "axios";

const WebsiteTesting = () => {
  const [formData, setFormData] = useState({
    title: "",
    guideline: ""
  });
  const [file, setFile] = useState(null);
  const [participantLink, setParticipantLink] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && !selectedFile.type.includes("text/html")) {
      alert("Please upload a valid HTML file.");
      return;
    }
    setFile(selectedFile);

    // Create a preview URL
    const url = URL.createObjectURL(selectedFile);
    setPreviewUrl(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload an HTML file.");
      return;
    }
  
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("guideline", formData.guideline);
    formDataToSend.append("file", file);
  
    try {
      const response = await axios.post("http://localhost:8000/api/upload-html", formDataToSend);
  
      console.log("Backend Response:", response.data);
  
      if (!response.data.file_key) {
        console.error("Error: file_key missing in response.");
        alert("Error generating session. Please try again.");
        return;
      }
  
      // Generate correct participant link
      const participantURL = `http://localhost:5173/session/${response.data.session_id}?file_key=${encodeURIComponent(response.data.file_key)}`;
  
      setParticipantLink(participantURL);
      alert("HTML file uploaded successfully!");
    } catch (error) {
      console.error("Error:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-blue-600">EYEGAZE Website Testing</h1>
        <p className="text-lg text-gray-600 mt-2">Upload an HTML file and start gaze tracking</p>
      </header>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Website Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter website title"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Testing Guideline</label>
            <textarea
              name="guideline"
              value={formData.guideline}
              onChange={handleInputChange}
              rows="4"
              placeholder="e.g., Improve CTA clicks"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Upload HTML File</label>
            <input
              type="file"
              accept=".html"
              onChange={handleFileChange}
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300"
              required
            />
          </div>
          {previewUrl && (
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Preview:</h3>
              <iframe
                src={previewUrl}
                title="Uploaded HTML Preview"
                style={{ width: "100%", height: "300px", border: "1px solid #ccc" }}
                sandbox="allow-scripts allow-same-origin"
              ></iframe>
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 rounded-lg text-lg font-semibold text-white hover:bg-blue-700"
            disabled={isLoading}
          >
            {isLoading ? "Uploading..." : "Upload and Generate Link"}
          </button>
        </form>
        {participantLink && (
          <div className="mt-4 text-center">
            <p className="text-lg text-green-600">Participant Link:</p>
            <a href={participantLink} target="_blank" rel="noopener noreferrer" className="text-blue-600">
              {participantLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default WebsiteTesting;