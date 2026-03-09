"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useAnimation,
} from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  count: number;
};

export default function MoreWorkButton({ count }: Props) {
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const waveControls = useAnimation();

  // magnetic motion
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) / 6);
    y.set((e.clientY - rect.top - rect.height / 2) / 6);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  // wave animation
  useEffect(() => {
    if (hovered) {
      waveControls.start({
        opacity: 1,
        d: [
          "M0 20 Q40 10 80 20 T160 20 V40 H0 Z",
          "M0 22 Q40 14 80 22 T160 22 V40 H0 Z",
          "M0 20 Q40 10 80 20 T160 20 V40 H0 Z",
        ],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      });
    } else {
      waveControls.start({
        opacity: 0,
      });
    }
  }, [hovered, waveControls]);

  return (
    <motion.button
      onClick={() => router.push("/work")}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="
        relative
        overflow-hidden
        flex
        items-center
        gap-1
        px-12
        py-4
        rounded-full
        bg-white
        border
        border-black/10
        text-[16px]
        font-medium
      "
    >
      {/* Blue liquid fill */}
      <motion.div
        className="absolute inset-0 bg-[#5B7FFF]"
        initial={{ y: "100%" }}
        animate={{ y: hovered ? "0%" : "100%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />

      {/* Wave */}
      <motion.svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 160 40"
        preserveAspectRatio="none"
      >
        <motion.path
          fill="#5B7FFF"
          initial={{ opacity: 0 }}
          animate={waveControls}
        />
      </motion.svg>

      {/* Text */}
      <span
        className={`
          relative z-10 flex items-start gap-1
          transition-colors duration-300
          ${hovered ? "text-white" : "text-black"}
        `}
      >
        <span>More work</span>
        <sup className="text-[11px] opacity-70 relative -top-1">
          {count}
        </sup>
      </span>
    </motion.button>
  );
}