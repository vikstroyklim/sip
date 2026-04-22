"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Search, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "project-scandi",
    title: "Проект 'Скандинавия'",
    area: "85 м²",
    floors: "1 этаж",
    bedrooms: "2 спальни",
    image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=2000&auto=format&fit=crop",
    category: "Modern",
    badge: "Хит",
    description: "Компактный и уютный дом в скандинавском стиле. Открытая планировка, панорамные окна и высокая энергоэффективность.",
    price: 2850000,
    specs: [
      { label: "Срок сборки", value: "21 день" },
      { label: "Фундамент", value: "Ж/Б Сваи" },
      { label: "Кровля", value: "Металлочерепица" }
    ]
  },
  {
    id: "project-alps",
    title: "Проект 'Альпийский'",
    area: "145 м²",
    floors: "2 этажа",
    bedrooms: "3 спальни",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop",
    category: "Classic",
    badge: "Выбор года",
    description: "Просторный семейный дом с террасой и вторым светом. Идеальное сочетание классического стиля и современных технологий.",
    price: 4200000,
    specs: [
      { label: "Срок сборки", value: "35 дней" },
      { label: "Фундамент", value: "Монолитная плита" },
      { label: "Кровля", value: "Мягкая кровля" }
    ]
  },
  {
    id: "project-minimal",
    title: "Проект 'Минимал'",
    area: "110 м²",
    floors: "1 этаж",
    bedrooms: "3 спальни",
    image: "https://images.unsplash.com/photo-1600607687940-c52af084399b?q=80&w=2000&auto=format&fit=crop",
    category: "Modern",
    badge: "Новинка",
    description: "Современный одноэтажный дом с плоской кровлей и лаконичным дизайном. Функциональность в каждой детали.",
    price: 3650000,
    specs: [
      { label: "Срок сборки", value: "28 дней" },
      { label: "Фундамент", value: "Ж/Б Сваи" },
      { label: "Кровля", value: "Плоская (ПВХ)" }
    ]
  }
];

const ProjectCard = ({ project }: { project: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative min-h-[750px] h-full w-full perspective-2000 group">
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative w-full h-full preserve-3d"
      >
        {/* Front Side */}
        <div className="absolute inset-0 backface-hidden rounded-[40px] overflow-hidden bg-white/[0.03] border border-white/10 backdrop-blur-md flex flex-col p-7 hover:bg-white/[0.08] hover:border-white/20 transition-all duration-500">
          <div className="relative h-36 w-full shrink-0 mb-4">
            <div className="absolute inset-0 bg-white/5 rounded-3xl overflow-hidden border border-white/10">
              <img 
                src={project.image} 
                alt={project.title}
                crossOrigin="anonymous"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {project.badge && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">
                {project.badge}
              </div>
            )}
            
            <div className="absolute top-3 right-3 flex flex-col gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className="w-9 h-9 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-white/40 hover:text-accent border border-white/10 transition-all"
              >
                <Heart size={18} className={cn(isLiked && "fill-accent text-accent")} />
              </button>
              <button 
                onClick={() => setIsFlipped(true)}
                className="w-9 h-9 bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center text-white/40 hover:text-accent border border-white/10 transition-all"
              >
                <Info size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex flex-col flex-grow min-h-0">
            <h3 className="text-xl font-black text-white mb-1.5 group-hover:text-accent transition-colors line-clamp-1">{project.title}</h3>
            <p className="text-white/40 text-xs mb-4 line-clamp-2 leading-relaxed h-8">{project.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Площадь</div>
                  <div className="text-[10px] font-bold text-white/80">{project.area}</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Этажи</div>
                  <div className="text-[10px] font-bold text-white/80">{project.floors}</div>
                </div>
                <div className="p-2 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-[8px] text-white/20 uppercase font-black tracking-widest mb-1">Спальни</div>
                  <div className="text-[10px] font-bold text-white/80">{project.bedrooms}</div>
                </div>
              </div>
              
              <div className="space-y-1.5">
                {project.specs.map((spec: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-[10px]">
                    <span className="text-white/40 uppercase tracking-widest font-bold">{spec.label}</span>
                    <span className="text-white/80 font-black">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="shrink-0">
                <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-0.5">От</div>
                <div className="text-2xl font-black text-white whitespace-nowrap">
                  {project.price.toLocaleString('ru-RU')} <span className="text-accent">₽</span>
                </div>
              </div>
              <Button variant="primary" size="sm" className="rounded-xl h-11 flex-grow bg-accent hover:bg-accent/90 shadow-[0_10px_20px_rgba(255,107,53,0.3)] text-xs font-black uppercase tracking-widest whitespace-nowrap">
                Подробнее
              </Button>
            </div>
          </div>
        </div>

        {/* Back Side */}
        <div className="absolute inset-0 backface-hidden rounded-[40px] overflow-hidden bg-[#0a1125] border border-accent/30 p-7 flex flex-col justify-between [transform:rotateY(180deg)]">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3 text-accent">
                <Info size={20} />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Технические данные</span>
              </div>
              <button 
                onClick={() => setIsFlipped(false)}
                className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-all"
              >
                ✕
              </button>
            </div>
            <h3 className="text-2xl font-black text-white mb-4">{project.title}</h3>
            <div className="space-y-4">
              <p className="text-white/60 text-xs leading-relaxed line-clamp-3">{project.description}</p>
              <div className="grid grid-cols-2 gap-3">
                {project.specs.map((spec: any, i: number) => (
                  <div key={i} className="p-3 bg-white/5 rounded-2xl border border-white/10">
                    <div className="text-[9px] text-white/20 uppercase font-black mb-1">{spec.label}</div>
                    <div className="text-[11px] font-bold text-white/80">{spec.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Стоимость:</span>
              <span className="text-2xl font-black text-white">{project.price.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Button variant="primary" size="lg" className="w-full rounded-[24px] h-14 bg-accent hover:bg-accent/90 shadow-[0_15px_30px_rgba(255,107,53,0.3)] font-black uppercase tracking-widest text-sm whitespace-nowrap">
              Получить расчет
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const CatalogHouses = () => {
  const [search, setSearch] = useState("");

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="houses" className="py-32 bg-[#050A18] relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,107,53,0.03),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(59,130,246,0.02),transparent_40%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] mb-8"
            >
              Каталог проектов
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase"
            >
              Выберите <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] animate-gradient-x">
                Свой дом
              </span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-80"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={20} />
            <input
              type="text"
              placeholder="Поиск проекта..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all backdrop-blur-md"
            />
          </motion.div>
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
