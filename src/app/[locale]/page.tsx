import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";

import ClosedProjectsSection from "@/components/pages/home/closed-projects-section";
import HomeHeroSection from "@/components/pages/home/home-hero";
import LatestProjectsSection from "@/components/pages/home/latest-projects-section";
import MostSoldProjectsSection from "@/components/pages/home/most-sold-projects-section";
import NewsSection from "@/components/pages/home/news-section";
import FeaturedProjectsSection from "@/components/pages/home/featured-projects-section";
import StatisticsSection from "@/components/pages/home/statistics-section";
import SuccessPartnersSection from "@/components/pages/home/success-partners-section";

const HomePage = async () => {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery(projectsQueryOptions({ latest: true })),
    queryClient.prefetchQuery(projectsQueryOptions({ featured: true })),
    queryClient.prefetchQuery(projectsQueryOptions({ most_sold: true })),
    queryClient.prefetchQuery(projectsQueryOptions({ status: "sold" })),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomeHeroSection />
      <LatestProjectsSection />
      <FeaturedProjectsSection />
      <MostSoldProjectsSection />
      <StatisticsSection />
      <SuccessPartnersSection />
      <ClosedProjectsSection />
      <NewsSection />
    </HydrationBoundary>
  );
};

export default HomePage;
