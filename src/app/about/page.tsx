"use client";
import Navbar from "@/components/Navbar";
import RotatingGlobe from "../../components/RotatingGlobe";
import WorkExperience from "@/components/CycleExperience";
import { motion } from "framer-motion";
import ProjectIntroLayout from "@/components/ProjectIntroOverlay";
import Footer from "@/components/Footer";

export default function About() {
  return (
    <div className="bg-white text-black w-full">
      <Navbar />

      <ProjectIntroLayout title="About">

        {/* HERO */}
        <section className="max-w-[1400px] mx-auto px-8 lg:px-20 pt-40 pb-32">

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-[48px] md:text-[72px] lg:text-[88px] leading-[1.05] font-semibold max-w-[1000px]"
          >
            Helping brands thrive
            <br />
            in the digital world
          </motion.h1>

        </section>


        {/* DIVIDER WITH GLOBE */}
        <div className="max-w-[1400px] mx-auto px-8 lg:px-20 relative">
          <div className="border-t border-gray-200"></div>
          <RotatingGlobe />
        </div>


        {/* IMAGE + TEXT */}
        <section className="max-w-[1400px] mx-auto px-8 lg:px-20 py-28 grid md:grid-cols-2 gap-20 items-start">

          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-lg leading-relaxed text-gray-700 max-w-[420px]"
          >

            <p>
              I help companies and startups across the globe build impactful
              digital experiences that combine thoughtful design with powerful
              technology. My goal is to create products that not only look
              visually appealing but also provide intuitive and seamless
              user experiences.
            </p>

            <p className="mt-8">
              Through continuous learning and experimentation, I aim to push
              boundaries and deliver solutions that help businesses grow and
              stand out in an increasingly competitive digital landscape.
            </p>

            <p className="mt-10 text-gray-400">
              Always exploring.
            </p>

          </motion.div>


          <motion.img
            src="/professional.png"
            loading="lazy"
            alt="about"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="w-full h-[700px] object-cover"
          />

        </section>


        {/* SERVICES */}
        <section className="max-w-[1400px] mx-auto px-8 lg:px-20 pb-40">

          <h2 className="text-[42px] md:text-[60px] font-semibold mb-28">
            I can help you with ...
          </h2>

          <div className="grid md:grid-cols-3 gap-24">

            {/* DESIGN CARD */}
            <motion.div
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.04
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >

              <p className="text-gray-400 text-sm mb-6">01</p>

              <div className="border-t border-gray-200 mb-10"></div>

              <h3 className="text-2xl font-semibold mb-6">
                Design
              </h3>

              <p className="text-gray-600 leading-relaxed">
                With a strong background in digital design, I create
                visually engaging and user-focused interfaces that
                help brands communicate effectively. My approach
                combines creativity with usability to ensure that
                every design not only looks beautiful but also
                provides an intuitive and enjoyable experience
                for users across all devices.
              </p>

            </motion.div>


            {/* DEVELOPMENT CARD */}
            <motion.div
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.04
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >

              <p className="text-gray-400 text-sm mb-6">02</p>

              <div className="border-t border-gray-200 mb-10"></div>

              <h3 className="text-2xl font-semibold mb-6">
                Development
              </h3>

              <p className="text-gray-600 leading-relaxed">
                I build modern, scalable, and high-performance
                websites using clean and maintainable code.
                From responsive layouts to complex web
                applications, my focus is on delivering
                reliable solutions that integrate seamlessly
                with design while ensuring speed,
                performance, and long-term maintainability.
              </p>

            </motion.div>


            {/* FULL PACKAGE CARD */}
            <motion.div
              whileHover={{
                rotateX: 6,
                rotateY: -6,
                scale: 1.04
              }}
              transition={{ type: "spring", stiffness: 120 }}
              className="p-6 rounded-xl transition-all duration-300 hover:bg-gray-50"
            >

              <p className="text-gray-400 text-sm mb-6">03</p>

              <div className="border-t border-gray-200 mb-10"></div>

              <h3 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                ✦ The full package
              </h3>

              <p className="text-gray-600 leading-relaxed">
                From concept to launch, I offer a complete
                digital solution that includes research,
                design, development, and optimization.
                This end-to-end approach ensures that
                every project maintains a consistent
                vision and delivers meaningful results
                for both businesses and users.
              </p>

            </motion.div>

          </div>

        </section>


        {/* WORK EXPERIENCE TIMELINE */}
        <WorkExperience />

        <Footer />

      </ProjectIntroLayout>

    </div>
  );
}