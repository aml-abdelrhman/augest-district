"use client";

import { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { BedDoubleIcon, MapPinIcon } from "lucide-react";
import { AreaIcon } from "@/icons";
import { Progress } from "@/components/ui/progress";
import { formatNumber } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const ProjectCard = ({ project }: { project: Project }) => {
  const locale = useLocale() as "ar" | "en";
  const t = useTranslations();

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block h-full"
    >
      <div className="relative overflow-hidden rounded-4xl shadow-md hover:shadow-2xl transition-all duration-500">

        <img
          src={project?.gallery?.[0] || "/gallary-section-img.png"}
          alt={project.title[locale]}
          className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-5 start-5 z-10 flex items-center gap-3">
          <Badge className="bg-white/90 text-primary font-medium flex items-center gap-2 backdrop-blur-sm">
            <MapPinIcon className="size-4" />
            {project.city[locale]}
          </Badge>
        </div>

        {/* Bottom Content Overlay */}
        <div className="absolute bottom-0 p-6 w-full text-white z-10 space-y-4">

          {/* Title */}
          <h3 className="text-2xl font-bold">
            {project.title[locale]}
          </h3>

          {/* Sold Progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {project?.sold_percentage}% {t("sold units")}
              </span>
              <span>
                {project.units_count || 0} {t("units")}
              </span>
            </div>

            <Progress
              value={project?.sold_percentage || 0}
              className="h-2 bg-white/30"
            />
          </div>

          {/* Info Row */}
          <div className="flex justify-between items-center pt-2">

            {/* Left: Rooms + Area */}
            <div className="flex gap-6 text-sm">
              <div className="flex items-center gap-1">
                <BedDoubleIcon className="size-4" />
                {project.rooms}
              </div>

              <div className="flex items-center gap-1">
                <AreaIcon className="size-4" />
                {project.area} {t("m")}
              </div>
            </div>

            {/* Price */}
            <div className="text-lg font-bold">
              {formatNumber(Number(project.price_from))}{" "}
              <span className="text-sm font-normal">
                {t("SAR")}
              </span>
            </div>

          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;