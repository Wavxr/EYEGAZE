import React from "react";

const Overview = () => {
  // Example data for testing
  const data = {
    uploadedWebsite: {
      url: "https://example.com",
      screenshotUrl: "https://via.placeholder.com/300x200?text=Website+Screenshot",
      uploadedAt: "2023-10-01T12:00:00Z",
    },
    participantLink: "https://eyegaze.com/session/abc123",
    guideline: "Increase bookings and improve user navigation experience.",
    insights: [
      { title: "Attention Span", value: "45 seconds" },
      { title: "Hero Section Engagement", value: "60%" },
      { title: "CTA Button Visibility", value: "Low visibility" },
      { title: "Page Load Time", value: "3.2 seconds" },
      { title: "Bounce Rate", value: "47%" },
    ],
  };

  const placeholderImage =
    "https://via.placeholder.com/300x200?text=No+Image+Uploaded";

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Image + Participant Link */}
        <div className="col-span-1 bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center">
          <img
            src={data.uploadedWebsite?.screenshotUrl || placeholderImage}
            alt="Uploaded Website"
            className="w-full max-w-sm h-auto rounded-lg object-cover mb-6"
          />
          <div className="text-center">
            <h2 className="text-lg font-semibold">Participant Link</h2>
            <p className="text-sm text-gray-600">
              <a
                href={data.participantLink || "#"}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.participantLink || "No link available yet"}
              </a>
            </p>
          </div>
        </div>

        {/* Right Section: Guideline and Insights */}
        <div className="col-span-2 flex flex-col gap-8">
          {/* Guideline */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Guideline</h2>
            <p className="text-gray-600 text-sm">
              {data.guideline || "No guideline defined yet"}
            </p>
          </div>

          {/* Insights */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Insights</h2>
            <ul className="space-y-3">
              {data.insights && data.insights.length > 0 ? (
                data.insights.map((insight, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b last:border-b-0 pb-2"
                  >
                    <span className="font-medium text-gray-800">
                      {insight.title}
                    </span>
                    <span className="text-gray-600 text-sm">
                      {insight.value}
                    </span>
                  </li>
                ))
              ) : (
                <p className="text-gray-600">No insights available yet.</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
