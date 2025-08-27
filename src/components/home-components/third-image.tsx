"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// 🔹 Variants for LEFT container (image block)
const leftContainerVariants = {
  enter: {
    x: -300,
    y: -200,
    opacity: 0,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
  exit: {
    x: -300,
    y: 200,
    opacity: 0,
    transition: { duration: 0.7, ease: "easeIn" as const },
  },
};

// 🔹 Variants for RIGHT container (testimonial block)
const rightContainerVariants = {
  enter: {
    x: 300,
    y: 200,
    opacity: 0,
  },
  center: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
  exit: {
    x: 300,
    y: -200,
    opacity: 0,
    transition: { duration: 0.7, ease: "easeIn" as const },
  },
};


export default function WeddingReviews() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const review = reviews[currentIndex];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  return (
    <main
      id="wedding-reviews"
      className="relative min-h-screen w-full flex bg-black overflow-hidden margin-10 padding-10"
    >
      {/* 🔹 Background */}
      <div className="absolute inset-0 bg-[url('/bg-texture.svg')] bg-cover bg-center opacity-40 z-0" />
      <div className="absolute inset-0 bg-gray-900/60 z-0" />

      {/* 🔹 Content */}
      <div className="relative z-10 w-full h-full">
        {/* REVIEWS Heading */}
        <div className="absolute top-15 right-6">
          <h1 className="text-4xl bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)] tracking-wider">
            REVIEWS
          </h1>
        </div>

        {/* LEFT CONTAINER - Image */}
        <AnimatePresence mode="wait">
          <motion.div
            key={review.id + "-left"}
            className="absolute top-20 left-20 w-[700px] h-[350px] rounded-2xl shadow-2xl overflow-hidden bg-black"
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
        <div className="absolute top-[500px] left-20 w-[700px] flex flex-col items-center gap-4">
          <h2 className="text-3xl font-semibold tracking-wide text-white drop-shadow-md">
            {review.coupleNames}
          </h2>

          <div className="flex gap-6 mt-4">
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
            className="absolute top-30 right-20 w-[800px] h-[600px] bg-gray-200/70 rounded-2xl shadow-2xl p-10 flex flex-col justify-between"
            variants={rightContainerVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <p className="text-lg italic text-gray-800">
              “{review.testimonial}”
            </p>
            <span className="text-right font-semibold text-gray-900 mt-8">
              — {review.signature}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
