import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Prescription = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(null);

  // Add this function to handle expanding/collapsing
  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const images = [
    '/images/heatmap.jpg',
    '/images/fixation_duration.jpg',
    '/images/saccadic_movement.jpg',
    '/images/first_fixation_duration.png'
  ];

  const prescriptions = [
    {
        title: "Increase the Visual Hierarchy of the CTA Button",
        issue: "The CTA button has a shorter first fixation duration (2.07s) compared to the header (11.51s) and main image (3.60s). This suggests users are not immediately drawn to it.",
        solutions: [
            "Make the CTA button larger and more prominent using a bolder font and a high-contrast color.",
            "Use a stronger visual cue, such as a shadow effect, subtle animation, or a pulsating glow.",
            "Ensure the CTA button does not blend into the background—contrast matters!"
        ]
    },
    {
        title: "Reposition the CTA Button for Better Visibility",
        issue: "Eye-tracking data shows users spend significant time on the header and main image, but the CTA button is not immediately within their gaze flow.",
        solutions: [
            "Move the CTA button higher, preferably next to or below the main image so that it falls naturally within the user's eye path.",
            "Consider placing a second CTA button in the hero section to reinforce the call-to-action.",
            "Ensure the CTA button is aligned with the Z-pattern reading flow (top-left to bottom-right movement)."
        ]
    },
    {
        title: "Improve CTA Button Microcopy for Clarity & Urgency",
        issue: "The current CTA text (\"Create a landing page\") is generic and may not evoke an immediate response.",
        solutions: [
            "Use action-oriented language that emphasizes a user benefit, such as 'Start Your Free Landing Page Now' or 'Launch Your Page in Minutes!'.",
            "Adding a supporting subtext like 'No coding required. Free forever!' can further encourage clicks."
        ]
    },
    {
        title: "Optimize CTA Placement in the Scroll Path",
        issue: "Users continue scrolling past the first CTA without engaging. This indicates the CTA might not be placed where they are ready to take action.",
        solutions: [
            "Repeat the CTA button at multiple touchpoints, such as below the 'How to create a landing page' section, at the end of the 'Convert marketing efforts' section, and near the FAQ section.",
            "Use sticky headers or floating buttons to keep the CTA visible as users scroll."
        ]
    },
    {
        title: "Reduce Cognitive Load with a Clearer Information Flow",
        issue: "The heatmap shows high fixation in text-heavy areas, meaning users might be processing too much information before deciding.",
        solutions: [
            "Simplify content above the fold (first screen users see).",
            "Use bullet points or icons instead of long paragraphs.",
            "Add a progress indicator (e.g., 'Step 1 of 3') if the CTA leads to a form—this reduces hesitation.",
            "Break text into scan-friendly sections, with bold subheadings to make key benefits clearer."
        ]
    }
];

  return (
    <div className="container mx-auto px-6 space-y-6">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text"
      >
        UI/UX Recommendations
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
          {prescriptions.map((prescription, index) => (
            <motion.div
              key={index}
              className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => toggleExpand(index)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/5 transition-colors"
              >
                <h2 className="text-lg font-semibold text-emerald-400">
                  {prescription.title}
                </h2>
                <motion.span
                  animate={{ rotate: expandedIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-emerald-400"
                >
                  ▼
                </motion.span>
              </button>
              
              <AnimatePresence>
                {expandedIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 border-t border-white/5">
                      <div className="mb-4">
                        <span className="text-emerald-400 font-semibold">Issue: </span>
                        <span className="text-gray-300">{prescription.issue}</span>
                      </div>
                      <div className="space-y-3">
                        <h3 className="font-semibold text-emerald-400">Solutions:</h3>
                        <ul className="space-y-2">
                          {prescription.solutions.map((solution, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-gray-300">
                              <span className="text-emerald-400 mt-1">•</span>
                              {solution}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Prescription;