// src/components/Footer.jsx
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>About</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
            <li>Support</li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-4">Social Media</h3>
          <div className="flex space-x-4">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-4">Newsletter</h3>
          <form className="flex space-x-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-700 rounded-md"
            />
            <button className="px-4 py-2 bg-blue-600 rounded-md">Subscribe</button>
          </form>
        </div>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center mt-8 text-gray-500"
      >
        &copy; 2025 EYEGAZE. All rights reserved.
      </motion.p>
    </footer>
  );
}