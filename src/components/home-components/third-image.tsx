"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface Review {
  id: number;
  coupleNames: string;
  image: string;
  testimonial: string;
  signature: string;
}

const reviews: Review[] = [
  {
    id: 1,
    coupleNames: "KRYSTAL & ALVIN",
    image: "/hero-page-img/1.jpg",
    testimonial:
      "A wedding is a beautiful story, and every love deserves to be told in the most magical way possible. Thank you for making ours unforgettable.",
    signature: "With Love, Krystal & Alvin",
  },
  {
    id: 2,
    coupleNames: "MARIA & JUAN",
    image: "/hero-page-img/2.jpg",
    testimonial:
      "From the first consultation to the last dance, everything was seamless. Our wedding looked straight out of a dream.",
    signature: "Forever Grateful, Maria & Juan",
  },
  {
    id: 3,
    coupleNames: "ANNA & LEO",
    image: "/hero-page-img/3.jpg",
    testimonial:
      "We couldn’t have asked for a more perfect day. Every detail was beautifully crafted, and the memories will last a lifetime.",
    signature: "Always, Anna & Leo",
  },
];

// 🔹 Variants for next/prev transitions
const leftContainerVariants = {
  enter: { x: -300, y: -200, opacity: 0 },
  center: { x: 0, y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
  exit: { x: -300, y: 200, opacity: 0, transition: { duration: 0.7, ease: "easeIn" as const } },
};

const rightContainerVariants = {
  enter: { x: 300, y: 200, opacity: 0 },
  center: { x: 0, y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
  exit: { x: 300, y: -200, opacity: 0, transition: { duration: 0.7, ease: "easeIn" as const } },
};

// 🔹 Variants for content in/out view
const contentVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" as const } },
  exit: { opacity: 0, y: 50, transition: { duration: 0.8, ease: "easeIn" as const } },
};

export default function WeddingReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inView, setInView] = useState(false);
  const review = reviews[currentIndex];

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () => setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <div className="relative min-h-screen w-full flex overflow-hidden">
      {/* 🔹 Background Image (static) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/homescreen-second-img/15.avif"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      {/* 🔹 Animated Content */}
      <motion.div
        className="relative z-10 w-full h-full"
        variants={contentVariants}
        initial="hidden"
        animate={inView ? "visible" : "exit"}
        onViewportEnter={() => setInView(true)}
        onViewportLeave={() => setInView(false)}
        viewport={{ amount: 0.5 }}
      >
        {/* REVIEWS Heading */}
        <div className="absolute top-16 left-1/2 transform -translate-x-1/2 sm:top-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-md tracking-wider">
            REVIEWS
          </h1>
        </div>

        {/* LEFT CONTAINER - Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id + "-left"}
            className="absolute top-28 left-1/2 transform -translate-x-1/2 sm:left-20 sm:translate-x-0 w-[90%] sm:w-[700px] h-[250px] sm:h-[400px] rounded-2xl shadow-2xl overflow-hidden bg-black"
            variants={leftContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <img
              src={review.image || "/placeholder.svg"}
              alt={`Wedding photo of ${review.coupleNames}`}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Names + Navigation */}
        <div className="absolute top-[320px] sm:top-[600px] left-1/2 transform -translate-x-1/2 sm:left-20 sm:translate-x-0 w-[90%] sm:w-[700px] flex flex-col items-center sm:items-start gap-4">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide text-white drop-shadow-md text-center sm:text-left">
            {review.coupleNames}
          </h2>

          <div className="flex gap-6 mt-4 justify-center sm:justify-start">
            <button onClick={prevReview} className="shadow-lg transition">
              <ChevronLeft className="text-white hover:text-yellow-600" size={24} />
            </button>
            <button onClick={nextReview} className="shadow-lg transition">
              <ChevronRight className="text-white hover:text-yellow-600" size={24} />
            </button>
          </div>
        </div>

        {/* RIGHT CONTAINER - Testimonial */}
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id + "-right"}
            className="absolute top-[600px] sm:top-30 right-1/2 transform -translate-x-1/2 sm:right-20 sm:translate-x-0 w-[90%] sm:w-[800px] h-[300px] sm:h-[500px] bg-gray-200/70 rounded-2xl shadow-2xl p-6 sm:p-10 flex flex-col justify-between"
            variants={rightContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="text-base sm:text-lg italic text-gray-800">
              “{review.testimonial}”
            </p>
            <span className="text-right font-semibold text-gray-900 mt-4 sm:mt-8">
              — {review.signature}
            </span>
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
