"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";


export default function HeroSection() {
  const videos = ["/videos/hero-home/2.mp4"];
  const [current, setCurrent] = useState(0);
  const nextSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [videos.length]);

  const handleScrollDown = () => {
    const el = document.getElementById("next-section");
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-end overflow-hidden snap-start">
        {videos.map((src, index) => (
          <video
            key={index}
            autoPlay
            muted
            loop
            playsInline
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              index === current ? "opacity-100" : "opacity-0"
            }`}
          >
            <source src={src} type="video/mp4" />
          </video>
        ))}

        <div className="absolute inset-0 bg-black/50" />

        <motion.div
          initial={{ opacity: 0, x: 100 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, ease: "easeOut" }} 
          className="text-right px-6 md:px-12 relative z-10 max-w-xl mr-10 md:mr-20 md:mt-120"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            <span className="text-[2rem] bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
              FAYBE
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Build modern apps with speed and style. Start your journey with us
            today.
          </p>

          <div className="flex justify-end space-x-6 text-white text-2xl">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-facebook hover:text-yellow-500"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter hover:text-yellow-500"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-instagram hover:text-yellow-500"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-linkedin hover:text-yellow-500"></i>
            </a>
          </div>
        </motion.div>

        {/* Scroll Down Arrow */}
        <button
          onClick={handleScrollDown}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-8 h-8 border-b-2 border-r-2 border-white rotate-45 animate-bounce"></div>
        </button>
      </section>
    </>
  );
}
