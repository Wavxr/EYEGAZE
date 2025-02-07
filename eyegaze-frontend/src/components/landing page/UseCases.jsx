import { motion } from "framer-motion";

export default function UseCases() {
  const useCases = [
    { icon: "🛒", title: "E-commerce Stores", desc: "Optimize product pages for conversions." },
    { icon: "📈", title: "Marketing Agencies", desc: "Enhance ad creatives and posters." },
    { icon: "🎨", title: "Web Designers", desc: "Improve UI/UX based on user focus." },
    { icon: "🎥", title: "Content Creators", desc: "Make thumbnails and banners more engaging." },
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
          Who Is It For?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
            >
              <span className="text-4xl mb-4">{useCase.icon}</span>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                {useCase.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{useCase.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}