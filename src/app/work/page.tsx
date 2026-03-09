"use client";

import { useState, useRef } from "react";
import WorkGrid from "@/components/WorkGrid";
import WorkSection from "@/components/WorkSection";
import { LayoutGrid, List } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectIntroLayout from "@/components/ProjectIntroOverlay";

import { motion, useMotionValue, useSpring } from "framer-motion";

export default function WorkPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [filter, setFilter] = useState("All");

  const listRef = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 250, damping: 20 });
  const springY = useSpring(y, { stiffness: 250, damping: 20 });

  function handleMouseMove(e: any) {
    const rect = e.currentTarget.getBoundingClientRect();

    const posX = e.clientX - rect.left - rect.width / 2;
    const posY = e.clientY - rect.top - rect.height / 2;

    x.set(posX * 0.35);
    y.set(posY * 0.35);
  }

  function resetPosition() {
    x.set(0);
    y.set(0);
  }

  return (
    <>
      <ProjectIntroLayout title="Works">
        {/* NAVBAR */}
        <div className="relative z-[1000]">
          <Navbar />
        </div>
        <section className="relative z-10 bg-white px-6 sm:px-8 md:px-16 lg:px-32 pt-28 md:pt-36 lg:pt-40 pb-16 md:pb-20">
          {/* HERO */}
          <section className="max-w-[1400px] mx-auto px-8 lg:px-20 pt-40 pb-32">
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-[48px] md:text-[72px] lg:text-[98px] leading-[1.05] font-semibold max-w-[1000px] text-black"
            >
              Creating next level
              <br />
              digital products
            </motion.h1>
          </section>

          {/* FILTER + VIEW */}
          {/* FILTER + VIEW */}
          <div className="max-w-[1400px] mx-auto px-8 lg:px-20 flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-10 mt-10 md:mt-14">
            {/* FILTER BUTTONS */}
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {["All", "Design", "Development"].map((item) => (
                <button
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`
        px-6 py-3 rounded-full border text-sm sm:text-base
        transition-all duration-300
        ${
          filter === item
            ? "bg-black text-white scale-105"
            : "border-black/20 text-black hover:bg-black hover:text-white hover:scale-105"
        }
        `}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* VIEW BUTTONS */}
            <div className="flex items-center gap-4">
              {/* LIST VIEW BUTTON */}
              <motion.button
                ref={listRef}
                onClick={() => setView("list")}
                onMouseMove={handleMouseMove}
                onMouseLeave={resetPosition}
                style={{ x: springX, y: springY }}
                whileTap={{ scale: 0.85 }}
                className={`
      relative
      overflow-hidden
      group
      w-16
      h-16
      rounded-full
      flex
      items-center
      justify-center
      border
      transition
      ${view === "list" ? "bg-black text-white" : "border-black/20"}
      `}
              >
                <span
                  className="
        absolute
        inset-0
        bg-[#6DB7E2]
        scale-y-0
        origin-bottom
        transition-transform
        duration-500
        ease-out
        group-hover:scale-y-100
        "
                ></span>

                <List
                  size={26}
                  className="relative z-10 transition group-hover:text-white"
                />
              </motion.button>

              {/* GRID VIEW BUTTON */}
              <motion.button
                onClick={() => setView("grid")}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: "spring", stiffness: 400 }}
                className={`
      w-16
      h-16
      rounded-full
      flex
      items-center
      justify-center
      border
      transition
      ${view === "grid" ? "bg-black text-white" : "border-black/20"}
      `}
              >
                <LayoutGrid size={26} />
              </motion.button>
            </div>
          </div>

          {/* CONTENT */}
          <div className="mt-16 md:mt-20 lg:mt-24">
            {view === "grid" ? (
              <WorkGrid filter={filter} />
            ) : (
              <WorkSection filter={filter} />
            )}
          </div>
        </section>
      </ProjectIntroLayout>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
