"use client";

import Link from "next/link";

interface FirstImageProps {
  image: string;
  nextSectionId: string;
}

export default function SecondImage({ image, nextSectionId }: FirstImageProps) {
  return (
    <main
      className="relative flex flex-col items-center justify-center w-full min-h-[60vh] sm:min-h-screen bg-cover bg-center bg-no-repeat bg-gray-800"
      style={{ backgroundImage: `url(${image})` }}
      id="second-image"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <section className="relative z-10 text-center px-6">

        {/* View Albums Button */}
        <Link
          href="/gallery"
          className="inline-block px-8 py-3 bg-transparent text-white rounded-lg shadow-lg transition hover:bg-transparent/70 border border-white hover:border-yellow-400"
        >
          View Albums
        </Link>
      </section>
    </main>
  );
}
