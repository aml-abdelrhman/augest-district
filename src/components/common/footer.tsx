import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "../ui/button";

const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="bg-main-600 py-[11svh] relative overflow-hidden font-cairo">
      <img
        src="/footer-bg.svg"
        alt="footer-img"
        className="absolute bottom-0 end-0 z-5 pointer-events-none"
      />
      <img
        src="/footer-img.svg"
        alt="footer-img"
        className="absolute top-0 start-0 z-5 pointer-events-none"
      />
      <div className="container">
        <div className="relative z-10 grid grid-cols-2 gap-3">
          <div className=""></div>
          <div className="space-y-7 text-primary-foreground">
            <Image
              src="/logo.svg"
              alt="footer-logo"
              width={120}
              height={40}
              className="w-full h-auto max-w-30"
            />
            <p className="text-lg">{t("footer.description")}</p>
            <Button variant="link" size="lg" className="font-inter">{t("Register your interest")}</Button>
          </div>
        </div>
      </div>
      <div className="container">
        
      </div>
    </footer>
  );
};

export default Footer;
