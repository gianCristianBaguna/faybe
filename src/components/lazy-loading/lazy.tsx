"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const bgImages = [
  "/homescreen-second-img/1.jpg",
  "/homescreen-second-img/2.jpg",
  "/homescreen-second-img/3.jpg",
  "/homescreen-second-img/4.jpg",
  "/homescreen-second-img/5.jpg",
]

export default function Lazy() {
  const [showOutro, setShowOutro] = useState(true)
  const [currentBg, setCurrentBg] = useState(0)

  // cycle images every 1s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % bgImages.length)
    }, 800) // 👈 1 second per picture
    return () => clearInterval(interval)
  }, [])

  // outro after ~8s (5 images × 1s + extra time for text)
  useEffect(() => {
    const timer = setTimeout(() => setShowOutro(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showOutro && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black z-50 overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          {/* Background image that fills the screen */}
          <motion.div
            key={currentBg}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImages[currentBg]})` }}
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1.1 }} // subtle zoom
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Animated Text */}
          <motion.h1
            className="text-[18vw] md:text-[14vw] font-extrabold text-white tracking-tight relative z-10"
            initial={{ scale: 1 }}
            animate={{
              scale: 5, // slowly fills screen
              transition: { duration: 8, ease: "easeInOut" },
            }}
            exit={{ opacity: 0 }}
          >
            FAYBE
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
