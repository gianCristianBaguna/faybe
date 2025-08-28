"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="relative min-h-1/2 flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100">
      <div className="absolute inset-0 bg-[url('/homescreen-second-img/14.png')] bg-cover bg-center opacity-90"></div>

      <div className="relative z-10 text-center px-6 py-20 max-w-4xl mx-auto">
        <motion.h2
          className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 text-balance"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          GET IN TOUCH
        </motion.h2>

        <motion.p
          className="text-xl md:text-2xl text-gray-700 mb-12 text-pretty"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          We can't wait to hear from you
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="bg-gray-900 text-white hover:bg-gray-800 px-8 py-4 text-lg font-medium">
            START PLANNING
          </button>

          <button className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-8 py-4 text-lg font-medium bg-transparent">
            LEARN MORE
          </button>
        </motion.div>
      </div>
    </section>
  );
}
