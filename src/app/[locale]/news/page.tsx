import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
import NewsList from "@/components/pages/news";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations();

  return {
    title: t("News"),
    description: t("Hemma news and articles"),
  };
}

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
