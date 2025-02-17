// eyegaze-frontend/src/pages/WebsiteTesting.jsx
import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";

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
    if (selectedFile && !selectedFile.type.includes("image/")) {
      alert("Please upload a valid image file (PNG, JPEG, etc.).");
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
      alert("Please upload an image file.");
      return;
    }
  
    setIsLoading(true);
  
    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("guideline", formData.guideline);
    formDataToSend.append("file", file);

    // Retrieve user details from Firebase Auth
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      formDataToSend.append("owner_id", user.uid);
      formDataToSend.append("owner_name", user.displayName || "Anonymous");
    } else {
      alert("User not authenticated.");
      setIsLoading(false);
      return;
    }
  
    try {
      const response = await axios.post("http://localhost:8000/upload-image", formDataToSend);
  
      console.log("Backend Response:", response.data);
  
      if (!response.data.file_key) {
        console.error("Error: file_key missing in response.");
        alert("Error generating session. Please try again.");
        return;
      }
  
      // Generate correct participant link
      const participantURL = `http://localhost:5173/session/${response.data.session_id}?file_key=${encodeURIComponent(response.data.file_key)}`;
  
      // Save website data to Firebase
      try {
        const websiteData = {
          owner_id: user.uid,
          owner_name: user.displayName || "Anonymous",
          title: formData.title,
          guideline: formData.guideline,
          s3_file_key: response.data.file_key,
          participant_link: participantURL
        };

        await axios.post("http://localhost:8000/save-website", websiteData);
      } catch (error) {
        console.error("Error saving to Firebase:", error);
        alert("Website uploaded but there was an error saving metadata. Please try again.");
        return;
      }
  
      setParticipantLink(participantURL);
      alert("Image uploaded and metadata saved successfully!");
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
        <p className="text-lg text-gray-600 mt-2">Upload a website screenshot and start gaze tracking</p>
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Testing Guidelines</label>
            <textarea
              name="guideline"
              value={formData.guideline}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 h-32"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium mb-2 text-gray-700">Upload Website Screenshot</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          {previewUrl && (
            <div className="mt-4">
              <p className="text-lg font-medium mb-2 text-gray-700">Preview:</p>
              <img src={previewUrl} alt="Preview" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 text-white rounded-lg text-lg font-semibold 
              ${isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            {isLoading ? "Uploading..." : "Upload Website Screenshot"}
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
