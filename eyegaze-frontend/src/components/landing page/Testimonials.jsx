import { motion } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      name: "John Doe",
      business: "E-commerce Store Owner",
      quote: "EYEGAZE helped me optimize my product pages and boost sales by 20%.",
      image: "https://via.placeholder.com/50",
    },
    {
      name: "Jane Smith",
      business: "Marketing Agency",
      quote: "The heatmap insights were invaluable for improving our ad campaigns.",
      image: "https://via.placeholder.com/50",
    },
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
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="flex flex-col items-center p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mb-4"
              />
              <p className="text-gray-600 dark:text-gray-400 italic mb-4">
                "{testimonial.quote}"
              </p>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                {testimonial.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {testimonial.business}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}