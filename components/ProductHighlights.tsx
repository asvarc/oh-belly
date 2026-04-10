"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const BENEFITS = [
  {
    label: "Prebiotika",
    value: "3g",
    unit: "na plechovku",
    description: "Klinicky ověřené množství inulinu a FOS. Krmivo pro tvé prospěšné bakterie.",
    color: "var(--mint)",
    colorSoft: "var(--mint-soft)",
  },
  {
    label: "Cukr",
    value: "0g",
    unit: "přidaného",
    description: "Sladíme pouze stévií a erythritolem. Bez vlivu na hladinu glukózy.",
    color: "var(--lemon)",
    colorSoft: "var(--lemon-soft)",
  },
  {
    label: "Příchuť",
    value: "100%",
    unit: "z ovoce",
    description: "Přírodní ovocné extrakty. Žádná umělá barviva ani aromata.",
    color: "var(--coral)",
    colorSoft: "var(--coral-soft)",
  },
  {
    label: "Kalorie",
    value: "<15",
    unit: "na 100ml",
    description: "Osvěžení bez výčitek. Naplno si užij chuť, ne prázdné kalorie.",
    color: "var(--violet)",
    colorSoft: "var(--violet-soft)",
  },
];

export default function ProductHighlights() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="benefity"
      className="relative py-20 md:py-28 px-6 md:px-10"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-20 md:mb-28"
        >
          <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--ink-50)] mb-4 block">
            Benefity
          </span>
          <h2
            className="font-display font-light tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Věda v plechovce.
            <br />
            <span className="text-[var(--coral)] font-medium">Chuť v každém doušku.</span>
          </h2>
        </motion.div>

        {/* Benefits grid — 4 cols, lots of space */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15 * i,
                ease: [0.25, 1, 0.5, 1],
              }}
            >
              {/* Accent dot + label */}
              <div className="flex items-center gap-2 mb-6">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: b.color }}
                />
                <span className="text-[12px] font-medium tracking-[0.15em] uppercase text-[var(--ink-50)]">
                  {b.label}
                </span>
              </div>

              {/* Big number */}
              <div className="mb-3">
                <span
                  className="font-display font-medium tracking-tight"
                  style={{
                    fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: b.color,
                  }}
                >
                  {b.value}
                </span>
              </div>
              <span className="text-[12px] text-[var(--ink-50)] font-medium block mb-5">
                {b.unit}
              </span>

              {/* Description */}
              <p className="text-[14px] text-[var(--ink-50)] leading-relaxed font-light">
                {b.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
