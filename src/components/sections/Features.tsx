"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, ShieldCheck, ThermometerSnowflake, Timer, Wallet, Leaf } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Качество по ГОСТ",
    description: "Собственное производство, прессование и термообработка: жесткий контроль на каждом этапе.",
    stat: "100",
    suffix: "%",
  },
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Прочность ЦСП",
    description: "Цементно‑стружечные плиты 12 мм: высокая жесткость, огне‑ и влагостойкость.",
    stat: "12",
    suffix: "мм",
  },
  {
    icon: <ThermometerSnowflake className="w-8 h-8" />,
    title: "Теплоэффективность",
    description: "Опции утепления: ППС‑16Ф или каменная плита для повышенной огнестойкости.",
    stat: "16",
    suffix: "кг/м³",
  },
  {
    icon: <Timer className="w-8 h-8" />,
    title: "Скорость отгрузки",
    description: "Складская программа позволяет отгружать стандартные панели в день оплаты.",
    stat: "24",
    suffix: "ч",
  },
  {
    icon: <Leaf className="w-8 h-8" />,
    title: "Эко-клей",
    description: "Полиуретановый однокомпонентный клей без содержания формальдегида и смол.",
    stat: "0",
    suffix: "%",
  },
  {
    icon: <Timer className="w-8 h-8" />,
    title: "Точность раскроя",
    description: "Автоматизированная нарезка домокомплектов с точностью до 1 миллиметра.",
    stat: "1",
    suffix: "мм",
  },
];

const Counter = ({ value, suffix }: { value: string; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const target = parseFloat(value);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = target / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(target % 1 === 0 ? Math.floor(start) : parseFloat(start.toFixed(1)));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref} className="text-4xl font-bold text-accent">
      {count}{suffix}
    </span>
  );
};

export const Features = () => {
  return (
    <section id="tech" className="relative py-32 bg-[#050A18] overflow-hidden">
      {/* Background Layer - Matching Hero Style */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,107,53,0.05),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(59,130,246,0.03),transparent_40%)]" />
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        {/* Animated Orb */}
        <motion.div 
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, -30, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[150px]" 
        />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            Технологии превосходства
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6 leading-[1.1]"
          >
            ПОЧЕМУ ВЫБИРАЮТ <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] animate-gradient-x">
              НАШЕ ПРОИЗВОДСТВО
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/40 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Мы объединили автоматизацию, жесткий контроль качества и премиальное сырье для создания идеальных СТК‑панелей из ЦСП.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-2000">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.2 }
              }}
              className="group relative p-10 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500"
            >
              {/* Card Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-br from-accent/20 to-transparent rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-accent mb-8 group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-500 shadow-2xl">
                  {feature.icon}
                </div>
                
                <div className="flex items-baseline gap-1 mb-4">
                  <Counter value={feature.stat} suffix={feature.suffix} />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Corner Element */}
              <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/5 rounded-tr-2xl group-hover:border-accent/20 transition-colors" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
