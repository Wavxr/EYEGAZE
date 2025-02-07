import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function LandingPage() {
  const steps = [
    { title: "Upload", desc: "Upload your poster, website, or design.", icon: "📄" },
    { title: "Test", desc: "Users test the material using an online eye tracker.", icon: "👀" },
    { title: "Analyze", desc: "AI generates heatmaps and attention analytics.", icon: "📊" },
    { title: "Optimize", desc: "Get actionable insights on what's working and what needs improvement.", icon: "🎯" },
  ];

  const features = [
    { icon: "📊", title: "AI-Powered Heatmaps", desc: "Identify high and low attention zones." },
    { icon: "👥", title: "Real User Testing", desc: "Gather insights from actual viewers." },
    { icon: "📈", title: "Data-Driven Optimization", desc: "Receive actionable recommendations." },
    { icon: "🌐", title: "Cross-Platform Support", desc: "Analyze posters, websites, and marketing materials." },
  ];

  const useCases = [
    { icon: "🛒", title: "E-commerce Stores", desc: "Optimize product pages for conversions." },
    { icon: "📈", title: "Marketing Agencies", desc: "Enhance ad creatives and posters." },
    { icon: "🎨", title: "Web Designers", desc: "Improve UI/UX based on user focus." },
    { icon: "🎥", title: "Content Creators", desc: "Make thumbnails and banners more engaging." },
  ];

  const plans = [
    { name: "Free Plan", price: "$0", features: ["Limited sessions", "Basic analytics"] },
    { name: "Pro Plan", price: "$29", features: ["Unlimited tests", "Advanced analytics"] },
    { name: "Enterprise", price: "Custom", features: ["Custom solutions for agencies"] },
  ];

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

  const faqs = [
    { question: "How does eye tracking work?", answer: "Eye tracking uses AI to analyze where users focus their attention." },
    { question: "Is my data secure?", answer: "Yes, all data is encrypted and stored securely." },
    { question: "Can I integrate EYEGAZE with my website?", answer: "Yes, we provide APIs for seamless integration." },
  ];

  const FAQItem = ({ question, answer }) => {
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
  };

  return (
    <div className="scroll-smooth">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-30 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
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
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-opacity-90 transition">
                Try for Free
              </button>
              <button className="px-6 py-3 border border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-600 transition">
                Watch Demo
              </button>
            </div>
          </motion.div>
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

      {/* How It Works */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12"
          >
            How It Works
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="flex flex-col items-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mb-4 shadow-md">
                  <span className="text-2xl">{step.icon}</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400 text-center">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
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

      {/* Use Cases */}
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

      {/* Pricing Section */}
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

      {/* Testimonials */}
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

      {/* FAQ Section */}
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
                <Footer />
              </div>
            );
          }