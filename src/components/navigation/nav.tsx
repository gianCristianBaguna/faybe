"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastScrollY && currentY > 50) {
        setShow(false); // scroll down
      } else if (currentY < lastScrollY) {
        setShow(true); // scroll up
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transform-gpu will-change-transform transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between ml-0">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image src="/nav-logo/faybe.png" alt="Logo" width={300} height={20} priority />
          </Link>

          <div className="hidden md:flex gap-8 -mt-10">
            <Link href="/" className="text-white hover:text-yellow-500 text-sm">
              Home
            </Link>
            <Link href="/pages/about" className="text-white hover:text-yellow-500 text-sm px-10">
              About
            </Link>
            <Link href="/pages/contact" className="text-white hover:text-yellow-500 text-sm">
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/70 backdrop-blur-sm px-6 py-4 space-y-4">
          <Link href="/" className="block text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Home</Link>
          <Link href="/about" className="block text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/contact" className="block text-white hover:text-gray-300" onClick={() => setIsOpen(false)}>Contact</Link>
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
