"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import dynamic from "next/dynamic";

const BubbleCanvas = dynamic(() => import("./BubbleCanvas"), { ssr: false });
const UnicornStudioEmbed = dynamic(() => import("./UnicornStudioEmbed"), {
  ssr: false,
});
const Can3D = dynamic(() => import("./Can3D"), { ssr: false });

export default function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
    >
      <BubbleCanvas />

      <UnicornStudioEmbed />

      {/* Giant 3D can — tilted behind main text */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 2.5, ease: [0.25, 1, 0.5, 1] }}
        className="absolute z-[5] pointer-events-none left-1/2 -translate-x-1/2"
        style={{ top: "35%", transform: "translate(-50%, -50%)" }}
      >
        <Can3D
          color="#FF6B4A"
          labelColor="#ffe0d0"
          className="w-[220px] h-[360px] md:w-[280px] md:h-[450px] lg:w-[320px] lg:h-[520px]"
          canvasScale={0.7}
          rotation={[0.1, 0.3, 0.61]}
          autoRotate
          floatIntensity={0.15}
        />
      </motion.div>

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Tiny pill */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="mb-10"
        >
          <span className="inline-flex items-center gap-2 text-[12px] font-medium tracking-widest uppercase text-white/70 border border-white/20 rounded-full px-4 py-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
            Prebiotická limonáda
          </span>
        </motion.div>

        {/* H1 — massive, clean */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.25, 1, 0.5, 1] }}
          className="font-display font-semibold tracking-tight mb-8 text-white"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          Šťastná střeva
          <br />
          v&nbsp;každé plechovce
        </motion.h1>

        {/* Sub — one line, understated */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.25, 1, 0.5, 1] }}
          className="text-white/70 text-base md:text-lg max-w-md mx-auto mb-12 leading-relaxed font-light"
        >
          Bez cukru. S prebiotiky. Perlivá radost
          <br className="hidden sm:block" />
          v každém doušku.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.9, ease: [0.25, 1, 0.5, 1] }}
          className="flex items-center justify-center gap-4"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 px-8 rounded-full bg-white text-[var(--ink)] text-sm font-medium tracking-wide transition-shadow duration-300 hover:shadow-xl"
          >
            Vyzkoušet →
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="h-12 px-8 rounded-full border border-white/30 text-sm font-medium tracking-wide text-white hover:border-white/60 transition-colors duration-300"
          >
            Zjistit více
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll line */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase text-white/30">
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-white/30 origin-top"
        />
      </motion.div>
    </section>
  );
}
