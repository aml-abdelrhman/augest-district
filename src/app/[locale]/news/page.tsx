import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
import NewsList from "@/components/pages/news";

const NewsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(newsQueryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewsList />
    </HydrationBoundary>
  );
};

export default NewsPage;
