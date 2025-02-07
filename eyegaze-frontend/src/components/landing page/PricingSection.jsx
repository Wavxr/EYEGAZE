import { motion } from "framer-motion";

export default function PricingSection() {
  const plans = [
    { name: "Free Plan", price: "$0", features: ["Limited sessions", "Basic analytics"] },
    { name: "Pro Plan", price: "$29", features: ["Unlimited tests", "Advanced analytics"] },
    { name: "Enterprise", price: "Custom", features: ["Custom solutions for agencies"] },
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
          Pricing Plans
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
            >
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                {plan.name}
              </h3>
              <p className="text-4xl font-bold text-blue-600 mb-6">{plan.price}</p>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                {plan.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}