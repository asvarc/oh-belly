"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled ? "backdrop-blur-md bg-[var(--cream)]/80" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-display font-medium text-lg tracking-tight">
          Oh Belly<span className="text-[var(--coral)]">.</span>
        </a>

        {/* Center links — desktop */}
        <div className="hidden md:flex items-center gap-10">
          {["Příchutě", "Benefity", "Věda"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-[13px] font-medium text-[var(--ink-50)] hover:text-[var(--ink)] transition-colors duration-300 tracking-wide uppercase"
            >
              {l}
            </a>
          ))}
        </div>

        {/* CTA */}
        <motion.a
          href="#objednat"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:inline-flex items-center h-9 px-5 rounded-full bg-[var(--ink)] text-white text-[13px] font-medium tracking-wide transition-shadow duration-300 hover:shadow-lg"
        >
          Objednat
        </motion.a>

        {/* Mobile — just the word */}
        <a
          href="#objednat"
          className="md:hidden text-[13px] font-medium text-[var(--ink)] tracking-wide uppercase"
        >
          Menu
        </a>
      </div>

      {/* Bottom border when scrolled */}
      <div
        className={`h-px transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "var(--ink-08)" }}
      />
    </motion.nav>
  );
}
