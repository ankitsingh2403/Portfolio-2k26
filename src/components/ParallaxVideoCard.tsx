"use client";

import {
  motion,
  MotionValue,
  useTransform,
  useSpring,
} from "framer-motion";

type Props = {
  src: string;
  index: number;
  progress: MotionValue<number>;
};

export default function ParallaxVideoCard({
  src,
  index,
  progress,
}: Props) {
  const isTopRow = index < 4;

  /**
   * NameScroll-style movement:
   * - Start slightly outside viewport
   * - Move across center
   * - Exit towards other side
   */
  const rawX = useTransform(
    progress,
    [0, 1],
    isTopRow ? [-120, 120] : [120, -120]
  );

  // Smooth but responsive
  const x = useSpring(rawX, {
    stiffness: 100,
    damping: 28,
    mass: 0.9,
  });

  return (
    <motion.div
      style={{ x }}
      className="
        relative
        w-full
        h-[260px]
        sm:h-[280px]
        md:h-[300px]
        lg:h-[320px]
        bg-neutral-200
        rounded-xl
        p-4
        overflow-hidden
        will-change-transform
      "
    >
      <video
        src={src}
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="w-full h-full object-cover rounded-md"
      />
    </motion.div>
  );
}
