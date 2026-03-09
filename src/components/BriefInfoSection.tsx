"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import LiquidButton from "../components/LiquidButton";
import Link from "next/link";

export default function BriefInfoSection(): JSX.Element {
  const ref = useRef<HTMLElement | null>(null);

  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const rawButtonY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  const buttonY = useSpring(rawButtonY, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
  });

  return (
    <section
      ref={ref}
      className="relative w-full min-h-screen flex flex-col lg:flex-row px-4 sm:px-6 lg:px-32 bg-white overflow-hidden"
    >
      {/* LEFT SECTION */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 flex items-center py-16 lg:py-0"
      >
        <p className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[46px] leading-[1.25] text-[#191919] font-light tracking-tight max-w-3xl">
          Helping startups and businesses build a strong digital presence.
          <br />
          Clean design. Solid code. Real results.
          <br />
          <span className="block mt-4 font-normal text-[#222] text-[16px] sm:text-[18px] lg:text-[22px]">
            No nonsense, always on the cutting edge.
          </span>
        </p>
      </motion.div>

      {/* RIGHT SECTION */}
      <motion.div
        style={{ y: textY }}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
        className="flex-1 flex flex-col items-start lg:items-end py-16 lg:py-20"
      >
        <div className="flex flex-col items-start lg:items-end gap-8">
          <p className="text-[#191919] text-[15px] sm:text-[16px] md:text-[18px] leading-relaxed font-light max-w-xs text-left lg:text-right mt-20 md:mt-24 ml-6">
            The combination of my passion for design, code & interaction
            positions me in a unique place in the web design world.
          </p>

          {/* Clickable About Button */}
          <motion.div style={{ y: buttonY }} className="mt-20 lg:mt-24">
            <Link href="/about">
              <LiquidButton />
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* FADED DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full px-6 lg:px-32 pointer-events-none">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-black/20 to-transparent" />
      </div>
    </section>
  );
}