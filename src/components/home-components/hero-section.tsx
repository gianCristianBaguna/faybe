// components/Hero.tsx
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Background Image */}
      <Image
        src="/hero-page-img/1.jpg"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="absolute inset-0 -z-10"
        priority
      />

      {/* Overlay (dark tint for readability) */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Content */}
      <div className="text-center px-6 md:px-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mt-100">
          <span className="text-[2rem]  bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-700 bg-clip-text text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.7)]">
            FAYBE
          </span>
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Build modern apps with speed and style. Start your journey with us
          today.
        </p>
      </div>
    </section>
  );
}
