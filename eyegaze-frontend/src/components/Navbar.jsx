import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-lg bg-gray-900/50 border-b border-white/10 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-xl font-bold">
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            EYEGAZE
          </span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-8 text-gray-300">
          <li className="hover:text-emerald-400 transition-colors cursor-pointer">Home</li>
          <li className="hover:text-emerald-400 transition-colors cursor-pointer">Features</li>
          <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pricing</li>
          <li className="hover:text-emerald-400 transition-colors cursor-pointer">Testimonials</li>
        </ul>

        {/* Call-to-Action Button */}
        <div className="hidden md:flex">
          <a
            href="/authenticate"
            className="px-6 py-2 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition"
          >
            Try EYEGAZE Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-white hover:text-emerald-400 transition-colors"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden backdrop-blur-lg bg-gray-900/50 border-b border-white/10"
        >
          <ul className="space-y-4 p-6 text-gray-300">
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Home</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Features</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Pricing</li>
            <li className="hover:text-emerald-400 transition-colors cursor-pointer">Testimonials</li>
          </ul>
          <div className="p-6 pt-0">
            <a
              href="/authenticate"
              className="w-full block px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg text-center hover:opacity-90 transition"
            >
              Try EYEGAZE Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}