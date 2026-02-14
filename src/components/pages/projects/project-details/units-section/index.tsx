"use client";
import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UnitCard from "./unit-card";
import { useParams } from "next/navigation";
import { useSuspenseQuery } from "@tanstack/react-query";
import { projectQueryOptions } from "@/queries";

const UnitsSection = () => {
  const t = useTranslations();
  const { id } = useParams<{ id: string }>();
  const { data: project } = useSuspenseQuery(projectQueryOptions(id));

  const units = project?.units || [];

  const availableUnits = units.filter((unit) => unit.status === "available");
  const soldUnits = units.filter((unit) => unit.status === "sold");
  const reservedUnits = units.filter((unit) => unit.status === "reserved");

  return (
    <section className="min-h-[90svh] bg-main-50 relative">
      <img
        src="/section-bg-caramel.svg"
        alt="Section Background"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="container py-[17svh] relative z-10  ">
        <Tabs defaultValue="all" className="flex-col">
          <div className="flex items-center sm:justify-between gap-5 max-sm:flex-col flex-wrap mb-[7svh]">
            <div className="flex items-center gap-3 max-sm:flex-col">
              <img
                src="/section-logo.svg"
                alt="Section Logo"
                className="pointer-events-none"
              />
              <h2 className="section-title">{t("Units Schedule")}</h2>
            </div>
            <TabsList>
              <TabsTrigger value="all">{t("All")}</TabsTrigger>
              <TabsTrigger value="available">{t("Available")}</TabsTrigger>
              <TabsTrigger value="sold">{t("Sold")}</TabsTrigger>
              <TabsTrigger value="reserved">{t("Reserved")}</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="all">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {units.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="available">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {availableUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sold">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {soldUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reserved">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5">
              {reservedUnits.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default UnitsSection;
