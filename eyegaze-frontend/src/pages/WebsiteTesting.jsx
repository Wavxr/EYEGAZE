import React from 'react';

function WebsiteTesting() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col items-center p-6">
      {/* Website Title */}
      <header className="w-full max-w-4xl text-center py-6">
        <h1 className="text-4xl font-bold text-blue-600">EYEGAZE Website Testing</h1>
        <p className="text-lg text-gray-600 mt-2">Optimize your website with actionable insights</p>
      </header>

      {/* Form Section */}
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <form className="space-y-6">
          <div>
            <label htmlFor="website-title" className="block text-lg font-medium mb-2 text-gray-700">
              Website Title
            </label>
            <input
              type="text"
              id="website-title"
              placeholder="Enter website title"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label htmlFor="website-url" className="block text-lg font-medium mb-2 text-gray-700">
              Website URL
            </label>
            <input
              type="url"
              id="website-url"
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
              rows="4"
              placeholder="e.g., Improve CTA clicks"
              className="w-full p-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            ></textarea>
          </div>

          {/* Optional Image Upload */}
          <div className="container flex flex-col items-center gap-3 p-4 border-2 border-dashed rounded-md border-blue-500 bg-blue-50">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 text-blue-500"
            >
              <path
                d="M7 10V9C7 6.23858 9.23858 4 12 4C14.7614 4 17 6.23858 17 9V10C19.2091 10 21 11.7909 21 14C21 15.4806 20.1956 16.8084 19 17.5M7 10C4.79086 10 3 11.7909 3 14C3 15.4806 3.8044 16.8084 5 17.5M7 10C7.43285 10 7.84965 10.0688 8.24006 10.1959M12 12V21M12 12L15 15M12 12L9 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
            <p className="text-sm text-center text-gray-500">Browse file to upload!</p>
            <label
              htmlFor="file"
              className="w-full flex justify-between items-center gap-2 p-2 rounded-md cursor-pointer border border-blue-300 bg-blue-100"
            >
              <p className="flex-grow text-gray-700">No file selected</p>
              <input
                id="file"
                type="file"
                accept="image/*"
                className="hidden"
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

        <p className="text-center text-gray-400 text-sm mt-6">
          Your uploaded content will only be used for testing purposes.
        </p>
      </div>
    </div>
  );
}

export default WebsiteTesting;
