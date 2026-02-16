import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import NewsCard from "./news-card";
const news = [
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
  {
    title: "أفضل العقارات المعروضة في حي الرمال بالرياض: وجهة...",
    img: "/gallary-section-img.png",
    description:
      "الجادة الأولى للتطوير العقاري هي أحد الشركات المتميزة في الاستثمار والتطوير العقاري، والتي يقع مقرها في الرياض. حققت الشركة نمو متسارعا لتصبح إحدى الشركات البارزة والرائدة في صناعة فرص الا...",
    created_at: "2026-02-11",
  },
];

const NewsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-main-200 relative overflow-hidden">
      <img
        src="/section-bg-dark-caramel.svg"
        alt="Section Background"
        className="absolute bottom-0 start-0 z-5 pointer-events-none"
      />
      <div className="py-[17svh] relative z-10 container">
        <Carousel
          opts={{
            align: "center",

            direction: locale === "ar" ? "rtl" : "ltr",
          }}
          className="w-full"
        >
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Hemma News")}</h2>
            </div>
              <div
              className="items-center gap-3 hidden md:flex z-20 relative"
              dir="ltr"
            >
              <CarouselPrevious className="static text-black border-black size-15 translate-y-0" />
              <CarouselNext className="static text-black border-black size-15 translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {news.map((item, index) => (
              <CarouselItem
                key={index}
                className="basis-[85%] lg:basis-1/2 2xl:basis-1/3 min-h-fit"
              >
                <NewsCard item={item} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-3 justify-center md:hidden mt-9" dir="ltr">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default NewsSection;
