"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const STEPS = [
  {
    num: "01",
    title: "Přijmeš prebiotika",
    body: "Inulin a FOS z plechovky putují nevstřebané až do tlustého střeva.",
  },
  {
    num: "02",
    title: "Bakterie hodují",
    body: "Prospěšné kmeny fermentují vlákninu a produkují krátké mastné kyseliny.",
  },
  {
    num: "03",
    title: "Sníží se zánět",
    body: "SCFA vyživují střevní buňky a posilují střevní bariéru.",
  },
  {
    num: "04",
    title: "Pocítíš rozdíl",
    body: "Zdravé střevo = šťastný mozek. Osa střevo-mozek ovlivňuje náladu i energii.",
  },
];

export default function GutScience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="věda" className="relative py-20 md:py-28 px-6 md:px-10">
      {/* Subtle background shift */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--cream) 0%, #F5F2ED 50%, var(--cream) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-14 md:mb-20 max-w-2xl"
        >
          <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--ink-50)] mb-4 block">
            Věda
          </span>
          <h2
            className="font-display font-light tracking-tight mb-6"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Tvoje střevo je
            <br />
            <span className="text-[var(--violet)] font-medium">tvůj druhý mozek.</span>
          </h2>
          <p className="text-[var(--ink-50)] text-base leading-relaxed font-light max-w-lg">
            Moderní věda potvrzuje, co naše babičky věděly instinktivně — vše
            začíná ve střevech.
          </p>
        </motion.div>

        {/* Step-by-step */}
        <div className="border-t border-[var(--ink-08)]">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.1,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="grid grid-cols-12 gap-4 py-8 md:py-10 border-b border-[var(--ink-08)] group hover:bg-white/50 transition-colors duration-500 -mx-4 px-4 rounded-lg"
            >
              {/* Number */}
              <div className="col-span-2 md:col-span-1">
                <span className="text-[13px] font-medium text-[var(--ink-20)] font-display">
                  {step.num}
                </span>
              </div>

              {/* Title */}
              <div className="col-span-10 md:col-span-4">
                <h3 className="font-display font-medium text-base md:text-lg tracking-tight">
                  {step.title}
                </h3>
              </div>

              {/* Body */}
              <div className="col-span-12 md:col-span-7 md:col-start-6">
                <p className="text-[14px] text-[var(--ink-50)] leading-relaxed font-light">
                  {step.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
