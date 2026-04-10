"use client";

import { useEffect, useRef } from "react";

export default function UnicornBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = () => {
      const w = window as typeof window & {
        UnicornStudio?: { isInitialized?: boolean; init?: () => void };
      };

      if (w.UnicornStudio?.init) {
        w.UnicornStudio.init();
        return;
      }

      w.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js";
      script.onload = () => {
        w.UnicornStudio?.init?.();
      };
      (document.head || document.body).appendChild(script);
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", load);
      return () => document.removeEventListener("DOMContentLoaded", load);
    } else {
      load();
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <div
        data-us-project="RqJoR29nYwfENjprfjNt"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
