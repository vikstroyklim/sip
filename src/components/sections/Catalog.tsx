"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Search, Heart, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const products = [
  {
    id: "sip-osp",
    title: "СИП-панель ОСП (OSB-3)",
    material: "OSB-3 12 мм",
    insulation: "ППС-16Ф",
    image: "https://images.unsplash.com/photo-1628744448840-55bdb2497bd4?q=80&w=2048&auto=format&fit=crop",
    category: "Wall",
    badge: "Популярное",
    description: "Классическая СИП-панель на основе влагостойкой ориентированно-стружечной плиты. Идеально подходит для стен, перекрытий и крыш.",
    variants: [
      { size: "2500х1250х124", thickness: "124 мм", price: 4350 },
      { size: "2500х1250х174", thickness: "174 мм", price: 4850 },
      { size: "2500х1250х224", thickness: "224 мм", price: 5350 },
    ]
  },
  {
    id: "sip-csp",
    title: "СИП-панель ЦСП",
    material: "ЦСП 12 мм",
    insulation: "ППС-16Ф",
    image: "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2070&auto=format&fit=crop",
    category: "Wall",
    badge: "Огнестойкая",
    description: "Панель с цементно-стружечной плитой. Обладает повышенной пожаробезопасностью, влагостойкостью и звукоизоляцией.",
    variants: [
      { size: "2700х1250х124", thickness: "124 мм", price: 6800 },
      { size: "2700х1250х174", thickness: "174 мм", price: 7200 },
    ]
  }
];

const ProjectCard = ({ product }: { product: any }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [isLiked, setIsLiked] = useState(false);

  const price = selectedVariant?.price;

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
                src={product.image} 
                alt={product.title}
                crossOrigin="anonymous"
                className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {product.badge && (
              <div className="absolute top-3 left-3 px-3 py-1 bg-accent text-white text-[9px] font-black rounded-full uppercase tracking-widest shadow-lg">
                {product.badge}
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
            <h3 className="text-xl font-black text-white mb-1.5 group-hover:text-accent transition-colors line-clamp-1">{product.title}</h3>
            <p className="text-white/40 text-xs mb-4 line-clamp-2 leading-relaxed h-8">{product.description}</p>
            
            <div className="space-y-3 mb-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Материал</div>
                  <div className="text-[11px] font-bold text-white/80 truncate">{product.material}</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                  <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-1">Утеплитель</div>
                  <div className="text-[11px] font-bold text-white/80 truncate">{product.insulation}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/40">Размер (мм):</label>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant: any) => (
                    <button
                      key={variant.size}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedVariant(variant);
                      }}
                      className={cn(
                        "px-2 py-2 text-[9px] font-black rounded-xl border transition-all duration-300 uppercase tracking-widest",
                        selectedVariant?.size === variant.size
                          ? "border-accent bg-accent/10 text-accent shadow-[0_0_15px_rgba(255,107,53,0.2)]"
                          : "border-white/5 text-white/40 hover:border-white/20 hover:bg-white/5"
                      )}
                    >
                      {variant.size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between gap-3">
              <div className="shrink-0">
                <div className="text-[9px] text-white/20 uppercase font-black tracking-widest mb-0.5">Цена</div>
                <div className="text-2xl font-black text-white whitespace-nowrap">
                  {price.toLocaleString('ru-RU')} <span className="text-accent">₽</span>
                </div>
              </div>
              <Button variant="primary" size="sm" className="rounded-xl h-11 flex-grow bg-accent hover:bg-accent/90 shadow-[0_10px_20px_rgba(255,107,53,0.3)] text-xs font-black uppercase tracking-widest">
                Заказать
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
            <h3 className="text-2xl font-black text-white mb-4">{product.title}</h3>
            <div className="space-y-4">
              <div className="p-5 bg-accent/5 rounded-[32px] border border-accent/20">
                <div className="text-[10px] text-accent/60 uppercase font-black tracking-widest mb-1">Выбранный размер</div>
                <div className="text-xl font-black text-white">{selectedVariant?.size} мм</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Утеплитель</span>
                  <p className="text-sm font-bold text-white/80">{product.insulation}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Толщина</span>
                  <p className="text-sm font-bold text-white/80">{selectedVariant?.thickness}</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Клей</span>
                  <p className="text-sm font-bold text-white/80">Henkel (Германия)</p>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-white/20 uppercase font-black tracking-widest">Эмиссия</span>
                  <p className="text-sm font-bold text-white/80">Класс E1 (Эко)</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto space-y-4">
            <div className="flex items-end justify-between border-t border-white/10 pt-4">
              <span className="text-white/40 text-sm font-bold uppercase tracking-widest">Стоимость:</span>
              <span className="text-2xl font-black text-white">{price.toLocaleString('ru-RU')} ₽</span>
            </div>
            <Button variant="primary" size="lg" className="w-full rounded-[24px] h-14 bg-accent hover:bg-accent/90 shadow-[0_15px_30px_rgba(255,107,53,0.3)] font-black uppercase tracking-widest text-sm">
              Купить в 1 клик
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export const Catalog = () => {
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="catalog" className="py-32 bg-[#050A18] relative overflow-hidden">
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
              Каталог материалов
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight uppercase"
            >
              СИП-панели <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-orange-400 to-accent bg-[length:200%_auto] animate-gradient-x">
                от производителя
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
              placeholder="Поиск панелей..."
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
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard product={product} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
