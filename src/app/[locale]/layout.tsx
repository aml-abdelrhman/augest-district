import type { Metadata } from "next";
import MainLayout from "@/layouts/main-layout";
import { locales } from "@/i18n/config";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Cairo, Urbanist } from "next/font/google";
import { getMessages, getTranslations } from "next-intl/server";

// خطوط Google
const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

const urbanist = Urbanist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-urbanist",
});

// خطوط محلية
const handicrafts = localFont({
  src: [
    { path: "../fonts/ArbFonts.com-(2)/ArbFONTS-TheYearofHandicrafts-Regular.otf", weight: "400", style: "normal" },
    { path: "../fonts/ArbFonts.com-(2)/ArbFONTS-TheYearofHandicrafts-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-handicrafts",
});

const acumin = localFont({
  src: [{ path: "../fonts/AcuminVariableConcept.otf", weight: "100 900", style: "normal" }],
  variable: "--font-acumin",
});

const geDinarTwo = localFont({
  src: [
    { path: "../fonts/ge-dinar-two/GE-Dinar-Two-Light-Italic.woff", weight: "300", style: "normal" },
    { path: "../fonts/ge-dinar-two/GE-Dinar-Two-Light.woff", weight: "300", style: "normal" },
    { path: "../fonts/ge-dinar-two/GE-Dinar-Two-Medium-Italic.woff", weight: "500", style: "normal" },
    { path: "../fonts/ge-dinar-two/GE-Dinar-Two-Medium.woff", weight: "500", style: "normal" },
  ],
  variable: "--font-ge-dinar-two",
});

// Metadata ديناميكي
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const t = await getTranslations();
  const locale = (await params).locale as "en" | "ar";
  return {
    // title: t("Hemma"),
    // description: t("Hemma for real estate investments and developments"),
    // openGraph: {
    //   title: t("Hemma"),
    //   description: t("Hemma for real estate investments and developments"),
    //   type: "website",
    //   siteName: "Hemma",
    //   locale,
    // },
    // twitter: {
    //   title: t("Hemma"),
    //   description: t("Hemma for real estate investments and developments"),
    //   card: "summary_large_image",
    //   site: "@Hemma",
    //   creator: "@Hemma",
    // },
    // keywords: [
    //   "Hemma",
    //   "projects",
    //   "developments",
    //   "real estate",
    //   "investments",
    //   "real estate investments",
    //   "real estate development",
    //   "real estate agency",
    //   "real estate company",
    //   "real estate investments company",
    //   "real estate development company",
    //   "real estate agency company",
    //   "real estate company company",
    // ],
    // icons: {
    //   icon: "/logo.svg",
    // },
  };
}

// إنشاء static params لكل اللغات
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {

  const { locale } = await params;
  if (!locales.includes(locale as any)) {
    return notFound();
  }

  const localeTyped = locale as "en" | "ar";

  const messages = await getMessages({ locale: localeTyped });

  return (
    <html lang={localeTyped} suppressHydrationWarning>
  <body
    suppressHydrationWarning
    dir={localeTyped === "ar" ? "rtl" : "ltr"}
    className="dark"
  >
    <NextIntlClientProvider locale={localeTyped} messages={messages}>
      <Providers>
        <MainLayout>{children}</MainLayout>
      </Providers>
    </NextIntlClientProvider>
  </body>
</html>
     
  );
}