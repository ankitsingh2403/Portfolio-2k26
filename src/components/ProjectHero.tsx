"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LiquidButton from "./LiquidButton";
import { Project } from "@/types/project";

export default function ProjectHero({ project }: { project: Project }) {
  const mediaRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(mediaRef, { once: true, margin: "-120px" });

  const isQuantumBot = project.slug === "quantum-bot";

  return (
    <section className="relative">
      {/* WHITE INFO BLOCK */}
      <div className="bg-white px-6 lg:px-32 pt-32 lg:pt-40">
        {/* TITLE */}
        <h1 className="text-[44px] sm:text-[64px] lg:text-[120px] font-light mb-20 text-black">
          {project.title}
        </h1>

        {/* INFO + LIVE BUTTON ROW */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-y-20 gap-x-16 mb-32">
          {/* ROLE */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest text-black/50 mb-6">
              Role / Services
            </p>
            <div className="w-full h-px bg-black/20 mb-6" />
            <p className="text-base text-black">{project.role}</p>
          </div>

          {/* CREDITS */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest text-black/50 mb-6">
              Credits
            </p>
            <div className="w-full h-px bg-black/20 mb-6" />
            <p className="text-base text-black">{project.credits}</p>
          </div>

          {/* LOCATION */}
          <div className="flex flex-col">
            <p className="text-[11px] uppercase tracking-widest text-black/50 mb-6">
              Location & Year
            </p>
            <div className="w-full h-px bg-black/20 mb-6" />
            <p className="text-base text-black">{project.year}</p>
          </div>

          {/* LIVE SITE BUTTON */}
          <div className="flex items-end justify-start lg:justify-end">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="relative"
            >
              <LiquidButton label="Live site ↗" />
            </a>
          </div>
        </div>
      </div>

      {/* MEDIA SECTION */}
      <motion.div
        ref={mediaRef}
        initial={{ opacity: 0, scale: 1.02 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`
          relative
          w-full
          min-h-screen
          flex
          items-center
          justify-center
          overflow-hidden
          ${isQuantumBot ? "bg-[#d9e1de]" : ""}
        `}
      >
        {isQuantumBot ? (
          /* 🎥 VIDEO FOR QUANTUM BOT */
          <video
            src="/heroimage/herovideo.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="
              relative
              z-10
              w-[100%]
              sm:w-[110%]
              lg:w-[115%]
              max-h-[85vh]
              object-contain
            "
          />
        ) : (
          /* 🖼 IMAGE FOR OTHER PROJECTS */
          <img
            src={project.heroImage}
            alt={project.title}
            className="
              relative
              z-10
              w-[100%]
              sm:w-[110%]
              lg:w-[115%]
              max-h-[85vh]
              object-contain
            "
          />
        )}
      </motion.div>
    </section>
  );
}
