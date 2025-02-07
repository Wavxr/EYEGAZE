import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <section
      className="bg-gray-100 dark:bg-gray-900 py-30 text-white"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left md:w-1/2"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            See What Captures Attention <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-500">Instantly</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            EYEGAZE provides AI-driven eye-tracking insights, helping businesses
            optimize designs, improve user engagement, and boost conversions
            with real-time heatmap analytics.
          </p>
          <div className="flex space-x-4 justify-center md:justify-start">
            {/* Primary Button */}
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-opacity-90 transition">
              Try for Free
            </button>
            {/* Secondary Button */}
            <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 mt-8 md:mt-0"
        >
          <img
            src="https://images.squarespace-cdn.com/content/v1/65d3a3b07502532ff3f37601/1710520563671-QE9E8F7P8HWIDBN3OQYP/BLOG_Heatmapping_Graphic1-Sequence.png"
            alt="Heatmap Mockup"
            className="w-full h-auto"
          />
        </motion.div>
      </div>
    </section>
  );
}