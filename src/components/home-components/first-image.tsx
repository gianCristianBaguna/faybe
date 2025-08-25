"use client";

import Link from "next/link";

interface FirstImageProps {
  nextSectionId: string;
}

export default function FirstImage({ nextSectionId }: FirstImageProps) {
  return (
    <main className="relative min-h-screen bg-black" id="next-section">
      {/* Header Section */}
      <div className="text-center py-12 px-4">
        <h1
          className="text-3xl md:text-4xl font-extrabold mb-4 
               text-transparent 
               bg-clip-text bg-gradient-to-r from-gray-300 to-gray-400
               drop-shadow-[3px_4px_0_#CA8A04]"
        >
          Making Your Aspirations Possible
        </h1>

        <p className="text-lg text-white italic tracking-wide max-w-3xl mx-auto leading-relaxed">
          A Decade of Love Stories — Crafting Beautiful Beginnings from 'Yes' to
          'I DO'
        </p>
      </div>

      {/* Photo Grid - Full Width */}
      <div className="w-full pb-20 p-20 md:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {/* Bottom row - 3 images */}
          {/* Large bottom image spanning 2 columns */}
          <div className="col-span-2 aspect-[2/1]">
            <Link href="/gallery/details" className="block w-full h-full group">
              <img
                src="/hero-page-img/1.jpg"
                alt="Wedding rings"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>{" "}
          <div className="col-span-1 aspect-square">
            <Link href="/gallery/indoor" className="block w-full h-full group">
              <img
                src="/hero-page-img/1.jpg"
                alt="Indoor ceremony"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          <div className="col-span-1 aspect-square">
            <Link
              href="/gallery/portraits"
              className="block w-full h-full group"
            >
              <img
                src="/hero-page-img/1.jpg"
                alt="Bride portrait"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          {/* Middle row - 2 medium images */}
          <div className="col-span-1 md:col-span-2 aspect-[4/3]">
            <Link href="/gallery/street" className="block w-full h-full group">
              <img
                src="/hero-page-img/3.jpg"
                alt="Street wedding photo"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          <div className="col-span-1 md:col-span-2 aspect-[4/3]">
            <Link
              href="/gallery/destination"
              className="block w-full h-full group"
            >
              <img
                src="/hero-page-img/2.jpg"
                alt="Boat wedding ceremony"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          {/* Bottom row - 3 images */}
          <div className="col-span-1 aspect-square">
            <Link href="/gallery/indoor" className="block w-full h-full group">
              <img
                src="/hero-page-img/1.jpg"
                alt="Indoor ceremony"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          <div className="col-span-1 aspect-square">
            <Link
              href="/gallery/portraits"
              className="block w-full h-full group"
            >
              <img
                src="/hero-page-img/1.jpg"
                alt="Bride portrait"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
          {/* Large bottom image spanning 2 columns */}
          <div className="col-span-2 aspect-[2/1]">
            <Link href="/gallery/details" className="block w-full h-full group">
              <img
                src="/hero-page-img/1.jpg"
                alt="Wedding rings"
                className="w-full h-full object-cover rounded-lg group-hover:scale-101 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
