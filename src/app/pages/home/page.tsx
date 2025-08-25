"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home-components/hero-section";
import Lazy from "@/components/lazy-loading/lazy";
import FirstImage from "@/components/home-components/first-image";
import SecondImage from "@/components/home-components/second-image";
import ThirdImage from "@/components/home-components/third-image";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setFadeOut(true), 3500);
    const timer2 = setTimeout(() => setLoading(false), 4000);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll scroll-smooth">
      {loading ? (
        <div
          className={`flex items-center justify-center h-screen w-screen bg-black fixed inset-0 z-50 transition-opacity duration-700 ${
            fadeOut ? "opacity-0" : "opacity-100"
          }`}
        >
          <Lazy />
        </div>
      ) : (
        <>
          <HeroSection />
          <FirstImage nextSectionId="second-image"/>
          <SecondImage image="/hero-page-img/2.jpg" nextSectionId="third-image"/>
          <ThirdImage nextSectionId="" />
        </>
      )}
    </main>
  );
}
