"use client";

import { projects } from "@/data/projects";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function WorkGrid({ filter }: { filter: string }) {

  const router = useRouter();

  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [page, setPage] = useState(1);

  const ITEMS_PER_PAGE = 6;

  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE) || 1;

  const paginatedProjects = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className="w-full">

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-16 lg:gap-24">

        {paginatedProjects.map((project) => (

          <div
            key={project.slug}
            className="group relative cursor-pointer"
            onClick={() => router.push(`/work/${project.slug}`)}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setCursor({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
          >

            {/* IMAGE CARD */}
            <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-neutral-100">

              <Image
                src={project.previewImage}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />

              {/* CURSOR FOLLOW VIEW (DESKTOP ONLY) */}
              <div
                className="absolute pointer-events-none hidden md:block"
                style={{
                  left: cursor.x - 50,
                  top: cursor.y - 50,
                }}
              >
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition text-sm lg:text-base shadow-lg">
                  View
                </div>
              </div>

            </div>

            {/* TITLE */}
            <h3 className="text-[22px] sm:text-[26px] lg:text-[32px] mt-4 sm:mt-6 font-light text-black tracking-tight">
              {project.title}
            </h3>

          </div>

        ))}

      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-6 sm:gap-8 mt-16 sm:mt-20 lg:mt-24">

        {/* PREVIOUS */}
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 1))}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <ChevronLeft size={20} />
        </button>

        {/* PAGE COUNT */}
        <span className="text-xs sm:text-sm tracking-widest text-black">
          {page} / {totalPages}
        </span>

        {/* NEXT */}
        <button
          onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
          className="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full border border-black flex items-center justify-center hover:bg-black hover:text-white transition"
        >
          <ChevronRight size={20} />
        </button>

      </div>

    </section>
  );
}