"use client"; // <- Client component

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import IntroAnimation from "./IntroAnimation";

export default function IntroScreen() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        w-full
        min-h-screen
        min-h-[100svh]
        flex
        items-center
        justify-center
        bg-white
        overflow-hidden
      "
    >
      <IntroAnimation onFinish={() => {}} />
    </motion.section>
  );
}
