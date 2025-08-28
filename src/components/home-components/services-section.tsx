"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Service {
  title: string;
  description: string;
  image: string;
  features: string[];
}

interface ServicesCarouselProps {
  services?: Service[];
}

export default function ServicesCarousel({
  services = [],
}: ServicesCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInViewport, setIsInViewport] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  const defaultServices: Service[] = [
    {
      title: "Wedding Planning",
      description:
        "Complete wedding planning services from concept to execution",
      image: "/homescreen-second-img/10.jpg",
      features: [
        "Venue Selection",
        "Vendor Coordination",
        "Timeline Management",
        "Day-of Coordination",
      ],
    },
    {
      title: "Corporate Events",
      description: "Professional corporate event planning and management",
      image: "/homescreen-second-img/11.jpg",
      features: [
        "Conference Planning",
        "Team Building",
        "Product Launches",
        "Executive Retreats",
      ],
    },
    {
      title: "Social Celebrations",
      description: "Memorable celebrations for life's special moments",
     image: "/homescreen-second-img/9.jpg",
      features: [
        "Birthday Parties",
        "Anniversaries",
        "Graduations",
        "Holiday Events",
      ],
    },
    {
      title: "Luxury Experiences",
      description: "Exclusive luxury event experiences tailored to perfection",
      image: "/homescreen-second-img/12.jpg",
      features: [
        "VIP Events",
        "Destination Planning",
        "Concierge Services",
        "Custom Experiences",
      ],
    },
  ];

  const displayServices = services.length > 0 ? services : defaultServices;

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
      { threshold: 0.3 }
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
      if (e.deltaY > 0 && currentIndex < displayServices.length - 1) {
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
  }, [currentIndex, displayServices.length, isCarouselActive, isInViewport]);

  return (
    <div className="relative w-full">
      {/* Services Header */}
      <div className="text-center py-16 bg-background">
        <motion.h1
          className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-wider"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          SERVICES
        </motion.h1>
        <motion.p
          className="text-lg text-muted-foreground max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Discover our comprehensive range of event planning and management
          services
        </motion.p>
      </div>

      {/* Horizontal Services Carousel */}
      <div
        ref={containerRef}
        className="relative w-full min-h-screen overflow-hidden bg-gray-900"
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
          {displayServices.map((service, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0 w-screen min-h-screen bg-cover bg-center relative"
              style={{ backgroundImage: `url(${service.image})` }}
              initial={{ scale: 1.1, opacity: 0.8 }}
              animate={{
                scale: index === currentIndex ? 1 : 1.1,
                opacity: index === currentIndex ? 1 : 0.8,
              }}
              transition={{ duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80"></div>

              <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-6 py-20">
                <motion.h2
                  className="text-4xl md:text-6xl font-bold text-white mb-6"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 50,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  {service.title}
                </motion.h2>

                <motion.p
                  className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 30,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                >
                  {service.description}
                </motion.p>

                <motion.div
                  className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 max-w-4xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 20,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                >
                  {service.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="bg-white/10 backdrop-blur-sm rounded-lg p-4"
                    >
                      <span className="text-white font-medium">{feature}</span>
                    </div>
                  ))}
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: index === currentIndex ? 0 : 20,
                    opacity: index === currentIndex ? 1 : 0,
                  }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                >
                  <button className="bg-transparent text-white border-white hover:bg-white hover:text-black transition-all duration-300">
                    CONTACT US
                  </button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {displayServices.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
          {currentIndex < displayServices.length - 1 ? (
            <span>Scroll to explore services →</span>
          ) : (
            <span>Continue scrolling down ↓</span>
          )}
        </div>
      </div>
    </div>
  );
}
