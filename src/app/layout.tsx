import React from "react";
import "./globals.css";
import SessionProvider from "@/components/SessionProvider";
import { Analytics } from "@vercel/analytics/next";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      {children}
      <Analytics />
    </SessionProvider>
  );
};

export default RootLayout;
