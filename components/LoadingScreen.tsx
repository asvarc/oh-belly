"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init: () => void;
    };
  }
}

export default function LoadingScreen({
  children,
}: {
  children: React.ReactNode;
}) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track real resource loading
  const updateProgress = useCallback(() => {
    if (typeof window === "undefined") return;

    const perf = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];
    const total = perf.length || 1;
    const loaded = perf.filter((r) => r.responseEnd > 0).length;
    const realProgress = Math.min((loaded / Math.max(total, 1)) * 100, 100);

    setProgress((prev) => {
      // Slowly approach real progress, cap at 85% until page is fully ready
      const cappedTarget = Math.min(Math.max(prev, realProgress), 85);
      const step = prev < 30 ? 0.4 : prev < 60 ? 0.3 : prev < 80 ? 0.15 : 0.05;
      return Math.min(cappedTarget, prev + step);
    });
  }, []);

  useEffect(() => {
    // Load UnicornStudio for loading screen
    if (!window.UnicornStudio?.isInitialized) {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js";
      script.onload = () => {
        window.UnicornStudio?.init();
      };
      document.head.appendChild(script);
    } else {
      window.UnicornStudio.init();
    }

    // Remove watermark
    const observer = new MutationObserver(() => {
      const badge = containerRef.current?.querySelector(
        'a[href*="unicorn.studio"]'
      );
      if (badge) {
        badge.remove();
        observer.disconnect();
      }
    });
    if (containerRef.current) {
      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Progress interval
    intervalRef.current = setInterval(updateProgress, 50);

    // Minimum display time — let users enjoy the animation
    const MIN_DISPLAY_MS = 3000;
    const startTime = Date.now();

    // Finish loading when page is ready AND minimum time has passed
    const finishLoading = () => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, MIN_DISPLAY_MS - elapsed);

      setTimeout(() => {
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Smoothly fill to 100%
        const fillInterval = setInterval(() => {
          setProgress((prev) => {
            if (prev >= 100) {
              clearInterval(fillInterval);
              setTimeout(() => setIsLoaded(true), 400);
              return 100;
            }
            return prev + 2;
          });
        }, 30);
      }, remaining);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      observer.disconnect();
    };
  }, [updateProgress]);

  // After exit animation, show content
  useEffect(() => {
    if (isLoaded) {
      const timer = setTimeout(() => setShowContent(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  return (
    <>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
            style={{ background: "var(--cream)" }}
          >
            {/* UnicornStudio background animation */}
            <div
              ref={containerRef}
              className="absolute inset-0 w-full h-full"
              data-us-project="GzWcOmxocyD0m9RPPQyg"
            />

            {/* Logo + progress overlay */}
            <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-md px-8">
              {/* Logo */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="text-center"
              >
                <h1
                  className="font-display font-semibold text-white tracking-tight"
                  style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
                >
                  Oh Belly
                  <span className="text-[var(--coral)]">.</span>
                </h1>
                <p className="text-white/40 text-sm font-light mt-2 tracking-wider uppercase">
                  Prebiotic Soda
                </p>
              </motion.div>

              {/* Progress bar */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.5,
                  ease: [0.25, 1, 0.5, 1],
                }}
                className="w-full"
              >
                <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background:
                        "linear-gradient(90deg, var(--coral), var(--mint))",
                    }}
                    transition={{ duration: 0.1, ease: "linear" }}
                  />
                </div>
                <div className="flex justify-between mt-3">
                  <span className="text-white/30 text-[11px] font-light tracking-wider">
                    LOADING
                  </span>
                  <span className="text-white/30 text-[11px] font-mono">
                    {Math.round(progress)}%
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content — hidden until loader exits */}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      >
        {children}
      </div>
    </>
  );
}
