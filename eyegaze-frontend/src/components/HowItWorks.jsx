// src/components/HowItWorks.jsx
import { motion } from "framer-motion";

export default function HowItWorks() {
  const steps = [
    { title: "Upload", desc: "Upload your poster, website, or design." },
    { title: "Test", desc: "Users test the material using an online eye tracker." },
    { title: "Analyze", desc: "AI generates heatmaps and attention analytics." },
    { title: "Optimize", desc: "Get actionable insights on what’s working and what needs improvement." },
  ];

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8"
        >
          How It Works
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4">
                {index + 1}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}