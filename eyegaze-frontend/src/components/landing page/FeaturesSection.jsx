import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    { icon: "📊", title: "AI-Powered Heatmaps", desc: "Identify high and low attention zones." },
    { icon: "👥", title: "Real User Testing", desc: "Gather insights from actual viewers." },
    { icon: "📈", title: "Data-Driven Optimization", desc: "Receive actionable recommendations." },
    { icon: "🌐", title: "Cross-Platform Support", desc: "Analyze posters, websites, and marketing materials." },
  ];

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-800 dark:text-white mb-8"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center"
            >
              <span className="text-4xl mb-4">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}