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
    <div className="container mx-auto px-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text"
      >
        Eye Tracking Analysis
      </motion.h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-6"
        >
          <div className="relative rounded-xl overflow-hidden">
            {/* Navigation Arrows */}
            <div className="absolute top-4 left-0 right-0 flex justify-between px-4 z-10">
              <button
                onClick={() => setCurrentImage((prev) => (prev - 1 + images.length) % images.length)}
                className="p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 transition-all duration-300 text-white shadow-lg hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={() => setCurrentImage((prev) => (prev + 1) % images.length)}
                className="p-3 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/10 transition-all duration-300 text-white shadow-lg hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <motion.img
              src={images[currentImage]}
              alt={`Visualization ${currentImage + 1}`}
              className="w-full h-auto object-contain rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-3">
              {images.map((_, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 border border-white/20 shadow-lg ${
                    idx === currentImage 
                      ? 'bg-emerald-400 w-4 border-emerald-300' 
                      : 'bg-black/30 hover:bg-black/50 backdrop-blur-sm'
                  }`}
                  whileHover={{ scale: 1.2 }}
                />
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <motion.section 
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              📌 Fixation Analysis Summary
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>Total Fixations Duration: 9</li>
              <li>Average Duration: 3.60 seconds</li>
              <li>Longest Fixation: 11.51 seconds on "Header"</li>
              <li>Shortest Fixation: 0.45 seconds on "Text Section"</li>
            </ul>
          </motion.section>

          <motion.section 
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              📌 Saccadic Movements Analysis
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>Total Saccades: 8</li>
              <li>Average Saccade Length: 479 px</li>
              <li>Longest Saccade: 725 px (jumped from "Header" to "Main Image")</li>
              <li>Shortest Saccade: 242 px (between "CTA Button" and "Text Section")</li>
            </ul>
          </motion.section>

          <motion.section 
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              📌 First Fixation Duration Analysis
            </h2>
            <ul className="space-y-2 text-gray-300">
              <li>First Element Fixated: "Header"</li>
              <li>Duration: 11.51 seconds</li>
              <li>Second Most Fixated Element: "Main Image" (3.60 seconds)</li>
              <li>CTA Button First Fixation Duration: 2.07 seconds</li>
              <li>Least Fixated Element: "Text Section" (0.45 seconds)</li>
            </ul>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
};

export default Diagnostic;