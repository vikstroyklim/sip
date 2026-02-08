"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 overflow-hidden relative">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-bold text-white text-xl">
                S
              </div>
              <span className="text-2xl font-bold font-display tracking-tight">
                SIP PREMIUM
              </span>
            </div>
            <p className="text-white/60 leading-relaxed">
              Создаем энергоэффективные дома будущего. Технологии, качество и комфорт в каждом квадратном метре.
            </p>
            <div className="flex gap-4">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ y: -5, color: "#FF6B35" }}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center transition-colors"
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Навигация</h4>
            <ul className="space-y-4">
              {["О технологии", "Каталог проектов", "Калькулятор", "Процесс работы", "Отзывы"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Услуги</h4>
            <ul className="space-y-4">
              {["Проектирование", "Производство панелей", "Монтаж домокомплекта", "Фундамент", "Кровля и окна"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/60 hover:text-accent transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider">Контакты</h4>
            <ul className="space-y-6">
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest">Телефон</div>
                  <div className="font-bold">8 (800) 555-35-35</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest">Email</div>
                  <div className="font-bold">info@sip-premium.ru</div>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm text-white/40 uppercase tracking-widest">Офис</div>
                  <div className="font-bold">г. Москва, ул. Строителей, 25</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Sticky-like CTA within Footer */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 bg-accent rounded-[32px] p-8 md:p-12 overflow-hidden mb-16"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl md:text-4xl font-bold mb-4">Готовы начать строительство?</h3>
              <p className="text-white/80 text-lg">Получите бесплатную консультацию архитектора уже сегодня.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-white text-accent hover:bg-white/90" size="lg">Заказать звонок</Button>
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-accent" size="lg">Скачать презентацию</Button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 text-sm">
          <p>© 2024 SIP PREMIUM. Все права защищены.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-white transition-colors">Публичная оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
