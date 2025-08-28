"use client";

import { useState, useEffect } from "react";
import HeroSection from "@/components/home-components/hero-section";
import Lazy from "@/components/lazy-loading/lazy";
import FirstImage from "@/components/home-components/first-image";
import HorizontalScrollCarousel from "@/components/home-components/horizontal-sections";
import ThirdImage from "@/components/home-components/third-image";
import ServicesCarousel from "@/components/home-components/services-section";
import CallToAction from "@/components/home-components/call-section";
import Footer from "@/components/navigation/footer";

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
            <HorizontalScrollCarousel
              images={[
                "/hero-page-img/1.jpg",
                "/hero-page-img/2.jpg",
                "/hero-page-img/3.jpg",
                "/homescreen-second-img/4.jpg",
                "/homescreen-second-img/5.jpg",
              ]}
            />
            <ThirdImage />
            <ServicesCarousel />
            <CallToAction />
            <Footer />
          </>
        )}
      </div>

      {/* Loader overlay on top */}
      <Lazy />
    </main>
  );
}
