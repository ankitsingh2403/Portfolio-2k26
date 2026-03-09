"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LiquidButton from "./LiquidButton";
import Link from "next/link";

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <footer
      ref={ref}
      className="relative bg-[#0f1115] text-white overflow-hidden"
    >
      {/* ===== CURVED TOP CUT ===== */}
      <div className="absolute -top-[180px] left-0 w-full h-[180px] overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 -top-[260px] w-[160%] h-[440px] -translate-x-1/2 bg-white rounded-b-[100%]" />
      </div>

      {/* ===== CONTENT ===== */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-6 lg:px-32 pt-32 sm:pt-40 pb-20 sm:pb-24">

        {/* TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center"
        >

          {/* LEFT */}
          <div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 mb-8">

              {/* PROFILE IMAGE */}
              <img
                src="/professional.png"
                alt="Profile"
                className="
                  w-24 h-24
                  sm:w-28 sm:h-28
                  lg:w-32 lg:h-32
                  rounded-full
                  object-cover
                "
              />

              {/* HEADING */}
              <h2
                className="
                  text-5xl
                  sm:text-6xl
                  md:text-7xl
                  lg:text-8xl
                  font-light
                  leading-[1.05]
                "
              >
                Let’s work <br /> together
              </h2>

            </div>

            {/* CONTACT CHIPS */}
            <div className="mt-10 sm:mt-12 flex gap-4 flex-wrap">

              <span className="px-5 sm:px-6 py-3 border border-white/20 rounded-full text-xs sm:text-sm">
                ankitsinghme7@gmail.com
              </span>

              <span className="px-5 sm:px-6 py-3 border border-white/20 rounded-full text-xs sm:text-sm">
                +91 9601675400
              </span>

            </div>

          </div>

          {/* RIGHT */}
          <div className="flex justify-start lg:justify-end mt-10 lg:mt-0">

            <Link href="/contact">
              <LiquidButton label="Get in touch" />
            </Link>

          </div>

        </motion.div>

        {/* BOTTOM BAR */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-20 sm:mt-24 border-t border-white/10 pt-6 flex flex-col lg:flex-row justify-between gap-4 text-xs text-white/40"
        >

          <span>© 2026 Ankit · Local time 07:35 AM</span>

          <div className="flex gap-6">

            <Link
              href="https://instagram.com"
              target="_blank"
              className="hover:text-white transition"
            >
              Instagram
            </Link>

            <Link
              href="https://linkedin.com"
              target="_blank"
              className="hover:text-white transition"
            >
              LinkedIn
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="hover:text-white transition"
            >
              Github
            </Link>

          </div>

        </motion.div>

      </div>
    </footer>
  );
}