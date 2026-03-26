"use client";

import { useState } from "react";
import Image from "next/image";
import ProjectIntroOverlay from "@/components/ProjectIntroOverlay";
import LiquidButton from "@/components/LiquidButton";
import toast from "react-hot-toast";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    services: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const toastId = toast.loading("Sending message...");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Message sent successfully ", { id: toastId });
      } else {
        toast.error("Failed to send message ❌", { id: toastId });
      }

      setForm({
        name: "",
        email: "",
        organization: "",
        services: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong ⚠️");
    }
  };

  return (
    <ProjectIntroOverlay title="Contact">
      <div
        className="bg-[#0f1117] text-white min-h-screen
        px-6 sm:px-12 md:px-24 lg:px-40
        pt-36 md:pt-44 pb-32"
      >
        <div className="grid md:grid-cols-[65%_35%] gap-20 lg:gap-28">

          {/* LEFT SIDE */}
          <div>

            {/* HEADING + PROFILE */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 mb-16 md:mb-20">

              {/* HEADING */}
              <h1
                className="
                text-[42px] sm:text-[56px] md:text-[72px] lg:text-[90px]
                leading-[1.05]
                font-light
                tracking-tight
              "
              >
                Let's start a <br /> project together
              </h1>

              {/* PROFILE IMAGE */}
              <div
                className="
                relative
                w-32 h-32
                sm:w-36 sm:h-36
                md:w-44 md:h-44
                lg:w-52 lg:h-52
                rounded-full
                overflow-hidden
                border-2 border-white/10
                shadow-[0_0_40px_rgba(0,0,0,0.5)]
                transition-transform duration-500
                hover:scale-105
                flex-shrink-0
              "
              >
                <Image
                  src="/favicon.png"
                  alt="Ankit Kumar Singh"
                  fill
                  sizes="(max-width:768px) 144px, 208px"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-gradient-to-r from-gray-700 via-gray-500 to-transparent mb-16"></div>

            {/* FORM */}
            <div className="space-y-16 md:space-y-20 max-w-3xl">
              {[
                {
                  number: "01",
                  label: "What's your name?",
                  name: "name",
                  placeholder: "John Doe *",
                },
                {
                  number: "02",
                  label: "What's your email?",
                  name: "email",
                  placeholder: "john@doe.com *",
                },
                {
                  number: "03",
                  label: "What's the name of your organization?",
                  name: "organization",
                  placeholder: "John & Doe®",
                },
                {
                  number: "04",
                  label: "What services are you looking for?",
                  name: "services",
                  placeholder: "Web Design, Web Development ...",
                },
              ].map((item) => (
                <div key={item.number}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-gray-500 text-xs tracking-widest">
                      {item.number}
                    </span>
                    <div className="flex-1 h-[1px] bg-gray-800"></div>
                  </div>

                  <label className="block text-base sm:text-lg md:text-xl mb-3 font-medium tracking-wide">
                    {item.label}
                  </label>

                  <input
                    name={item.name}
                    value={(form as any)[item.name]}
                    onChange={handleChange}
                    placeholder={item.placeholder}
                    className="
                      w-full
                      bg-transparent
                      border-b border-gray-700
                      pb-3 md:pb-4
                      focus:outline-none
                      focus:border-white
                      text-gray-300
                      transition-all duration-300
                    "
                  />
                </div>
              ))}

              {/* MESSAGE */}
              <div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-gray-500 text-xs tracking-widest">
                    05
                  </span>
                  <div className="flex-1 h-[1px] bg-gray-800"></div>
                </div>

                <label className="block text-base sm:text-lg md:text-xl mb-3 font-medium tracking-wide">
                  Your message
                </label>

                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Hello Ankit, can you help me with ..."
                  className="
                    w-full
                    bg-transparent
                    border-b border-gray-700
                    pb-3 md:pb-4
                    focus:outline-none
                    focus:border-white
                    text-gray-300
                    resize-none
                    transition-all duration-300
                  "
                />
              </div>

              {/* SEND BUTTON */}
              <div className="w-full flex justify-center pt-16 md:pt-20">
                <LiquidButton label="Send it!" onClick={handleSubmit} />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (UNCHANGED) */}
          <div className="space-y-14 pt-12 md:pt-28">
            <div>
              <p className="text-gray-500 uppercase text-xs tracking-widest mb-3">
                Contact Details
              </p>
              <p className="text-lg md:text-xl">ankitsinghme7@gmail.com</p>
              <p className="text-lg md:text-xl">+91 96016 754XX</p>
            </div>

            <div>
              <p className="text-gray-500 uppercase text-xs tracking-widest mb-3">
                Education
              </p>
              <p className="text-lg md:text-xl font-medium">MCA – 8.8 GPA</p>
              <p className="text-gray-400">
                Harcourt Butler Technical University
              </p>

              <p className="text-lg md:text-xl font-medium mt-5">BCA</p>
              <p className="text-gray-400">Mahatma Gandhi Kashi Vidyapith</p>
            </div>

            <div className="group cursor-pointer">
              <p className="text-gray-500 uppercase text-xs tracking-widest mb-6">
                Resume
              </p>

              <div className="relative border border-gray-700 rounded-xl p-6 transition-all duration-500 hover:border-white hover:bg-white/5">
                <p className="text-lg font-medium mb-2">
                  Ankit Kumar Singh — Resume
                </p>

                <p className="text-gray-400 text-sm mb-6">
                  Updated 2026 • PDF Format
                </p>

                <div className="flex gap-10">
                  <a
                    href="/resume.pdf"
                    target="_blank"
                    className="relative group/link"
                  >
                    View
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </a>

                  <a
                    href="/resume.pdf"
                    download
                    className="relative group/link"
                  >
                    Download
                    <span className="absolute left-0 -bottom-1 w-0 h-[1px] bg-white transition-all duration-300 group-hover/link:w-full"></span>
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </ProjectIntroOverlay>
  );
}