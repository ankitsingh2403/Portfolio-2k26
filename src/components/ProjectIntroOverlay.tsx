"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import Navbar from "./Navbar";

type ProjectIntroLayoutProps = {
  title: string;
  children: ReactNode;
};

export default function ProjectIntroLayout({
  title,
  children,
}: ProjectIntroLayoutProps) {
  const [showTitle, setShowTitle] = useState(true);
  const [slideUp, setSlideUp] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const titleTimeout = setTimeout(() => {
      setShowTitle(false);

      const slideTimeout = setTimeout(() => {
        setSlideUp(true);
      }, 120);

      return () => clearTimeout(slideTimeout);
    }, 650);

    return () => clearTimeout(titleTimeout);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {/* INTRO OVERLAY */}
      {!slideUp && (
        <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center overflow-hidden px-4 pointer-events-none">
          <AnimatePresence mode="wait">
            {showTitle && (
              <motion.h1
                key={title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 0.45,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  flex
                  items-center
                  gap-3
                  text-3xl
                  sm:text-4xl
                  md:text-5xl
                  font-semibold
                  tracking-wide
                  text-white
                  text-center
                "
              >
                <motion.span
                  className="w-2.5 h-2.5 bg-white rounded-full"
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {title}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* CURVED SLIDE-UP OVERLAY */}
      {slideUp && (
        <motion.div
          initial={{
            y: 0,
            clipPath: "circle(120% at 50% 100%)",
          }}
          animate={{
            y: "-100%",
            clipPath: "circle(0% at 50% 0%)",
          }}
          transition={{
            duration: 1.8,
            ease: [0.83, 0, 0.17, 1],
          }}
          className="fixed inset-0 z-[999] bg-black pointer-events-none"
        />
      )}

      {/* NAVBAR */}
      {slideUp && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="fixed top-0 left-0 w-full z-50"
        >
          <Navbar />
        </motion.div>
      )}

      {/* PAGE CONTENT */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: slideUp ? 1 : 0 }}
        transition={{ delay: 0.9 }}
        className="bg-white min-h-screen"
      >
        {children}
      </motion.main>
    </>
  );
}