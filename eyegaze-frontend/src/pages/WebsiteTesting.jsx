import React, { useState } from "react";
import { db } from "../config/firebase";
import { collection, addDoc } from "firebase/firestore";

function WebsiteTesting() {
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    guideline: "",
    image: null,
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataRef = collection(db, "websiteTestingForms");
      const docRef = await addDoc(dataRef, {
        title: formData.title,
        url: formData.url,
        guideline: formData.guideline,
        timestamp: new Date(),
      });

      if (formData.image) {
        const storageRef = firebase.storage().ref();
        const imageRef = storageRef.child(`images/${docRef.id}`);
        await imageRef.put(formData.image);
        console.log("Image uploaded successfully");
      }

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-blue-600">EYEGAZE Website Testing</h1>
        <p className="text-lg text-gray-600 mt-2">Optimize your website with actionable insights</p>
      </header>
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block text-lg font-medium mb-2 text-gray-700">
              Website Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter website title"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="url" className="block text-lg font-medium mb-2 text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              id="url"
              value={formData.url}
              onChange={handleInputChange}
              placeholder="Enter website URL"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="guideline" className="block text-lg font-medium mb-2 text-gray-700">
              Testing Guideline
            </label>
            <textarea
              id="guideline"
              value={formData.guideline}
              onChange={handleInputChange}
              rows="4"
              placeholder="e.g., Improve CTA clicks"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>
          <div className="container flex flex-col items-center gap-3 p-4 border-2 border-dashed rounded-md border-blue-500 bg-blue-50">
            <p className="text-sm text-center text-gray-500">Browse file to upload!</p>
            <label htmlFor="image" className="w-full flex justify-between items-center gap-2 p-2 rounded-md cursor-pointer border border-blue-300 bg-blue-100">
              <p className="flex-grow text-gray-700">{formData.image ? formData.image.name : "No file selected"}</p>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-6 bg-blue-600 rounded-lg text-lg font-semibold text-white hover:bg-blue-700 transition-colors"
          >
            Generate Participant Link
          </button>
        </form>
      </div>
    </div>
  );
}

export default WebsiteTesting;
