"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Check, ChevronRight, ChevronLeft, Home, User, Settings, Send } from "lucide-react";
import confetti from "canvas-confetti";
import { cn } from "@/lib/utils";

const steps = [
  { id: 1, title: "Тип панели", icon: <Settings size={20} /> },
  { id: 2, title: "Объем", icon: <Settings size={20} /> },
  { id: 3, title: "Опции", icon: <Settings size={20} /> },
  { id: 4, title: "Результат", icon: <User size={20} /> },
];

export const Calculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    panelType: "standard-174",
    quantity: 50,
    delivery: false,
    cutting: false,
    name: "",
    phone: "",
  });

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
    if (currentStep === 3) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#FF6B35", "#3B82F6", "#FFFFFF"]
      });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const calculateTotal = () => {
    const prices: Record<string, number> = {
      "standard-124": 4350,
      "standard-174": 4850,
      "energy-224": 5350,
      "tall-174": 5450,
      "csp-174": 7200,
      "ppu-174": 8900
    };
    
    let pricePerUnit = prices[formData.panelType] || 4850;
    let base = formData.quantity * pricePerUnit;
    
    if (formData.cutting) base += formData.quantity * 300;
    if (formData.delivery) base += 12000;
    
    return base.toLocaleString("ru-RU") + " ₽";
  };

  return (
    <section id="calculator" className="py-32 bg-[#050A18] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white/[0.03] border border-white/10 rounded-[48px] backdrop-blur-2xl overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)]">
          <div className="flex flex-col lg:flex-row h-full">
            {/* Sidebar / Progress */}
            <div className="w-full lg:w-1/3 bg-white/[0.02] border-r border-white/10 p-10 lg:p-14">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                Смарт-расчет
              </div>
              <h2 className="text-3xl font-black text-white mb-12 leading-tight">КОНФИГУРАТОР <br/><span className="text-accent">СТОИМОСТИ</span></h2>
              
              <div className="space-y-10">
                {steps.map((step) => (
                  <div key={step.id} className="flex items-center gap-5 group">
                    <div className={cn(
                      "w-12 h-12 rounded-2xl border-2 flex items-center justify-center transition-all duration-500",
                      currentStep >= step.id 
                        ? "border-accent bg-accent text-white shadow-[0_0_20px_rgba(255,107,53,0.4)]" 
                        : "border-white/10 bg-white/5 text-white/20"
                    )}>
                      {currentStep > step.id ? <Check size={20} className="stroke-[3px]" /> : step.icon}
                    </div>
                    <div>
                      <div className={cn(
                        "text-[10px] font-black uppercase tracking-[0.2em] mb-1",
                        currentStep >= step.id ? "text-accent" : "text-white/20"
                      )}>Шаг {step.id}</div>
                      <div className={cn(
                        "font-bold text-sm uppercase tracking-widest",
                        currentStep >= step.id ? "text-white" : "text-white/20"
                      )}>{step.title}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-16 pt-10 border-t border-white/10 hidden lg:block">
                <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Ориентировочный бюджет</div>
                <div className="text-4xl font-black text-white">{calculateTotal()}</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="w-full lg:w-2/3 p-10 lg:p-14">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="min-h-[450px]"
                >
                  {currentStep === 1 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Выберите тип панели</h3>
                        <p className="text-white/40 text-sm">Параметры влияют на энергоэффективность дома</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        {[
                          { id: "standard-174", title: "Стеновая ОСП 174мм", desc: "Самый популярный выбор для внешних стен" },
                          { id: "energy-224", title: "Перекрытие ОСП 224мм", desc: "Максимальное тепло для полов и кровель" },
                          { id: "standard-124", title: "Перегородочная ОСП 124мм", desc: "Для внутренних несущих стен" },
                          { id: "csp-174", title: "Огнестойкая ЦСП 174мм", desc: "Цементно-стружечная плита (НГ)" },
                        ].map((type) => (
                          <label 
                            key={type.id}
                            className={cn(
                              "flex items-center p-6 rounded-[24px] border-2 cursor-pointer transition-all duration-300 group",
                              formData.panelType === type.id 
                                ? "border-accent bg-accent/5 shadow-[0_0_30px_rgba(255,107,53,0.1)]" 
                                : "border-white/5 bg-white/[0.02] hover:border-white/20"
                            )}
                          >
                            <input 
                              type="radio" 
                              className="hidden" 
                              name="panelType" 
                              checked={formData.panelType === type.id}
                              onChange={() => setFormData({ ...formData, panelType: type.id })}
                            />
                            <div className={cn(
                              "w-6 h-6 rounded-full border-2 mr-6 flex items-center justify-center transition-all",
                              formData.panelType === type.id ? "border-accent bg-accent" : "border-white/20"
                            )}>
                              {formData.panelType === type.id && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <div>
                              <div className={cn(
                                "font-black text-sm uppercase tracking-widest mb-1",
                                formData.panelType === type.id ? "text-white" : "text-white/60"
                              )}>{type.title}</div>
                              <div className="text-white/30 text-xs font-bold">{type.desc}</div>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && (
                    <div className="space-y-12">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Объем производства</h3>
                        <p className="text-white/40 text-sm">Укажите необходимое количество панелей</p>
                      </div>
                      <div className="px-4">
                        <div className="flex justify-between items-end mb-8">
                          <div className="text-white/20 text-[10px] font-black uppercase tracking-[0.2em]">Количество</div>
                          <div className="text-5xl font-black text-accent">{formData.quantity} <span className="text-xl text-white/40">ШТ</span></div>
                        </div>
                        <div className="relative h-12 flex items-center">
                          <div className="absolute inset-0 h-1.5 my-auto bg-white/10 rounded-full" />
                          <div 
                            className="absolute h-1.5 my-auto bg-accent rounded-full shadow-[0_0_15px_rgba(255,107,53,0.5)]"
                            style={{ width: `${(formData.quantity - 10) / 490 * 100}%` }}
                          />
                          <input 
                            type="range" 
                            min="10" 
                            max="500" 
                            step="5"
                            value={formData.quantity}
                            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                            className="absolute inset-0 w-full h-12 bg-transparent appearance-none cursor-pointer z-10 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:rounded-xl [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-[0_0_20px_rgba(0,0,0,0.5)] [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-accent"
                          />
                        </div>
                        <div className="flex justify-between mt-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
                          <span>10 панелей</span>
                          <span>500 панелей</span>
                        </div>
                      </div>
                      <div className="p-8 bg-accent/5 rounded-[32px] border border-accent/10 flex items-center justify-between">
                        <div className="text-white/60 font-bold text-sm uppercase tracking-widest">Площадь домокомплекта</div>
                        <div className="text-2xl font-black text-white">~ {(formData.quantity * 3.125).toFixed(1)} м²</div>
                      </div>
                    </div>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Сервисные опции</h3>
                        <p className="text-white/40 text-sm">Дополнительные услуги нашего завода</p>
                      </div>
                      <div className="grid grid-cols-1 gap-4">
                        <label className="flex items-center p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-300 bg-white/[0.02] border-white/5 hover:border-white/20 group">
                          <div className="relative flex items-center">
                            <input 
                              type="checkbox" 
                              className="peer hidden"
                              checked={formData.cutting}
                              onChange={(e) => setFormData({ ...formData, cutting: e.target.checked })}
                            />
                            <div className="w-8 h-8 rounded-xl border-2 border-white/10 flex items-center justify-center transition-all peer-checked:bg-accent peer-checked:border-accent shadow-inner">
                              <Check className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={18} />
                            </div>
                          </div>
                          <div className="ml-6">
                            <div className="font-black text-sm text-white uppercase tracking-widest mb-1">Заводская нарезка</div>
                            <div className="text-white/30 text-xs font-bold">Раскрой по чертежам на ЧПУ станке (точность 1мм)</div>
                          </div>
                        </label>
                        <label className="flex items-center p-8 rounded-[32px] border-2 cursor-pointer transition-all duration-300 bg-white/[0.02] border-white/5 hover:border-white/20 group">
                          <div className="relative flex items-center">
                            <input 
                              type="checkbox" 
                              className="peer hidden"
                              checked={formData.delivery}
                              onChange={(e) => setFormData({ ...formData, delivery: e.target.checked })}
                            />
                            <div className="w-8 h-8 rounded-xl border-2 border-white/10 flex items-center justify-center transition-all peer-checked:bg-accent peer-checked:border-accent shadow-inner">
                              <Check className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" size={18} />
                            </div>
                          </div>
                          <div className="ml-6">
                            <div className="font-black text-sm text-white uppercase tracking-widest mb-1">Бережная доставка</div>
                            <div className="text-white/30 text-xs font-bold">Транспортировка спецтехникой в защитной упаковке</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}

                  {currentStep === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-black text-white mb-2">Завершение расчета</h3>
                        <p className="text-white/40 text-sm">Оставьте контакты для получения КП</p>
                      </div>
                      <div className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Ваше имя" 
                          className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all font-bold"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input 
                          type="tel" 
                          placeholder="+7 (___) ___-__-__" 
                          className="w-full p-6 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-all font-bold"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="p-8 bg-accent rounded-[32px] shadow-[0_20px_40px_rgba(255,107,53,0.3)]">
                        <div className="text-[10px] text-white/60 uppercase font-black tracking-[0.2em] mb-2">Итоговая стоимость</div>
                        <div className="text-5xl font-black text-white">{calculateTotal()}</div>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="flex justify-between mt-12 pt-10 border-t border-white/10">
                <button 
                  onClick={prevStep}
                  className={cn(
                    "flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all",
                    currentStep === 1 ? "invisible" : "text-white/40 hover:text-white hover:bg-white/5"
                  )}
                >
                  <ChevronLeft size={18} /> Назад
                </button>
                <Button 
                  variant="primary" 
                  onClick={nextStep}
                  className="rounded-2xl h-16 px-12 bg-accent hover:bg-accent/90 shadow-[0_10px_30px_rgba(255,107,53,0.3)] font-black uppercase tracking-widest"
                >
                  {currentStep === 4 ? (
                    <span className="flex items-center gap-3">Получить КП <Send size={18} /></span>
                  ) : (
                    <span className="flex items-center gap-3">Далее <ChevronRight size={18} /></span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
