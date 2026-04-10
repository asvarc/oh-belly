"use client";

import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";

const Can3D = dynamic(() => import("./Can3D"), { ssr: false });

const FLAVORS = [
  {
    id: "peach",
    name: "Broskev & Zázvor",
    tag: "Bestseller",
    emoji: "🍑",
    description: "Jemná sladkost broskve se zahřívacím nádechem zázvoru.",
    color: "var(--coral)",
    canColor: "#FF6B4A",
    labelColor: "#ffe0d0",
    gradient: "linear-gradient(160deg, #FFD6C8 0%, #FF8A6A 100%)",
    kcal: 15,
  },
  {
    id: "lime",
    name: "Limetka & Máta",
    tag: "Classic",
    emoji: "🍋",
    description: "Svěží kyselost limetky s ledovou mátou. Jako mojito bez alkoholu.",
    color: "var(--mint)",
    canColor: "#3ECFA0",
    labelColor: "#c8f5e5",
    gradient: "linear-gradient(160deg, #C8F5E5 0%, #3ECFA0 100%)",
    kcal: 10,
  },
  {
    id: "blueberry",
    name: "Borůvka & Levandule",
    tag: "Relaxing",
    emoji: "🫐",
    description: "Sametová borůvka s jemnou levandulí. Nejoblíbenější večerní příchuť.",
    color: "var(--violet)",
    canColor: "#A37BFF",
    labelColor: "#e0d0ff",
    gradient: "linear-gradient(160deg, #E0D0FF 0%, #A37BFF 100%)",
    kcal: 12,
  },
  {
    id: "mango",
    name: "Mango & Maracuja",
    tag: "Nové",
    emoji: "🥭",
    description: "Tropický výbuch chutí. Sladké mango s exotickou kyselostí maracuji.",
    color: "var(--lemon)",
    canColor: "#F5C842",
    labelColor: "#fff3c0",
    gradient: "linear-gradient(160deg, #FFF3C0 0%, #F5C842 100%)",
    kcal: 18,
  },
  {
    id: "watermelon",
    name: "Meloun & Bazalka",
    tag: "Letní",
    emoji: "🍉",
    description: "Léto v plechovce. Vodnatý meloun s nečekaným nádechem bazalky.",
    color: "var(--rose)",
    canColor: "#FF6B98",
    labelColor: "#ffd6e8",
    gradient: "linear-gradient(160deg, #FFD6E8 0%, #FF6B98 100%)",
    kcal: 14,
  },
];

export default function FlavorSelector() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const f = FLAVORS[active];

  return (
    <section ref={ref} id="příchutě" className="relative py-20 md:py-28 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-16 md:mb-24"
        >
          <span className="text-[12px] font-medium tracking-[0.2em] uppercase text-[var(--ink-50)] mb-4 block">
            Příchutě
          </span>
          <h2
            className="font-display font-light tracking-tight"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 4rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Pět příchutí.
            <br />
            <span
              className="font-medium transition-colors duration-500"
              style={{ color: f.color }}
            >Jedna láska.</span>
          </h2>
        </motion.div>

        {/* Main grid: Can + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center mb-20">
          {/* Can */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex justify-center relative"
          >
            {/* Can */}
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
                className="relative z-10"
              >
                <Can3D
                  color={f.canColor}
                  labelColor={f.labelColor}
                  className="w-[280px] h-[400px] md:w-[320px] md:h-[450px]"
                  autoRotate
                  floatIntensity={0.6}
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Tag */}
                <span
                  className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.15em] uppercase mb-4"
                  style={{ color: f.color }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: f.color }}
                  />
                  {f.tag}
                </span>

                <h3
                  className="font-display font-medium tracking-tight mb-4"
                  style={{
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {f.name}
                </h3>

                <p className="text-[var(--ink-50)] text-base leading-relaxed font-light mb-8 max-w-sm">
                  {f.description}
                </p>

                {/* Minimal stats */}
                <div className="flex gap-8 mb-10">
                  {[
                    { val: `${f.kcal}`, label: "kcal / 100ml" },
                    { val: "3g", label: "prebiotika" },
                    { val: "0g", label: "cukru" },
                  ].map((s) => (
                    <div key={s.label}>
                      <span
                        className="font-display font-medium text-2xl block"
                        style={{ letterSpacing: "-0.02em" }}
                      >
                        {s.val}
                      </span>
                      <span className="text-[11px] text-[var(--ink-50)] font-light">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className="h-12 px-8 rounded-full bg-[var(--ink)] text-white text-sm font-medium tracking-wide hover:shadow-xl transition-shadow duration-300"
                >
                  Přidat do košíku →
                </motion.button>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Flavor selector row */}
        <div className="flex flex-wrap justify-center gap-3">
          {FLAVORS.map((fl, i) => (
            <motion.button
              key={fl.id}
              onClick={() => setActive(i)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="relative h-11 px-5 rounded-full text-[13px] font-medium tracking-wide transition-all duration-400"
              style={{
                background:
                  active === i ? "var(--ink)" : "transparent",
                color: active === i ? "white" : "var(--ink-50)",
                border:
                  active === i
                    ? "1px solid var(--ink)"
                    : "1px solid var(--ink-08)",
              }}
            >
              {fl.emoji} {fl.name}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
