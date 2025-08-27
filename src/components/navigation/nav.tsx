// components/Navbar.tsx
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [show, setShow] = useState(true);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const containerRef = useRef<Window | HTMLElement | null>(null);

  useEffect(() => {
    // find a sensible scroll container (window fallback)
    const findScrollContainer = (): Window | HTMLElement => {
      const candidates = [
        document.querySelector("#__next"),
        document.querySelector("main"),
        document.querySelector("body"),
      ];
      for (const el of candidates) {
        if (!el) continue;
        const style = window.getComputedStyle(el);
        if (
          (style.overflowY === "auto" || style.overflowY === "scroll") &&
          (el as HTMLElement).scrollHeight > (el as HTMLElement).clientHeight
        ) {
          return el as HTMLElement;
        }
      }
      return window;
    };

    const container = findScrollContainer();
    containerRef.current = container;

    const getScrollTop = () => {
      if (container === window) {
        return window.scrollY || window.pageYOffset || 0;
      } else {
        return (container as HTMLElement).scrollTop;
      }
    };

    // initialize
    lastScrollY.current = getScrollTop();

    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = getScrollTop();

        if (currentY > lastScrollY.current && currentY > 50) {
          // user scrolled down past 50px → hide
          setShow(false);
        } else if (currentY < lastScrollY.current) {
          // user scrolled up → show
          setShow(true);
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
    };

    if (container === window) {
      window.addEventListener("scroll", onScroll, { passive: true });
    } else {
      (container as HTMLElement).addEventListener("scroll", onScroll, { passive: true });
    }

    return () => {
      if (container === window) {
        window.removeEventListener("scroll", onScroll);
      } else {
        (container as HTMLElement).removeEventListener("scroll", onScroll);
      }
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transform-gpu will-change-transform transition-transform duration-300 ${
        show ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto py-4 px-6 flex items-center justify-between ml-0">
        {/* Logo + Nav Links (Left side) */}
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center">
            <Image
              src="/nav-logo/faybe.png"
              alt="MyApp Logo"
              width={300}
              height={20}
              priority
            />
          </Link>

          {/* Nav Links (Desktop Only) */}
          <div className="hidden md:flex gap-8 -mt-10">
            <Link href="/" className="text-white hover:text-yellow-500 text-sm">
              Home
            </Link>
            <Link
              href="/pages/about"
              className="text-white hover:text-yellow-500 text-sm px-10"
            >
              About
            </Link>
            <Link
              href="/pages/contact"
              className="text-white hover:text-yellow-500 text-sm"
            >
              Contact
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4">
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
