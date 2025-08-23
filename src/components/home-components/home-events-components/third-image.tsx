"use client";

interface FirstImageProps {
  image: string;
  nextSectionId: string;
}

export default function ThirdImage({ image, nextSectionId }: FirstImageProps) {
  return (
    <main
      className="relative flex min-h-screen flex-col items-center bg-cover bg-center snap-start"
      style={{ backgroundImage: `url(${image})` }} id="third-image"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <section className="relative z-10 mt-40">
        <div className="max-w-2xl text-center p-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Making your aspirations possible.
          </h1>
          <p className="text-lg text-gray-200 mb-6">
            A Decade of Love Stories — Crafting Beautiful Beginnings from ‘Yes’
            to ‘I DO’
          </p>
        </div>
      </section>

      {/* Scroll Down Button */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a
          href={`#${nextSectionId}`}
          className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-white text-white hover:bg-white hover:text-black transition"
        >
          ↓
        </a>
      </div>
    </main>
  );
}
