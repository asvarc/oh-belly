"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Footer() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer ref={ref} className="relative">
      {/* CTA section — dark */}
      <section
        className="py-20 md:py-28 px-6 md:px-10"
        style={{ background: "var(--ink)" }}
        id="objednat"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2
            className="font-display font-light tracking-tight text-white mb-6"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Tvá střeva ti
            <br />
            poděkují<span style={{ color: "var(--coral)" }}>.</span>
          </h2>

          <p className="text-white/40 text-base font-light mb-12 max-w-md mx-auto leading-relaxed">
            Starter pack — 12 plechovek, 5 příchutí.
            <br />
            Doprava zdarma po celé ČR a SR.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded-full bg-white text-[var(--ink)] text-sm font-medium tracking-wide hover:shadow-xl transition-shadow duration-300"
            >
              Objednat starter pack →
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="h-12 px-8 rounded-full border border-white/15 text-white/60 text-sm font-medium tracking-wide hover:border-white/30 transition-colors duration-300"
            >
              Sledovat na Instagramu
            </motion.button>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap justify-center gap-8 text-[12px] text-white/25 font-light">
            {[
              "Doprava zdarma nad 500 Kč",
              "Vrácení do 30 dní",
              "Bezpečná platba",
            ].map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer nav — minimal */}
      <div
        className="py-10 px-6 md:px-10"
        style={{ background: "var(--ink)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="border-t border-white/8 pt-10 flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left — logo */}
            <span className="font-display font-medium text-white/40 text-sm tracking-tight">
              Oh Belly<span style={{ color: "var(--coral)" }}>.</span>
            </span>

            {/* Center — links */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                "Příchutě",
                "Benefity",
                "Věda",
                "FAQ",
                "Kontakt",
                "Ochrana údajů",
              ].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[12px] text-white/25 hover:text-white/50 transition-colors duration-300 font-light"
                >
                  {link}
                </a>
              ))}
            </div>

            {/* Right — copyright */}
            <span className="text-[12px] text-white/15 font-light">
              © 2025 Oh Belly
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
