"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const TESTIMONIALS = [
  {
    name: "Tereza M.",
    role: "Fitness trenérka",
    text: "Po 3 týdnech cítím méně nafukování a mám víc energie. Moji klienti se teď ptají co piju.",
    flavor: "Limetka & Máta",
  },
  {
    name: "Jakub K.",
    role: "UX Designer",
    text: "Přestal jsem pít klasické limonády, ale chyběl mi ten fun faktor. Oh Belly je přesně to.",
    flavor: "Broskev & Zázvor",
  },
  {
    name: "Martina V.",
    role: "Nutriční poradkyně",
    text: "Doporučuji klientům jako alternativu. Složení je transparentní, benefity reálné.",
    flavor: "Borůvka & Levandule",
  },
];

export default function SocialProof() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 md:py-28 px-6 md:px-10">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--cream) 0%, #F0EDE8 50%, var(--cream) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-20 md:mb-28 flex flex-col md:flex-row md:items-end md:justify-between gap-6"
        >
          <div>
            <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--ink-50)] mb-4 block">
              Recenze
            </span>
            <h2
              className="font-display font-light tracking-tight"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 4rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
              }}
            >
              47 000+ spokojených
              <br />
              <span className="text-[var(--rose)] font-medium">střev.</span>
            </h2>
          </div>
          <p className="text-[var(--ink-50)] text-sm font-light md:max-w-xs md:text-right">
            Průměrné hodnocení 4.9 z 5
            <br />
            ze 3 200 ověřených recenzí.
          </p>
        </motion.div>

        {/* Testimonials — horizontal layout with dividers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="relative py-8 md:px-8 first:md:pl-0 last:md:pr-0"
            >
              {/* Divider on desktop */}
              {i > 0 && (
                <div className="hidden md:block absolute left-0 top-8 bottom-8 w-px bg-[var(--ink-08)]" />
              )}
              {/* Divider on mobile */}
              {i > 0 && (
                <div className="md:hidden absolute left-0 right-0 top-0 h-px bg-[var(--ink-08)]" />
              )}

              <p className="text-[15px] text-[var(--ink)] leading-relaxed font-light mb-8">
                &ldquo;{t.text}&rdquo;
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-medium block">{t.name}</span>
                  <span className="text-[12px] text-[var(--ink-50)] font-light">
                    {t.role}
                  </span>
                </div>
                <span className="text-[11px] text-[var(--ink-50)] font-light tracking-wide">
                  {t.flavor}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Press mentions — extremely minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-24 md:mt-32 pt-12 border-t border-[var(--ink-08)]"
        >
          <span className="text-[11px] font-medium tracking-[0.2em] uppercase text-[var(--ink-20)] block mb-8">
            Psali o nás
          </span>
          <div className="flex flex-wrap items-center gap-10 md:gap-16">
            {["Forbes", "Czech Vogue", "Runner's World", "Refinery29"].map(
              (name) => (
                <span
                  key={name}
                  className="font-display font-medium text-xl md:text-2xl text-[var(--ink-20)] tracking-tight"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {name}
                </span>
              )
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
