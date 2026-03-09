"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const greetings = [
  "Hello",
  "Bonjour",
  "Hola",
  "Ciao",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "Olá",
];

export default function IntroAnimation({ onFinish }: { onFinish?: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: true });

  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(true);
  const [slideUp, setSlideUp] = useState(false);

  // Handle greeting transitions (UNCHANGED)
  useEffect(() => {
    if (!isInView) return;
    if (index >= greetings.length) return;

    const timeout = setTimeout(() => {
      setShow(false);
      const nextTimeout = setTimeout(() => {
        setIndex((prev) => prev + 1);
        setShow(true);
      }, 100);

      return () => clearTimeout(nextTimeout);
    }, index === 0 ? 700 : 350);

    return () => clearTimeout(timeout);
  }, [index, isInView]);

  // Slide-up overlay after all greetings (UNCHANGED)
  useEffect(() => {
    if (!isInView) return;

    if (index >= greetings.length) {
      const timeout = setTimeout(() => {
        setSlideUp(true);
        if (onFinish) onFinish();
      }, 100);

      return () => clearTimeout(timeout);
    }
  }, [index, onFinish, isInView]);

  return (
    <>
      {/* Greeting Animation */}
      {!slideUp && (
        <div
          ref={containerRef}
          className="
            fixed
            inset-0
            flex
            items-center
            justify-center
            bg-black
            text-white
            overflow-hidden
            z-50
            px-4
          "
        >
          <AnimatePresence mode="wait">
            {show && index < greetings.length && (
              <motion.h1
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: index === 0 ? 0.8 : 0.35,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="
                  flex
                  items-center
                  gap-2
                  sm:gap-3
                  font-bold
                  tracking-wide
                  text-2xl
                  sm:text-3xl
                  md:text-4xl
                  lg:text-5xl
                  xl:text-6xl
                  will-change-opacity
                "
              >
                {/* Pulsing dot */}
                <motion.span
                  className="
                    inline-block
                    w-2
                    h-2
                    sm:w-3
                    sm:h-3
                    bg-white
                    rounded-full
                  "
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.7, 1] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {greetings[index]}
              </motion.h1>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* 🌙 Curved Slide-Up Overlay */}
      {slideUp && (
        <motion.div
          initial={{
            y: 0,
            clipPath: "circle(100% at 50% 100%)",
          }}
          animate={{
            y: "-100%",
            clipPath: "circle(0% at 50% 0%)",
          }}
          transition={{
            duration: 1.8,
            ease: [0.83, 0, 0.17, 1],
          }}
          className="
            fixed
            inset-0
            bg-black
            z-50
            will-change-transform
          "
        />
      )}
    </>
  );
}
