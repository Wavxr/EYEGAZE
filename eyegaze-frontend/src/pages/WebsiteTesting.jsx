// eyegaze-frontend/src/pages/WebsiteTesting.jsx
import React, { useState } from "react";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { motion } from "framer-motion";

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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Upload Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Create New Test</h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Website Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-400/50"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Testing Guidelines</label>
            <textarea
              name="guideline"
              value={formData.guideline}
              onChange={handleInputChange}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-400/50 h-32 resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Upload Website Screenshot</label>
            <div className="relative">
              <input
                type="file"
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
                id="file-upload"
                required
              />
              <label
                htmlFor="file-upload"
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-300 hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                </svg>
                Choose File
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 px-6 rounded-xl text-black font-semibold transition-all duration-200 
              ${isLoading 
                ? 'bg-gray-400' 
                : 'bg-gradient-to-r from-emerald-400 to-cyan-400 hover:opacity-90'
              }`}
          >
            {isLoading ? "Uploading..." : "Create Test Session"}
          </button>
        </form>
      </motion.div>

      {/* Preview Section */}
      {previewUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Preview</h3>
          <div className="rounded-xl overflow-hidden">
            <img src={previewUrl} alt="Preview" className="w-full h-auto" />
          </div>
        </motion.div>
      )}

      {/* Participant Link Section */}
      {participantLink && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-white mb-6">Share Test Session</h3>
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-gray-300 mb-2">Participant Link:</p>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                value={participantLink}
                readOnly
                className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white"
              />
              <button
                onClick={() => navigator.clipboard.writeText(participantLink)}
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default WebsiteTesting;
