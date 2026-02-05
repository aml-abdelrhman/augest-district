import React from "react";
import { HomeHeroSection } from "@/components/pages/home/hero";

const HomePage = () => {
  return (
    <div>
      <HomeHeroSection />
      <div className="h-[90svh] bg-main-50 relative">
        <img src="/section-bg.svg" alt="" className="absolute top-0 start-0" />
      </div>
    </div>
  );
};

export default HomePage;
