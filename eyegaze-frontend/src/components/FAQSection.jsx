// src/components/FAQSection.jsx
import { useState } from "react";
import { motion } from "framer-motion";

export default function FAQSection() {
  const faqs = [
    { question: "How does eye tracking work?", answer: "Eye tracking uses AI to analyze where users focus their attention." },
    { question: "Is my data secure?", answer: "Yes, all data is encrypted and stored securely." },
    { question: "Can I integrate EYEGAZE with my website?", answer: "Yes, we provide APIs for seamless integration." },
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
          Frequently Asked Questions
        </motion.h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{question}</h3>
        <span>{isOpen ? "-" : "+"}</span>
      </div>
      {isOpen && <p className="mt-2 text-gray-600 dark:text-gray-400">{answer}</p>}
    </motion.div>
  );
}