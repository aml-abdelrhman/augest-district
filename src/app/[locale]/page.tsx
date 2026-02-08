import React from "react";
import { HomeHeroSection } from "@/components/pages/home/hero";
import UnitsSection from "@/components/pages/home/units-section";
import GallarySection from "@/components/pages/home/gallary-section";
import ProjectFeatures from "@/components/pages/home/project-features";
import GuaranteesSection from "@/components/pages/home/guarantees-section";

const HomePage = () => {
  return (
    <div>
      <HomeHeroSection />
      <UnitsSection />
      <GallarySection />
      <ProjectFeatures />
      <GuaranteesSection />
    </div>
  );
};

export default HomePage;
