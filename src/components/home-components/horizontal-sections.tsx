"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Link from "next/link";

interface CarouselProps {
  images?: string[];
}

export default function HorizontalScrollCarousel({
  images = [],
}: CarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : [
          "/majestic-mountain-vista.png",
          "/ocean-sunset.png",
          "/forest-path.png",
          "/vibrant-city-skyline.png",
        ];

  // Carousel visibility observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsInViewport(entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsCarouselActive(true);
        } else {
          setIsCarouselActive(false);
          setCurrentIndex(0);
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);

  // Horizontal scroll via wheel
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (!isCarouselActive || !isInViewport) return;
      if (e.deltaY > 0 && currentIndex < displayImages.length - 1) {
        e.preventDefault();
        setCurrentIndex((prev) => prev + 1);
      } else if (e.deltaY < 0 && currentIndex > 0) {
        e.preventDefault();
        setCurrentIndex((prev) => prev - 1);
      }
    };

    if (isCarouselActive && isInViewport) {
      window.addEventListener("wheel", handleScroll, { passive: false });
    }

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [currentIndex, displayImages.length, isCarouselActive, isInViewport]);

  // Scroll Wave Bar
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
  });

  const totalSegments = 50;
  const segments = Array.from({ length: totalSegments }, (_, i) =>
    i % 2 === 0 ? 6 : 3
  );

  // Create a stable useTransform array outside map
  const segmentScales = segments.map(() =>
    useTransform(smoothScroll, [0, 1], [0.5, 1.5])
  );

  return (
    <div className="relative w-full">
      {/* Horizontal Carousel */}
      <div
        ref={containerRef}
        className="relative w-full h-[50vh] overflow-hidden bg-gray-900 mt-3"
      >
        <motion.div
          className="flex h-full will-change-transform"
          animate={{
            x: -currentIndex * window.innerWidth,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 30,
            duration: 1.5,
          }}
        >
          {displayImages.map((img, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-screen h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${img})` }}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{
                scale: index === currentIndex ? 1 : 1.1,
                opacity: index === currentIndex ? 1 : 0.8,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70"></div>

              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
                <motion.h2
                  className="text-3xl md:text-4xl font-bold text-white mb-2"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 50,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  Slide {index + 1}
                </motion.h2>

                <motion.p
                  className="text-sm md:text-lg text-white/80 mb-4 max-w-xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 30,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  Discover amazing content as you scroll through this horizontal
                  carousel
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 20,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  <Link
                    href="/gallery"
                    className="inline-block px-6 py-2 bg-transparent text-white rounded-lg shadow-lg transition-all duration-300 hover:bg-white/10 border border-white hover:border-yellow-400 hover:scale-105 text-sm"
                  >
                    View Albums
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {displayImages.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-white scale-125" : "bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/60 text-xs text-center">
          {currentIndex < displayImages.length - 1 ? (
            <span>Scroll to explore images →</span>
          ) : (
            <span>Continue scrolling down ↓</span>
          )}
        </div>
      </div>
    </div>
  );
}
