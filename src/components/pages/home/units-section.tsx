import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const UnitsSection = () => {
  const t = useTranslations();
  return (
    <div className="h-[90svh] bg-main-50 relative">
      <img src="/section-bg.svg" alt="" className="absolute top-0 start-0" />
      <div className="container py-[17svh]">
        <Tabs defaultValue="account">
          <div className="flex items-center justify-between gap-5 flex-wrap">
            <div className="flex items-center gap-3">
              <img src="/section-logo.svg" alt="" />
              <h2 className="section-title">{t("Units Schedule")}</h2>
            </div>
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default UnitsSection;
