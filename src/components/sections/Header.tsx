"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Menu, X } from "lucide-react";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "СТК-панели", href: "#stk" },
    { name: "О технологии", href: "#tech" },
    { name: "Каталог", href: "#catalog" },
    { name: "Калькулятор", href: "#calculator" },
    { name: "Процесс", href: "#process" },
    { name: "Отзывы", href: "#reviews" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-6 py-4",
        isScrolled 
          ? "bg-[#050A18]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <div className="absolute -inset-1 bg-accent rounded-lg blur opacity-40 group-hover:opacity-100 transition duration-300" />
            <div className="relative w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg">
              S
            </div>
          </div>
          <span className="text-xl font-black font-display tracking-tight text-white uppercase">
            STK <span className="text-accent">PREMIUM</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.2em] transition-all hover:text-accent text-white/70 hover:scale-110"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Button variant="primary" size="sm" className="h-10 px-6 rounded-full font-bold text-xs uppercase tracking-widest bg-accent hover:bg-accent/90 shadow-[0_0_20px_rgba(255,107,53,0.3)] whitespace-nowrap">
            Консультация
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: isMobileMenuOpen ? 1 : 0, x: isMobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-[#050A18] z-50 md:hidden flex flex-col items-center justify-center gap-8"
      >
        <button
          className="absolute top-6 right-6 text-white"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <X size={32} />
        </button>
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl font-bold text-white uppercase tracking-widest hover:text-accent"
          >
            {link.name}
          </a>
        ))}
        <Button variant="primary" size="lg" className="mt-4">
          Консультация
        </Button>
      </motion.div>
    </header>
  );
};
