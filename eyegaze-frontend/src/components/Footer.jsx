import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 backdrop-blur-lg bg-gray-900/50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 py-16 grid grid-cols-1 md:grid-cols-3 gap-12"
      >
        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Quick Links
          </h3>
          <ul className="space-y-3">
            {["About", "Features", "Pricing", "Blog", "Support"].map((item) => (
              <li key={item} className="text-gray-400 hover:text-emerald-400 transition-colors cursor-pointer">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Social Media
          </h3>
          <div className="flex space-x-6">
            {["Facebook", "Twitter", "LinkedIn"].map((platform) => (
              <a
                key={platform}
                href="#"
                className="text-gray-400 hover:text-emerald-400 transition-colors"
              >
                {platform}
              </a>
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-bold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
            Newsletter
          </h3>
          <form className="flex flex-col space-y-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:border-emerald-400/50"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-emerald-400 to-cyan-400 text-black font-semibold rounded-lg hover:opacity-90 transition">
              Subscribe
            </button>
          </form>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="border-t border-white/10"
      >
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-500">
            &copy; 2025 EYEGAZE. All rights reserved.
          </p>
        </div>
      </motion.div>
    </footer>
  );
}