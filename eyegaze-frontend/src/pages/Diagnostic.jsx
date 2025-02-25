import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Diagnostic = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const images = [
    '/images/heatmap.jpg',
    '/images/saccadic_movement.jpg',
    '/images/fixation_duration.jpg',
    '/images/first_fixation_duration.png'
  ];

  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left side - Visualizations */}
      <div className="w-1/2 p-6">
        <div className="relative h-full rounded-xl overflow-hidden bg-gray-800">
          <img
            src={images[currentImage]}
            alt={`Visualization ${currentImage + 1}`}
            className="w-full h-full object-contain"
          />
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-3 h-3 rounded-full ${
                  idx === currentImage ? 'bg-blue-500' : 'bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Right side - Analysis */}
      <div className="w-1/2 p-6 overflow-y-auto">
        <div className="bg-gray-800 rounded-xl p-8 text-white">
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">📌 Fixation Analysis Summary</h2>
            <ul className="space-y-2 text-gray-300">
              <li>Total Fixations Duration: 9</li>
              <li>Average Duration: 3.60 seconds</li>
              <li>Longest Fixation: 11.51 seconds on "Header"</li>
              <li>Shortest Fixation: 0.45 seconds on "Text Section"</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">📌 Saccadic Movements Analysis</h2>
            <ul className="space-y-2 text-gray-300">
              <li>Total Saccades: 8</li>
              <li>Average Saccade Length: 479 px</li>
              <li>Longest Saccade: 725 px (jumped from "Header" to "Main Image")</li>
              <li>Shortest Saccade: 242 px (between "CTA Button" and "Text Section")</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 text-blue-400">📌 First Fixation Duration Analysis</h2>
            <ul className="space-y-2 text-gray-300">
              <li>First Element Fixated: "Header"</li>
              <li>Duration: 11.51 seconds</li>
              <li>Second Most Fixated Element: "Main Image" (3.60 seconds)</li>
              <li>CTA Button First Fixation Duration: 2.07 seconds</li>
              <li>Least Fixated Element: "Text Section" (0.45 seconds)</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Diagnostic;