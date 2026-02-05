import { Button } from "@/components/ui/button";
import {
  Building2Icon,
  FileIcon,
  HouseIcon,
  MapPin,
  PhoneIcon,
} from "lucide-react";
import { useTranslations } from "next-intl";
import React from "react";

const projectDetails = [
  {
    label: "الغرف",
    value: "3 - 3",
    icon: <HouseIcon />,
    hasBackground: true,
  },
  {
    label: "السعر من",
    value: "1,290,000",
    icon: <Building2Icon />,
    hasBackground: true,
  },
  {
    label: "أنواع الوحدات",
    value: "أدوار",
    icon: <HouseIcon />,
    hasBackground: true,
  },
  {
    label: "حالة المشروع",
    value: "متاح",
    icon: <Building2Icon />,
    hasBackground: true,
  },
  {
    label: "المدينة",
    value: "العارض, شمال الرياض",
    icon: <MapPin />,
    hasBackground: false,
  },
  {
    label: "المساحة",
    value: "215 - 215 م²",
    icon: <HouseIcon />,
    hasBackground: true,
  },
];

const FeatureCard = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-5">
        <div className="size-11 rounded-full border border-white flex items-center justify-center glass-bg">
          {icon}
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium text-start">{label}</p>
          <p className="text-xl md:text-2xl xl:text-3xl font-medium text-center">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};

export const HomeHeroSection = () => {
  const t = useTranslations();
  return (
    <section className="bg-[url('/hero-img.svg')] bg-top bg-cover bg-no-repeat min-h-svh w-full relative">
      <div className="absolute top-0 left-0 w-full h-[15svh] bg-linear-to-b from-[#897E6F] to-transparent z-5" />
      <div className="h-[57svh]"></div>
      <div className="space-y-11 text-center text-white container z-10 relative">
        <h1 className="font-light text-8xl">ادوار مشروع 21 – حي العارض</h1>
        <div className="flex items-center justify-center gap-9">
          {projectDetails.map((projectDetail, index) => (
            <FeatureCard
              key={index}
              label={projectDetail.label}
              value={projectDetail.value}
              icon={projectDetail.icon}
            />
          ))}
        </div>
        <div className="flex items-center justify-center">
          <Button size="lg" className="rounded-full z-5 hover:bg-white hover:text-primary hover:border-transparent" variant="outline">
            {t("Have an inquiry about a project")}
          </Button>
          <div className="h-5 w-2 bg-white -me-1 -ms-0.5 shrink-0 -z-1" />
          <Button
            size="lg"
            className="rounded-full hover:bg-white"
            variant="secondary"
            endContent={<PhoneIcon />}
          >
            {t("Phone call")}
          </Button>
          <div className="h-5 w-2 bg-white -mx-1 shrink-0" />
          <Button
            size="lg"
            className="rounded-full hover:bg-white"
            variant="secondary"
            endContent={<FileIcon />}
          >
            {t("Receive project file")}
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[60svh] bg-linear-to-t from-[#987344] to-transparent z-5" />
    </section>
  );
};
