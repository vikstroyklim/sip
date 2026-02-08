"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, Calculator, Truck, Layers, PhoneCall } from "lucide-react";

const steps = [
  {
    title: "Консультация",
    desc: "Подбор оптимальной толщины (124, 174 или 224 мм) и типа панелей под ваши задачи.",
    icon: <PhoneCall />,
    duration: "15 минут",
  },
  {
    title: "Точный расчет",
    desc: "Составление сметы на панели, пиломатериал и комплектующие для вашего объекта.",
    icon: <Calculator />,
    duration: "1-2 часа",
  },
  {
    title: "Производство",
    desc: "Нарезка панелей по вашим размерам и прессование на автоматизированной линии.",
    icon: <Layers />,
    duration: "от 1 дня",
  },
  {
    title: "Комплектация",
    desc: "Подбор сухого строганного бруса, монтажной пены и специального крепежа.",
    icon: <CheckCircle2 />,
    duration: "в наличии",
  },
  {
    title: "Доставка",
    desc: "Оперативная отгрузка и доставка собственным транспортом по Москве и области.",
    icon: <Truck />,
    duration: "от 24 часов",
  },
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="py-32 bg-[#050A18] relative overflow-hidden" ref={containerRef}>
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-6"
          >
            Ваш путь к дому
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tight">
            КАК МЫ <span className="text-accent">РАБОТАЕМ</span>
          </h2>
          <p className="text-white/40 text-lg max-w-2xl mx-auto font-medium">
            Прозрачный процесс от идеи до готового домокомплекта на вашем участке
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2 hidden md:block">
            <motion.div 
              className="absolute top-0 left-0 right-0 bg-accent origin-top shadow-[0_0_15px_rgba(255,107,53,0.5)]"
              style={{ scaleY: pathLength, height: "100%" }}
            />
          </div>

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={cn(
                  "flex flex-col md:flex-row items-center gap-10 md:gap-0",
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}
              >
                {/* Content */}
                <div className="w-full md:w-[42%]">
                  <div className={cn(
                    "p-10 rounded-[40px] bg-white/[0.02] border border-white/5 hover:border-accent/30 transition-all duration-500 backdrop-blur-sm group",
                    index % 2 === 0 ? "md:text-right" : "md:text-left"
                  )}>
                    <div className={cn(
                      "text-accent font-black text-[10px] uppercase tracking-[0.2em] mb-4",
                      index % 2 === 0 ? "md:justify-end" : "md:justify-start",
                      "flex items-center gap-2"
                    )}>
                      <span className="w-8 h-px bg-accent/30" />
                      {step.duration}
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-widest group-hover:text-accent transition-colors">{step.title}</h3>
                    <p className="text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">{step.desc}</p>
                  </div>
                </div>

                {/* Icon Circle */}
                <div className="relative z-10 w-20 h-20 shrink-0 mx-auto md:mx-0 flex items-center justify-center">
                  <div className="absolute inset-0 bg-accent rounded-3xl rotate-45 opacity-10 group-hover:rotate-90 transition-transform duration-700" />
                  <div className="relative w-16 h-16 rounded-2xl bg-[#0A1628] border border-white/10 flex items-center justify-center text-white shadow-2xl group-hover:border-accent/50 transition-colors">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      className="text-accent group-hover:scale-110 transition-transform"
                    >
                      {step.icon}
                    </motion.div>
                  </div>
                  {/* Step Number */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-white text-[10px] font-black flex items-center justify-center shadow-lg border-4 border-[#050A18]">
                    0{index + 1}
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block w-[42%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

import { cn } from "@/lib/utils";
