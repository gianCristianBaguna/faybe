"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";

interface FirstImageProps {
  nextSectionId: string;
}

const images = [
  { src: "/homescreen-second-img/1.jpg", href: "/gallery/details", alt: "Rings", side: "center", span: "col-span-2 aspect-[2/1]" },
  { src: "/homescreen-second-img/2.jpg", href: "/gallery/indoor", alt: "Indoor", side: "left", span: "col-span-1 aspect-square" },
  { src: "/homescreen-second-img/3.jpg", href: "/gallery/portraits", alt: "Bride", side: "right", span: "col-span-1 aspect-square" },
  { src: "/homescreen-second-img/4.jpg", href: "/gallery/street", alt: "Street", side: "center", span: "col-span-1 md:col-span-2 aspect-[4/3]" },
  { src: "/homescreen-second-img/5.jpg", href: "/gallery/destination", alt: "Boat", side: "center", span: "col-span-1 md:col-span-2 aspect-[4/3]" },
  { src: "/homescreen-second-img/6.jpg", href: "/gallery/indoor", alt: "Indoor", side: "left", span: "col-span-1 aspect-square" },
  { src: "/homescreen-second-img/7.jpg", href: "/gallery/portraits", alt: "Bride", side: "right", span: "col-span-1 aspect-square" },
  { src: "/homescreen-second-img/8.jpg", href: "/gallery/details", alt: "Rings", side: "center", span: "col-span-2 aspect-[2/1]" },
];

export default function FirstImage({ nextSectionId }: FirstImageProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 });
  const headerControls = useAnimation();
  const imageControls = useAnimation();
  const { scrollYProgress } = useScroll({ target: sectionRef });

  // Scroll-based parallax for images
  const getXTransform = (side: string) => {
    if (side === "left") return useTransform(scrollYProgress, [0, 1], [-50, 0]);
    if (side === "right") return useTransform(scrollYProgress, [0, 1], [50, 0]);
    return useTransform(scrollYProgress, [0, 1], [0, 0]);
  };
  const getYTransform = (side: string) => {
    if (side === "center") return useTransform(scrollYProgress, [0, 1], [40, 0]);
    return useTransform(scrollYProgress, [0, 1], [0, 0]);
  };

  useEffect(() => {
    if (isInView) {
      // Animate header first
      headerControls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });

      // Animate images sequentially
      images.forEach((_, i) => {
        imageControls.start((custom) => {
          if (custom === i) {
            return {
              opacity: 1,
              scale: 1,
              y: 0,
              x: 0,
              transition: { delay: i * 0.15, duration: 0.6 },
            };
          }
          return {};
        });
      });
    } else {
      headerControls.start({ opacity: 0, y: 40, transition: { duration: 0.5 } });
      imageControls.start({ opacity: 0, scale: 0.95, y: 40 });
    }
  }, [isInView, headerControls, imageControls]);

  return (
    <main ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden" id={nextSectionId}>
      {/* Header */}
      <motion.div
        className="text-center py-12 px-4"
        initial={{ opacity: 0, y: 40 }}
        animate={headerControls}
      >
        <h1 className="text-3xl text-white">Making Your Aspirations Possible</h1>
        <p className="text-lg text-white italic tracking-wide max-w-3xl mx-auto leading-relaxed mt-4">
          A Decade of Love Stories — Crafting Beautiful Beginnings from 'Yes' to 'I DO'
        </p>
      </motion.div>

      {/* Photo Grid */}
      <div className="w-full pb-20 p-20 md:p-5">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
          {images.map((img, i) => {
            return (
              <motion.div
                key={i}
                custom={i}
                className={img.span}
                initial={{
                  opacity: 0,
                  y: 40,
                  scale: 0.95,
                  x: img.side === "left" ? -50 : img.side === "right" ? 50 : 0,
                }}
                animate={imageControls}
                style={{
                  x: getXTransform(img.side),
                  y: getYTransform(img.side),
                }}
              >
                <Link href={img.href} className="block w-full h-full group">
                  <motion.img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
                    whileHover={{ scale: 1.05 }}
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
