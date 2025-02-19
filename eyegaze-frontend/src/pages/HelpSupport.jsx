import React, { useState } from 'react';
import { motion } from 'framer-motion';

const HelpSupport = () => {
  const faqs = [
    {
      question: "How does the eye tracking technology work?",
      answer: "EYEGAZE uses your device's webcam and advanced AI algorithms to track eye movements in real-time. The system calibrates to your eyes before each session to ensure accuracy. No special hardware is required beyond a standard webcam."
    },
    {
      question: "What are the minimum system requirements?",
      answer: "You need a device with a webcam, modern browser (Chrome, Firefox, or Edge), and stable internet connection. For optimal performance, we recommend good lighting conditions and a screen resolution of at least 1280x720."
    },
    {
      question: "How accurate is the eye tracking?",
      answer: "Our system achieves an average accuracy of 1-2 degrees visual angle, which is sufficient for most website testing scenarios. Accuracy can be affected by lighting conditions, webcam quality, and user calibration."
    },
    {
      question: "Can I export the test results?",
      answer: "Yes, you can export test results in various formats including PDF reports, CSV data, and heatmap images. These can be accessed from your dashboard under each test session."
    },
    {
      question: "Is my data secure?",
      answer: "We take data security seriously. All eye-tracking data is encrypted, and we don't store any personal information beyond what's necessary for the service. Test sessions are private by default."
    }
  ];

  const resources = [
    {
      title: "Quick Start Guide",
      description: "Learn the basics of creating and running eye-tracking tests",
      icon: "📚"
    },
    {
      title: "Best Practices",
      description: "Tips for getting the most accurate results",
      icon: "✨"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="lg:col-span-2 backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Help & Support</h2>
        <p className="text-gray-400">
          Find answers to common questions and learn how to get the most out of EYEGAZE.
        </p>
      </motion.div>

      {/* Resources Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6"
      >
        {resources.map((resource, index) => (
          <div
            key={index}
            className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-6 hover:border-emerald-400/50 transition-colors cursor-pointer"
          >
            <span className="text-4xl mb-4 block">{resource.icon}</span>
            <h3 className="text-lg font-semibold text-white mb-2">{resource.title}</h3>
            <p className="text-gray-400 text-sm">{resource.description}</p>
          </div>
        ))}
      </motion.div>

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h3>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </motion.div>

      {/* Contact Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-2xl p-8"
      >
        <h3 className="text-xl font-semibold text-white mb-4">Still Need Help?</h3>
        <p className="text-gray-400 mb-6">
          Our support team is available 24/7 to help you with any questions or issues.
        </p>
        <button className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-xl hover:opacity-90 transition">
          Contact Support
        </button>
      </motion.div>
    </div>
  );
};

// FAQ Item Component
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden hover:border-emerald-400/50 transition-colors"
    >
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-white">{question}</span>
        <span className={`text-emerald-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      {isOpen && (
        <div className="px-6 pb-4 text-gray-400">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
};

export default HelpSupport;