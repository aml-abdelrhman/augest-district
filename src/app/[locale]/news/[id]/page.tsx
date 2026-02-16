import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { newsByIdQueryOptions } from "@/queries";
const NewsDetailsPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(newsByIdQueryOptions(id));

  return <HydrationBoundary state={dehydrate(queryClient)}></HydrationBoundary>;
};

export default NewsDetailsPage;
