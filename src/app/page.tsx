"use client";
import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import dynamic from "next/dynamic";
import { Hero } from "@/components/sections/Hero";
import { Header } from "@/components/sections/Header";
import { Features } from "@/components/sections/Features";
const Constructor3D = dynamic(() => import("@/components/sections/Constructor3D").then(mod => mod.Constructor3D), { 
  ssr: false,
  loading: () => <div className="h-[600px] bg-[#050A18] flex items-center justify-center text-white/20 uppercase font-black tracking-widest">Загрузка 3D-модуля...</div>
});
import { Catalog } from "@/components/sections/Catalog";
import { CatalogHouses } from "@/components/sections/CatalogHouses";
import { Calculator } from "@/components/sections/Calculator";
import { Process } from "@/components/sections/Process";
import { SocialProof } from "@/components/sections/SocialProof";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-background">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-50 origin-left"
        style={{ scaleX }}
      />

      <Header />
      <Hero />
      <Features />
      <Constructor3D />
      <CatalogHouses />
      <Catalog />
      <Calculator />
      <Process />
      <SocialProof />
      <Footer />
    </main>
  );
}
