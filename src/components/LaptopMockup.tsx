"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type LaptopMockupProps = {
  video: string;
};

export default function LaptopMockup({ video }: LaptopMockupProps) {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="
        flex
        justify-center
        py-24
        sm:py-32
        lg:py-40
        bg-[#d9e1de]
        overflow-hidden
      "
    >
      {/* CONTAINER */}
      <div className="relative w-full max-w-[1200px] px-4 sm:px-6">
        
        {/* MACBOOK WRAPPER */}
        <div className="relative mx-auto aspect-[16/10] w-full max-w-[1100px]">
          
          {/* 🎬 VIDEO (LOCKED TO SCREEN) */}
          <div
            className="
              absolute
              top-[4.5%]
              left-[7.8%]
              w-[83.4%]
              h-[79%]
              overflow-hidden
              rounded-[14px]
              z-10
              bg-black
            "
          >
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
          </div>

          {/* 💻 MACBOOK PNG */}
          <img
            src="/macboook.png"
            alt="MacBook Pro"
            className="
              relative
              z-20
              w-full
              pointer-events-none
              select-none
            "
          />
        </div>
      </div>
    </motion.section>
  );
}
