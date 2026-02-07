import React from "react";
import { HomeHeroSection } from "@/components/pages/home/hero";
import UnitsSection from "@/components/pages/home/units-section";
import GallarySection from "@/components/pages/home/gallary-section";
import ProjectFeatures from "@/components/pages/home/project-features";

const HomePage = () => {
  return (
    <div>
      <HomeHeroSection />
      <UnitsSection />
      <GallarySection />
      <ProjectFeatures />
    </div>
  );
};

export default HomePage;
