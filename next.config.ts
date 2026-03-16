// next.config.ts
import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: true,
  compress: true,

  images: {
    remotePatterns: [
  { protocol: "https", hostname: "fakestoreapi.com", pathname: "/**" },
  { protocol: "https", hostname: "placehold.co", pathname: "/**" },
  { protocol: "https", hostname: "placeimg.com", pathname: "/**" },
  { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
  { protocol: "https", hostname: "images.adsttc.com", pathname: "/**" },
  { protocol: "https", hostname: "i.imgur.com", pathname: "/**" },
  { protocol: "https", hostname: "imgs.search.brave.com", pathname: "/**" }, // ← تم الإضافة
{
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/**",
      },
],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/webp"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["lucide-react"],
  },

  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withNextIntl(nextConfig);