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

  const faqs = [
    { question: "How does eye tracking work?", answer: "Eye tracking uses AI to analyze where users focus their attention." },
    { question: "Is my data secure?", answer: "Yes, all data is encrypted and stored securely." },
    { question: "Can I integrate EYEGAZE with my website?", answer: "Yes, we provide APIs for seamless integration." },
  ];

  return (
    <div className="scroll-smooth bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="min-h-screen py-20 relative overflow-hidden">
        {/* Background gradient circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 pt-40 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text"
            >
              Eye Tracking Analytics That{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
                Exceeds Expectations
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 mb-12"
            >
              Built with advanced AI for precise eye-tracking insights
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <button className="px-8 py-4 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition">
                Get started for free
              </button>
              <button className="px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition">
                Watch demo
              </button>
            </motion.div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 pt-20 md:grid-cols-3 gap-6 mt-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Real-time Analysis</h3>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
                <span className="text-4xl">👁️</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">AI-Powered Insights</h3>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-4">Smart Heatmaps</h3>
              <div className="aspect-video rounded-lg bg-gradient-to-br from-yellow-500/20 to-red-500/20 flex items-center justify-center">
                <span className="text-4xl">🎯</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white text-center mb-16"
          >
            Powerful Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-emerald-500/50 transition-colors"
              >
                <span className="text-4xl mb-4 block">{feature.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with updated styling */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white text-center mb-16"
          >
            FAQ
          </motion.h2>
          <div className="max-w-3xl mx-auto space-y-4">
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

// Update FAQItem component styling
const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 cursor-pointer hover:border-emerald-500/50 transition-colors"
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-white">{question}</h3>
        <span className="text-emerald-400">{isOpen ? "−" : "+"}</span>
      </div>
      {isOpen && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-4 text-gray-400"
        >
          {answer}
        </motion.p>
      )}
    </motion.div>
  );
};