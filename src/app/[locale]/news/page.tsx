import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
const NewsPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(newsQueryOptions({}));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 py-[17svh]">
        
      </div>
    </HydrationBoundary>
  );
};

export default NewsPage;
