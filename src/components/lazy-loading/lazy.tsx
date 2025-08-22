"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Lazy() {
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
      const timer = setTimeout(() => setIsHidden(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isVideoLoaded]);

  if (isHidden) return null;

  return (
    <div
      ref={ref}
      className={`absolute top-0 left-0 w-full h-full flex items-center justify-center z-20 transition-opacity duration-700 ${
        isHidden ? "opacity-0" : "opacity-100"
      }`}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        onLoadedData={() => setIsVideoLoaded(true)} 
      >
        <source src="/videos/lazy/lazybg.mp4" type="video/mp4" />
      </video>

      {isVisible && (
        <Image
          src="/nav-logo/faybe.png"
          alt="FAYBE Logo"
          width={700}
          height={700}
          className="transition-opacity duration-700 ease-in-out md:-ml-20 opacity-100 animate-beat"
        />
      )}
    </div>
  );
}
