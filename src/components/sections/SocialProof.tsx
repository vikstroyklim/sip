"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    name: "Алексей Смирнов",
    role: "Директор строительной компании",
    text: "Заказываем панели только здесь. Геометрия идеальная, OSB не разбухает, клей держит намертво. Для профессионалов это лучший выбор на рынке.",
    rating: 5,
  },
  {
    name: "Дмитрий Корнилов",
    role: "Частный застройщик",
    text: "Покупал панели для самостоятельной сборки. Очень помогла заводская нарезка по проекту — собрал коробку за 10 дней без единой ошибки.",
    rating: 5,
  },
  {
    name: "Михаил Захаров",
    role: "Владелец дома из SIP",
    text: "Доставили вовремя, все панели упакованы в защитную пленку. Качество пенополистирола на высоте — очень плотный, не крошится.",
    rating: 5,
  },
];

const faqs = [
  {
    q: "Какую OSB-плиту вы используете?",
    a: "Мы используем только влагостойкие плиты OSB-3 ведущих производителей (Калевала, Талион) толщиной 12 мм, соответствующие европейскому стандарту E1.",
  },
  {
    q: "Как осуществляется доставка?",
    a: "Доставляем панели собственным автотранспортом или транспортными компаниями по всей России. Все панели упаковываются в стрейч-пленку для защиты от влаги.",
  },
  {
    q: "Предоставляете ли вы проект для сборки?",
    a: "Да, при заказе домокомплекта мы разрабатываем проектную документацию (раздел КД) и карту раскроя панелей для быстрой сборки на объекте.",
  },
  {
    q: "Есть ли у вас сертификаты на продукцию?",
    a: "Вся наша продукция сертифицирована. Мы предоставляем паспорта качества на каждую партию панелей, подтверждающие соответствие ГОСТ и пожарным нормам.",
  },
];

export const SocialProof = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="reviews" className="py-32 bg-[#050A18] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Testimonials */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              Отзывы партнеров
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-12 uppercase tracking-tight">
              ДОВЕРИЕ <span className="text-accent">ПРОФЕССИОНАЛОВ</span>
            </h2>
            <div className="space-y-8">
              {testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-10 rounded-[40px] bg-white/[0.02] border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-all duration-500 backdrop-blur-sm"
                >
                  <Quote className="absolute top-8 right-8 text-accent/10 w-20 h-20 group-hover:scale-110 transition-transform duration-700" />
                  <div className="flex gap-1.5 mb-6">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={14} className="fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-white/60 text-lg mb-8 leading-relaxed font-medium">«{t.text}»</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-black">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-black text-white uppercase tracking-widest text-sm mb-1">{t.name}</div>
                      <div className="text-white/30 text-xs font-bold">{t.role}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
            >
              База знаний
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-12 uppercase tracking-tight">
              ОТВЕТЫ НА <span className="text-blue-500">ВОПРОСЫ</span>
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white/[0.02] border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-sm transition-all duration-500 hover:border-white/10">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full p-8 text-left flex items-center justify-between group"
                  >
                    <span className={cn(
                      "font-black text-white uppercase tracking-widest text-sm transition-all duration-300",
                      openFaq === i ? "text-accent" : "group-hover:text-white/80"
                    )}>
                      {faq.q}
                    </span>
                    <div className={cn(
                      "w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center transition-all duration-500",
                      openFaq === i ? "bg-accent border-accent text-white rotate-180" : "bg-white/5 text-white/40"
                    )}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                      >
                        <div className="px-8 pb-8 text-white/40 leading-relaxed font-medium border-t border-white/5 pt-6">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
