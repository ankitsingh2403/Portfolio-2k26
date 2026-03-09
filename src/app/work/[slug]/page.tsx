import { projects } from "@/data/projects";
import dynamic from "next/dynamic";
import ProjectIntroLayout from "@/components/ProjectIntroOverlay";
import Footer from "@/components/Footer";

// ✅ Server-safe dynamic imports (NO ssr:false)
const ProjectHero = dynamic(() => import("@/components/ProjectHero"), {
  loading: () => <SkeletonSection />,
});

const LaptopMockup = dynamic(() => import("@/components/LaptopMockup"), {
  loading: () => <SkeletonSection />,
});

type PageProps = {
  params: {
    slug: string;
  };
};

export default function Page({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl">
        Project not found
      </div>
    );
  }

  return (
    <ProjectIntroLayout title={project.title}>
      <ProjectHero project={project} />

      {project.video && (
        <div className="mt-24 sm:mt-32 lg:mt-40">
          <LaptopMockup video={project.video} />
        </div>
      )}
      <Footer />
    </ProjectIntroLayout>
  );
}

/* ---------- Skeleton Loader ---------- */
function SkeletonSection() {
  return (
    <div className="w-full min-h-[60vh] flex items-center justify-center bg-neutral-100 animate-pulse">
      <div className="w-3/4 h-64 bg-neutral-200 rounded-xl rounded-lg" />
    </div>
  );
}
