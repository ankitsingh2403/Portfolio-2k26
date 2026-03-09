"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import ParallaxVideoCard from "./ParallaxVideoCard";

const videos = [
  "/videoscroll/videoscroll1.mp4",
  "/videoscroll/videoscroll2.mp4",
  "/videoscroll/videoscroll3.mp4",
  "/videoscroll/videoscroll4.mp4",
  "/videoscroll/videoscroll5.mp4",
  "/videoscroll/videoscroll6.mp4",
  "/videoscroll/videoscroll7.mp4",
  "/videoscroll/videoscroll8.mp4",
];

export default function VideoParallaxGrid() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // 🔥 Section-based scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={sectionRef}
      className="bg-white px-6 lg:px-32 py-48 overflow-hidden"
    >
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-x-16
          gap-y-16
        "
      >
        {videos.map((src, index) => (
          <ParallaxVideoCard
            key={index}
            src={src}
            index={index}
            progress={scrollYProgress}
          />
        ))}
      </div>
    </section>
  );
}
