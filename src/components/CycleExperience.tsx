"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent
} from "framer-motion";
import { useRef, useState } from "react";
import Lottie from "lottie-react";
import cyclist from "../../public/animations/cyclist.json";

const experiences = [
  {
    company: "Oodles Technologies Pvt Ltd",
    role: "Odoo Developer",
    year: "2025 - Present",
    desc: "Developing ERP applications using Odoo, creating custom modules and optimizing workflows."
  },
  {
    company: "EOXS",
    role: "Software Developer Intern",
    year: "2024 - 2025",
    desc: "Worked on ERP backend development, module customization and ORM logic in Odoo 13."
  },
  {
    company: "Personal Projects",
    role: "Frontend Developer",
    year: "2023 - 2024",
    desc: "Built dashboards using React, TypeScript, Tailwind CSS and Apache ECharts."
  }
];

export default function CycleExperience() {

  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rawX = useTransform(scrollYProgress, [0, 1], ["-20vw", "110vw"]);

  const x = useSpring(rawX, {
    stiffness: 55,
    damping: 22
  });

  const [direction, setDirection] = useState(1);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const prev = scrollYProgress.getPrevious();

    if (prev !== undefined && latest > prev) setDirection(1);
    else setDirection(-1);
  });

  return (
    <section
      ref={sectionRef}
      className="relative max-w-[1400px] mx-auto px-6 md:px-20 py-32"
    >

      <h2 className="text-[32px] md:text-[60px] font-semibold mb-16 text-center">
        Work Experience
      </h2>

      <div className="grid md:grid-cols-3 gap-8 md:gap-10 mt-10 mb-32">

        {experiences.map((exp, index) => (

          <motion.div
            key={index}
            initial={{ opacity: 0, y: 70 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 p-6 md:p-7 rounded-xl shadow-sm hover:shadow-xl transition"
          >

            <p className="text-sm text-gray-400">{exp.year}</p>

            <h3 className="text-lg font-semibold mt-2">{exp.role}</h3>

            <p className="text-gray-500">{exp.company}</p>

            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              {exp.desc}
            </p>

          </motion.div>

        ))}

      </div>

      <motion.div
        style={{ x }}
        animate={{
          y: [0, -4, 0],
          scaleX: direction === 1 ? 1 : -1
        }}
        transition={{
          y: {
            repeat: Infinity,
            duration: 0.8,
            ease: "easeInOut"
          }
        }}
        className="absolute bottom-0 left-0 w-[160px] md:w-[240px]"
      >
        <Lottie animationData={cyclist} loop />
      </motion.div>

    </section>
  );
}