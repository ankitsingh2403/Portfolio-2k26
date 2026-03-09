"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface ScrollingNameProps {
  name?: string;
}

const ScrollingName: React.FC<ScrollingNameProps> = ({
  name = "Ankit Kumar Singh",
}) => {
  const [offset, setOffset] = useState(0);

  const velocity = useRef(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef<number | null>(null);

  /* ---------------- SCROLL ACCELERATION ---------------- */
  useEffect(() => {
    const onScroll = () => {
      const delta = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;

      // add scroll force
      velocity.current += delta * 0.06;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ---------------- TIME-BASED RAF LOOP ---------------- */
  useEffect(() => {
    let raf: number;

    const animate = (time: number) => {
      if (lastTime.current == null) lastTime.current = time;

      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      setOffset((prev) => {
        // time-based speed (never zero)
        const baseSpeed = 0.08 * deltaTime;

        const next = prev + baseSpeed + velocity.current;

        // wrap
        if (next > 1200) return -1200;
        if (next < -1200) return 1200;

        return next;
      });

      // smooth decay
      velocity.current *= 0.92;

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      style={{ x: offset }}
      className="
        absolute
        inset-x-0
        flex
        justify-center
        pointer-events-none
        select-none
        will-change-transform
      "
    >
      <h1
        className="
          whitespace-nowrap
          uppercase
          font-bold
          tracking-tight
          text-[14vw]
          sm:text-[12vw]
          lg:text-[8vw]
          text-white
        "
      >
        {name} &nbsp; {name} &nbsp; {name} &nbsp; {name} &nbsp; {name}
      </h1>
    </motion.div>
  );
};

export default ScrollingName;