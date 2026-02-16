"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { newsQueryOptions } from "@/queries";
import NewsCard from "./news-card";
import { useTranslations } from "next-intl";

const NewsList = () => {
  const t = useTranslations();
  const { data } = useSuspenseQuery(newsQueryOptions({}));

  return (
    <section className="bg-white min-h-screen">
      <div className="bg-main-200 py-20 lg:py-32">
        <div className="container flex flex-col items-center text-center gap-5">
          <img
            src="/section-logo.svg"
            alt="Section Logo"
            className="pointer-events-none w-16"
          />
          <h1 className="text-4xl lg:text-5xl font-bold text-cyan-950">
            {t("Hemma News")}
          </h1>
          <p className="text-cyan-950/60 max-w-2xl mx-auto">
            {t(
              "Discover the latest news and updates from Hemma Real Estate Development.",
            )}
          </p>
        </div>
      </div>

      <div className="container py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-12">
          {data?.data?.map((item) => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>

        {data?.data?.length === 0 && (
          <div className="text-center py-20 text-cyan-950/40">
            {t("No news found")}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsList;
