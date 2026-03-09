"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { Project } from "@/types/project";
import ProjectPreview from "./ProjectPreview";
import MoreWorkButton from "./MoreWorkButton";

export default function WorkSection({ filter }: { filter: string }) {

  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [previewY, setPreviewY] = useState<number | null>(null);

  const sectionRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // FILTER LOGIC
  const filtered =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category.includes(filter));

  const handleHover = (
    e: React.MouseEvent<HTMLDivElement>,
    project: Project
  ) => {
    if (!sectionRef.current) return;

    const itemRect = e.currentTarget.getBoundingClientRect();
    const sectionRect = sectionRef.current.getBoundingClientRect();

    const y = itemRect.top - sectionRect.top + itemRect.height / 2;

    setPreviewY(y);
    setActiveProject(project);
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-white px-6 lg:px-32 py-32"
      onMouseLeave={() => {
        setActiveProject(null);
        setPreviewY(null);
      }}
    >

      {/* LEFT HEADING */}
      <div className="absolute left-10 lg:left-40 top-24 z-10 pointer-events-none">
        <p className="text-[16px] lg:text-[20px] tracking-widest text-black/40 uppercase">
          Recent Works
        </p>
      </div>

      {/* FLOAT PREVIEW */}
      {activeProject && previewY !== null && (
        <ProjectPreview
          project={activeProject}
          y={previewY}
          onView={() => router.push(`/work/${activeProject.slug}`)}
        />
      )}

      {/* PROJECT LIST */}
      <div className="flex flex-col">

        {filtered.map((project) => (

          <div
            key={project.slug}
            className="group flex items-center justify-between border-t border-black/10 py-12 lg:py-16 cursor-pointer"
            onMouseEnter={(e) => handleHover(e, project)}
            onClick={() => router.push(`/work/${project.slug}`)}
          >

            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-light text-black group-hover:opacity-40 transition-opacity duration-300">
              {project.title}
            </h2>

            <p className="text-[14px] md:text-[16px] text-black/60">
              {project.category}
            </p>

          </div>

        ))}

        <div className="border-t border-black/10" />

      </div>

      {/* MORE WORK BUTTON */}
      <div className="flex justify-center pt-24 lg:pt-32">
        <MoreWorkButton count={filtered.length} />
      </div>

    </section>
  );
}