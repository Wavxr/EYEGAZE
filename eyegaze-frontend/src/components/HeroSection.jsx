// src/components/HeroSection.jsx
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section className="bg-gray-100 dark:bg-gray-900 py-20">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            See What Captures Attention Instantly
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            EYEGAZE provides AI-driven eye-tracking insights, helping businesses
            optimize designs, improve user engagement, and boost conversions
            with real-time heatmap analytics.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Try for Free
            </button>
            <button className="px-6 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/65d3a3b07502532ff3f37601/1710520563671-QE9E8F7P8HWIDBN3OQYP/BLOG_Heatmapping_Graphic1-Sequence.png"
            alt="Heatmap Mockup"
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}