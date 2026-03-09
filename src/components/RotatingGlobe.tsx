"use client";

import { motion } from "framer-motion";
import { Globe } from "lucide-react";

export default function RotatingGlobe() {
  return (
    <div className="absolute right-0 -top-20">

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 12,
          ease: "linear",
        }}
        className="w-[180px] h-[180px] rounded-full bg-[#4A63FF] flex items-center justify-center shadow-xl"
      >
        <Globe size={70} color="white" />
      </motion.div>

    </div>
  );
}