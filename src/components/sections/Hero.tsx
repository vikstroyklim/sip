"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { ChevronDown, Play } from "lucide-react";

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  const stats = [
    { label: "Производство", value: "24/7", desc: "Автоматизированная линия" },
    { label: "Доставка", value: "24ч", desc: "Отгрузка со склада" },
    { label: "Гарантия", value: "50 лет", desc: "На конструктив" },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[100vh] lg:h-[115vh] w-full overflow-hidden flex items-center bg-[#050A18]">
      {/* Background Layer */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,107,53,0.08),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.05),transparent_40%)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Animated Orbs */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" 
        />
      </div>

      <div className="container relative z-10 px-4 mx-auto pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/80 text-xs font-bold uppercase tracking-[0.2em] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Завод СТК-панелей №1
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-black text-white leading-[0.9] tracking-tight mb-8 text-balance"
            >
              <span className="text-3xl sm:text-4xl lg:text-5xl block mb-2 text-white/90">ИННОВАЦИОННЫЕ</span>
              <span className="text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] animate-gradient-x whitespace-nowrap block mb-2">
                СТК-ПАНЕЛИ
              </span>
              <span className="text-3xl sm:text-4xl lg:text-5xl block text-white/90">ДЛЯ ВАШЕГО ДОМА</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-white/50 mb-12 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Производим усиленные СТК-панели с ЦСП обшивкой на автоматизированной линии. Максимальная прочность, огнестойкость и шумоизоляция по цене производителя.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start"
            >
              <Button variant="primary" size="lg" className="h-16 px-8 sm:px-10 rounded-full text-base sm:text-lg font-bold group overflow-hidden relative min-w-[220px]">
                <span className="relative z-10 flex items-center justify-center gap-2 whitespace-nowrap">
                  Рассчитать проект
                  <ChevronDown className="group-hover:translate-y-1 transition-transform" />
                </span>
                <motion.div 
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </Button>
              <button className="h-16 px-8 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center gap-4 group min-w-[220px]">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-white group-hover:scale-110 transition-transform shrink-0">
                  <Play size={16} fill="currentColor" />
                </div>
                <span className="text-white font-bold text-sm uppercase tracking-wider whitespace-nowrap">О производстве</span>
              </button>
            </motion.div>
          </div>

          {/* Right Content - Visual Feature */}
          <div className="w-full lg:w-1/2 relative perspective-2000">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotateY: 20, rotateX: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: -15, rotateX: 5 }}
              whileHover={{ rotateY: -5, rotateX: 0, scale: 1.05 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
              className="relative z-10"
            >
              {/* Main Product Image with Glass Effect */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-accent/20 rounded-[40px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative">
                  <div className="rounded-[40px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
                    <div className="relative rounded-[32px] overflow-hidden bg-white/5 flex items-center justify-center p-0 min-h-[400px]">
                      <img 
                        src="/herop.png" 
                        alt="Современный дом из СИП-панелей" 
                        className="w-full h-[450px] object-cover transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </div>
                  
                  {/* Floating Info Tags - Now outside the overflow-hidden container */}
                  <motion.div 
                    animate={{ y: [0, -15, 0], x: [0, -5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-12 -left-12 px-6 py-4 rounded-3xl bg-white/10 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                  >
                    <div className="text-accent font-black text-2xl">0%</div>
                    <div className="text-[10px] text-white/60 font-bold uppercase tracking-widest">Брак продукции</div>
                  </motion.div>

                  <motion.div 
                    animate={{ y: [0, 15, 0], x: [0, 5, 0] }}
                    transition={{ duration: 7, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                    className="absolute bottom-12 -right-12 px-6 py-4 rounded-3xl bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20"
                  >
                    <div className="text-white font-black text-2xl">ГОСТ</div>
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-widest">32567-2013</div>
                  </motion.div>
                </div>
              </div>
            </motion.div>

            {/* Background Decorative Rings */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none" />
          </div>
        </div>

        {/* Bottom Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24 mb-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="p-8 rounded-[32px] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors group"
            >
              <div className="text-white/40 text-xs font-bold uppercase tracking-widest mb-4 group-hover:text-accent transition-colors">
                {stat.label}
              </div>
              <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-white/40 text-sm">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] text-white/20 font-bold uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-accent to-transparent" />
      </motion.div>
    </section>
  );
};
