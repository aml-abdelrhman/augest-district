import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { projectsQueryOptions } from "@/queries";
import ProjectsList from "@/components/pages/projects";

const ProjectsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(projectsQueryOptions({ page: currentPage }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProjectsList />
    </HydrationBoundary>
  );
};

export default ProjectsPage;
