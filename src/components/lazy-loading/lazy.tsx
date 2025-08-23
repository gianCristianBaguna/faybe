"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function WeddingLazy() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVideoLoaded) {
      const timer = setTimeout(() => setIsHidden(true), 4500); // slower fade
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  if (isHidden) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center z-50 transition-opacity duration-1000 ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Wedding Background Video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        onLoadedData={() => setIsVideoLoaded(true)}
      >
        <source src="/videos/lazy/lazybg1.mp4" type="video/mp4" />
      </video>

      {/* Elegant Overlay */}
      {isVisible && (
        <div className="flex flex-col items-center space-y-6">
          {/* Couple Logo or Wedding Title */}
          <Image
            src="/nav-logo/faybe.png"
            alt="Wedding Logo"
            width={500}
            height={500}
            className="transition-opacity duration-1000 ease-in-out opacity-100 animate-pulse drop-shadow-lg"
          />
          <p className="text-lg md:text-2xl text-white/90 italic animate-fade-in delay-500">
            Your Forever Begins Here
          </p>
        </div>
      )}
    </div>
  );
}
