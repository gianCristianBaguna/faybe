"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView, useTransform, useScroll } from "framer-motion";

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
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.3 }); // Trigger when 30% in view
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (isInView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    } else {
      controls.start({ opacity: 0, y: 40, transition: { duration: 0.8 } });
    }
  }, [isInView, controls]);

  // Function to return unique transforms per image
  const getImageAnimation = (index: number, side: string) => {
    let xTransform: import("framer-motion").MotionValue<number>;
    let yTransform: import("framer-motion").MotionValue<number>;

    if (side === "left") xTransform = useTransform(scrollYProgress, [0.1 * index, 0.3 + 0.1 * index], [-100, 0]);
    else if (side === "right") xTransform = useTransform(scrollYProgress, [0.1 * index, 0.3 + 0.1 * index], [100, 0]);
    else xTransform = useTransform(scrollYProgress, [0, 1], [0, 0]);

    if (side === "center") yTransform = useTransform(scrollYProgress, [0.1 * index, 0.3 + 0.1 * index], [40, 0]);
    else yTransform = useTransform(scrollYProgress, [0, 1], [0, 0]);

    const scaleTransform = useTransform(scrollYProgress, [0.1 * index, 0.3 + 0.1 * index], [0.95, 1]);
    const opacityTransform = useTransform(scrollYProgress, [0.05 * index, 0.5 + 0.05 * index], [0, 1]);

    return { x: xTransform, y: yTransform, scale: scaleTransform, opacity: opacityTransform };
  };

  return (
    <main ref={sectionRef} className="relative min-h-screen bg-black overflow-hidden" id={nextSectionId}>
      {/* Header with scroll-triggered animation */}
      <motion.div
        className="text-center py-12 px-4"
        animate={controls}
        initial={{ opacity: 0, y: 40 }}
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
            const animation = getImageAnimation(i, img.side);
            return (
              <motion.div
                key={i}
                className={img.span}
                style={{
                  x: animation.x,
                  y: animation.y,
                  scale: animation.scale,
                  opacity: animation.opacity,
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
