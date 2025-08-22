// components/Navbar.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent ">
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between ml-0">
        
        {/* Logo + Nav Links (Left side) */}
        <div className="flex items-center gap-10">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/nav-logo/faybe.png"
              alt="MyApp Logo"
              width={200}
              height={80}
              priority
            />
          </Link>

          {/* Nav Links (Desktop Only) */}
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>

        {/* Right Side: Draft Button (Desktop) + Mobile Menu */}
        <div className="flex items-center gap-4">

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-sm px-6 py-4 space-y-4">
          <Link
            href="/"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="block text-white hover:text-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Contact
          </Link>
          <Link
            href="/draft"
            className="block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-center transition"
            onClick={() => setIsOpen(false)}
          >
            Draft
          </Link>
        </div>
      )}
    </nav>
  );
}
