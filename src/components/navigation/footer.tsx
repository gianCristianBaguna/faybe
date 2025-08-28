"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Image
              src="/nav-logo/faybe.png"
              alt="Faybe Logo"
              width={350}
              height={20}
              className="md:-mt-15 md:mb-4 md:-ml-7"
              priority
            />

            <p className="text-sm text-gray-400 leading-relaxed md:-mt-10">
              Exceptional experiences that bring your vision to life. Creating
              unforgettable moments through expert event planning and creative
              direction.
            </p>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <i className="fab fa-facebook hover:text-yellow-500"></i>
              </div>
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer">
                <i className="fab fa-instagram hover:text-yellow-500"></i>
              </div>
            </div>
          </motion.div>

          {/* Explore */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold">EXPLORE</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">
                Home
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                About
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Albums
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Services
              </li>
              <li className="hover:text-white transition-colors cursor-pointer">
                Testimonial
              </li>
            </ul>
          </motion.div>

          {/* Get In Touch */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold">GET IN TOUCH</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>Phone: (555) 123-4567</p>
              <p>Email: hello@faybe.com</p>
            </div>
          </motion.div>

          {/* Address */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold">LOCATION</h4>
            <div className="text-sm text-gray-400 leading-relaxed">
              <p>123 Event Street, Suite 100</p>
              <p>New York, NY 10001</p>
              <p>United States</p>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p>&copy; 2025 Wisdomous Solutions Co. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}
