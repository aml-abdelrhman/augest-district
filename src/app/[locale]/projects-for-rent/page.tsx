import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ProjectsForRentList from "@/components/pages/projects/projects-for-rent";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("Projects"),
    description: t("Hemma projects and developments"),
  };
}

const ProjectsForRent = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(
    projectsQueryOptions({ page: currentPage, is_ready_for_sale: false }),
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsForRentList />
    </HydrationBoundary>
  );
};

export default ProjectsForRent;
