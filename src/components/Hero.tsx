"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import LocationTag from "./LocationTag";
import ScrollingName from "./ScrollingName";
import TextType from "./TextType";

const roles = ["Software Developer", "Full Stack Developer", "Freelancer"];

const Hero: React.FC = () => {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { margin: "-120px" });

  return (
    <section
      ref={ref}
      className="
        relative
        w-full
        min-h-screen
        bg-[#999C9E]
        overflow-hidden
        flex
        items-center
        justify-center
      "
    >
      {/* ===== LOCATION TAG (VISIBLE ONLY WHILE HERO IS IN VIEW) ===== */}
      {isInView && <LocationTag />}

      {/* ===== HERO IMAGE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 w-full flex justify-center"
      >
        <Image
          src="/professional2.png"
          alt="Ankit Kumar Singh"
          width={800}
          height={800}
          priority
          className="
    object-cover
    object-[center_22%]   
    w-full
    h-screen
    max-w-[90vw]
    md:max-w-[80vw]
    lg:max-w-[50vw]
    select-none
  "
        />

        {/* ===== ROLES (DESKTOP ONLY) ===== */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="
            absolute
            right-[4%]
            top-1/2
            -translate-y-1/2
            hidden
            sm:block
            font-bold
            tracking-wide
            text-3xl
            sm:text-4xl
            md:text-5xl
            bg-[#999C9E]
            text-gray-900
            px-4
            py-2
            rounded-xl
            drop-shadow-lg
          "
        >
          <TextType
            text={roles}
            typingSpeed={75}
            pauseDuration={1500}
            showCursor
            cursorCharacter="|"
          />
        </motion.div>
      </motion.div>

      {/* ===== SCROLLING NAME ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="
          absolute
          inset-x-0
          bottom-[8%]
          sm:bottom-[18%]
          md:bottom-[22%]
          lg:bottom-[35%]
          z-20
          pointer-events-none
        "
      >
        <ScrollingName name=" ━ Ankit Kumar Singh" />
      </motion.div>
    </section>
  );
};

export default Hero;
