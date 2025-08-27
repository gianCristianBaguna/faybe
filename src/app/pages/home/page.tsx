"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home-components/hero-section";
import Lazy from "@/components/lazy-loading/lazy";
import FirstImage from "@/components/home-components/first-image";
import SecondImage from "@/components/home-components/second-image";
import ThirdImage from "@/components/home-components/third-image";

export default function HomePage() {
  const [showHero, setShowHero] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHero(true);
    }, 3500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="h-screen w-full overflow-y-scroll scroll-smooth relative">
      <div className="relative z-0">
        {showHero && (
          <>
            <HeroSection />
            <FirstImage nextSectionId="nextsectionId" />
            <SecondImage
              image="/hero-page-img/2.jpg"
              nextSectionId="third-image"
            />
            <ThirdImage />
          </>
        )}
      </div>

      {/* Loader overlay on top */}
      <Lazy />
    </main>
  );
}
