import { useLocale, useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const closedProjects = ["/Link.svg", "/Link.svg", "/Link.svg", "/Link.svg", "/Link.svg"];

const ClosedProjectsSection = () => {
  const t = useTranslations();
  const locale = useLocale();
  return (
    <section className="min-h-[90svh] bg-background relative overflow-hidden">
      <img
        src="/section-bg-white.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
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
              <h2 className="section-title">{t("We closed the door")}</h2>
            </div>
            <div className="items-center gap-3 hidden md:flex">
              <CarouselNext className="static translate-y-0" />
              <CarouselPrevious className="static translate-y-0" />
            </div>
          </div>
          <CarouselContent className="h-[65svh]">
            {closedProjects.map((src, index) => (
              <CarouselItem key={index} className="basis-1/2 md:basis-1/3 xl:basis-1/4 2xl:basis-1/5">
                <div className="group relative h-full overflow-hidden rounded-4xl">
                  <img
                    src={src}
                    alt={`Gallery Image`}
                    className="h-full w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center gap-3 justify-center md:hidden mt-9">
            <CarouselNext className="static translate-y-0" />
            <CarouselPrevious className="static translate-y-0" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default ClosedProjectsSection;
