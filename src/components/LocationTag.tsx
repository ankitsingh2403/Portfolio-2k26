"use client";

import { FaGlobe } from "react-icons/fa";

const LocationTag = () => {
  return (
    <div
      className="
        absolute
        left-0
        top-1/2
        -translate-y-1/2

        /* 👇 keep only the edge visible */
        -translate-x-[15%]

        z-40
        hidden sm:flex
        items-center
        gap-8

        bg-black/90
        text-white

        /* ⬆️ BIGGER TAG */
        px-16
        py-6

        rounded-full
        shadow-2xl
        border border-white/10
        backdrop-blur-md

        transition-transform
        duration-500
        ease-out

        hover:-translate-x-[32%]
      "
    >
      {/* TEXT */}
      <div className="text-left pr-4">
        <p className="text-lg opacity-80 leading-tight">
          Located
        </p>
        <p className="text-2xl font-semibold tracking-wide">
          in India
        </p>
      </div>

      {/* ROTATING GLOBE */}
      <div
        className="
          w-16 h-16
          rounded-full
          bg-[#999C9E]
          flex
          items-center
          justify-center
          animate-spin-slow
        "
      >
        <FaGlobe className="text-3xl text-white" />
      </div>
    </div>
  );
};

export default LocationTag;
