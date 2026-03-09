"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Project } from "@/types/project";

type Props = {
  project: Project;
  y: number;
  onView: () => void;
};

export default function ProjectPreview({ project, y, onView }: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{
        top: y,
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.96,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 22,
        mass: 0.8,
      }}
      className="
        absolute
        left-1/2
        z-50
        w-[280px]
        sm:w-[340px]
        md:w-[380px]
        lg:w-[420px]
        -translate-x-1/2
        pointer-events-auto
        will-change-transform
      "
    >
      {/* FLOAT CARD */}
      <motion.div
        whileHover={{ y: -8, scale: 1.02 }}
        transition={{ type: "spring", stiffness: 140, damping: 18 }}
        className="relative bg-neutral-200 p-4 sm:p-5 lg:p-6"
      >
        <motion.img
          key={project.previewImage}
          src={project.previewImage}
          alt={project.title}
          initial={{ opacity: 0.6, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="w-full h-auto object-contain"
        />

        {/* VIEW BUTTON */}
        <button
          onClick={onView}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            bg-black/10
            hover:bg-black/20
            transition-colors
          "
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm sm:text-base">
            View
          </div>
        </button>
      </motion.div>
    </motion.div>
  );
}
