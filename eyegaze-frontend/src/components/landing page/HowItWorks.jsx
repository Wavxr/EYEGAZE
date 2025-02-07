import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    {
      title: "Upload",
      desc: "Upload your poster, website, or design.",
      icon: "📄", // You can replace this with an SVG or icon library
    },
    {
      title: "Test",
      desc: "Users test the material using an online eye tracker.",
      icon: "👀",
    },
    {
      title: "Analyze",
      desc: "AI generates heatmaps and attention analytics.",
      icon: "📊",
    },
    {
      title: "Optimize",
      desc: "Get actionable insights on what’s working and what needs improvement.",
      icon: "🎯",
    },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12"
        >
          How It Works
        </motion.h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Icon */}
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 shadow-md">
                <span className="text-2xl">{step.icon}</span>
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}