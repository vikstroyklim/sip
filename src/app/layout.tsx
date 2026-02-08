import React from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });
const montserrat = Montserrat({ subsets: ["latin", "cyrillic"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Премиальные SIP-панели | Энергоэффективные дома за 60 дней",
  description: "SIP-панели нового поколения. Строительство домов под ключ с экономией на отоплении до 70%.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={cn(inter.variable, montserrat.variable, "font-sans antialiased")}>
        {children}
      </body>
    </html>
  );
}
