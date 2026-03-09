import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
};



import Navbar from "@/components/Navbar";
import IntroScreen from "@/components/IntroAnimation";
import Hero from "@/components/Hero";
import BriefInfoSection from "@/components/BriefInfoSection";
import WorkSection from "@/components/WorkSection";
import ImageParallaxGrid from "@/components/VideoParallaxGrid";
import Footer from "@/components/Footer";


export default function HomePage() {

  return (
    <>
      <Navbar />
      <IntroScreen />

      <main className="bg-white text-black">
        <Hero />
        <BriefInfoSection />
        <WorkSection filter="" />
        <ImageParallaxGrid />
      </main>

      <Footer />
    </>
  );
}