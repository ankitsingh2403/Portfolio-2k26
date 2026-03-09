"use client";

import {
  motion,
  useAnimation,
  useMotionValue,
  useSpring,
  useInView,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";

type LiquidButtonProps = {
  label?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function LiquidButton({
  label = "About me",
  onClick,
  type = "button",
}: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false);
  const waveControls = useAnimation();

  const ref = useRef<HTMLButtonElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 5);
    y.set((e.clientY - rect.top - rect.height / 2) / 5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  useEffect(() => {
    if (hovered) {
      waveControls.start({
        d: [
          "M0 140 Q50 130 100 140 T200 140 V200 H0 Z",
          "M0 145 Q50 135 100 145 T200 145 V200 H0 Z",
          "M0 140 Q50 130 100 140 T200 140 V200 H0 Z",
        ],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    }
  }, [hovered, waveControls]);

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="
        relative
        rounded-full
        overflow-hidden
        cursor-pointer
        flex
        items-center
        justify-center
        w-36 h-36
        sm:w-40 sm:h-40
        md:w-44 md:h-44
        lg:w-48 lg:h-48
        bg-white
        border
        border-black/10
      "
      style={{ x: springX, y: springY }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.08 }}
    >
      {/* BLUE WATER FILL */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <clipPath id="circleClip">
            <circle cx="100" cy="100" r="98" />
          </clipPath>

          <linearGradient id="waterGradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#5B7FFF" />
            <stop offset="100%" stopColor="#1A3EF0" />
          </linearGradient>
        </defs>

        <g clipPath="url(#circleClip)">
          <motion.rect
            x="0"
            width="200"
            height="200"
            fill="url(#waterGradient)"
            initial={{ y: 200 }}
            animate={{ y: hovered ? 0 : 200 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          />

          <motion.path fill="#5B7FFF" animate={waveControls} />
        </g>
      </motion.svg>

      {/* TEXT */}
      <span
        className={`
          relative z-10
          text-[14px] sm:text-[16px] lg:text-[18px]
          font-semibold
          tracking-wide
          transition-colors duration-300
          ${hovered ? "text-white" : "text-black"}
        `}
      >
        {label}
      </span>
    </motion.button>
  );
}
