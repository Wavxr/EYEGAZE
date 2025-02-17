import { useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <div className="text-lg font-bold text-gray-800 dark:text-white">
          EYEGAZE
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex space-x-6 text-gray-700 dark:text-gray-300">
          <li>Home</li>
          <li>Features</li>
          <li>Pricing</li>
          <li>Testimonials</li>
        </ul>

        {/* Call-to-Action Button */}
        <div className="hidden md:flex">
          <a
            href="/authenticate"
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-md hover:shadow-lg transition-transform hover:scale-105"
          >
            Try EYEGAZE Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
        >
          <ChevronDownIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-white dark:bg-gray-800 p-4"
        >
          <ul className="space-y-2 text-gray-700 dark:text-gray-300">
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Testimonials</li>
          </ul>
          <div className="mt-4">
            <a
              href="/authenticate"
              className="w-full block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-md text-center hover:shadow-lg transition-transform hover:scale-105"
            >
              Try EYEGAZE Now
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}