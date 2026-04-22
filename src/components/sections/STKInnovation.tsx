 "use client";

 import React from "react";
 import { motion } from "framer-motion";
 import { ShieldCheck, Flame, Droplets, Volume2, Ruler, Building2 } from "lucide-react";
 import { Button } from "@/components/ui/Button";

 const items = [
   { icon: <ShieldCheck className="w-7 h-7" />, title: "Прочность ЦСП", text: "Цементно‑стружечная плита 12 мм обеспечивает высокую жесткость и стабильную геометрию." },
   { icon: <Flame className="w-7 h-7" />, title: "Пожаробезопасность", text: "Состав ЦСП + минеральные утеплители дают повышенную огнестойкость." },
   { icon: <Droplets className="w-7 h-7" />, title: "Влагостойкость", text: "ЦСП устойчива к влаге и биологическому воздействию, подходит для влажных зон." },
   { icon: <Volume2 className="w-7 h-7" />, title: "Тишина внутри", text: "Массив ЦСП улучшает звукоизоляцию по сравнению с лёгкими обшивками." },
   { icon: <Ruler className="w-7 h-7" />, title: "Точность", text: "Производство и раскрой на оборудовании, точность до 1 мм и повторяемость." },
   { icon: <Building2 className="w-7 h-7" />, title: "Производство открыто", text: "Посещение цеха без записи по будням 10:00–17:00. Видно качество на месте." },
 ];

 export const STKInnovation = () => {
   return (
     <section id="stk" className="relative py-28 bg-[#050A18] overflow-hidden">
       <div className="absolute inset-0 z-0">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(255,107,53,0.06),transparent_45%)]" />
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(59,130,246,0.04),transparent_45%)]" />
       </div>

       <div className="container relative z-10 mx-auto px-4">
         <div className="text-center max-w-4xl mx-auto mb-16">
           <motion.div
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-[0.2em] mb-6"
           >
             Новое поколение
           </motion.div>

           <motion.h2
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-4xl md:text-6xl font-black text-white leading-[1.05] mb-5"
           >
             СТК‑панели на ЦСП — инновация в каркасном домостроении
           </motion.h2>

           <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white/60 text-lg md:text-xl leading-relaxed mb-10"
          >
            СТК — это переосмысление классических панелей: обшивка из ЦСП даёт огне‑ и влагостойкость, высокую жёсткость и лучшую звукоизоляцию. Комбинации с ППС, минплитой или PIR позволяют подобрать требуемую теплоэффективность.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start mb-14">
          {/* Left Column: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-[40px] overflow-hidden border border-white/10 h-[500px] lg:h-auto group lg:sticky lg:top-32 min-h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1581094794329-c8112a4e5190?q=80&w=1200&auto=format&fit=crop" 
              alt="Структура СТК-панели" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            
            <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-black uppercase tracking-widest mb-3">
                Технология
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Монолитная прочность</h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-md">
                Благодаря высокой плотности ЦСП (1300 кг/м³), стены из СТК-панелей ощущаются как каменные, не боятся ударов и позволяют вешать тяжелую мебель в любой точке.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Features Grid */}
          <div className="grid grid-cols-1 gap-4">
            {items.map((it, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 p-6 rounded-[32px] bg-white/[0.03] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] hover:border-white/20 transition-all group"
              >
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {it.icon}
                </div>
                <div>
                  <div className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">{it.title}</div>
                  <div className="text-white/60 leading-relaxed text-sm">{it.text}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
           <Button variant="primary" size="lg" className="h-14 px-10 rounded-2xl whitespace-nowrap" onClick={() => { if (typeof window !== "undefined") window.location.hash = "catalog"; }}>
             Перейти в каталог СТК
           </Button>
           <a href="#process" className="h-14 px-10 rounded-2xl border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center justify-center text-white/80 font-bold whitespace-nowrap">
             Посетить производство
           </a>
         </div>
       </div>
     </section>
   );
 };
