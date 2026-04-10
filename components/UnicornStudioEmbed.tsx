"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    UnicornStudio?: {
      isInitialized?: boolean;
      init: () => void;
    };
  }
}

export default function UnicornStudioEmbed() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load UnicornStudio script if not already present
    if (window.UnicornStudio?.isInitialized) {
      window.UnicornStudio.init();
      return;
    }

    window.UnicornStudio = { isInitialized: false, init: () => {} };

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js";
    script.onload = () => {
      window.UnicornStudio?.init();
    };
    document.head.appendChild(script);

    // Remove watermark badge when it appears
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
      observer.observe(containerRef.current, { childList: true, subtree: true });
    }

    return () => {
      script.remove();
      observer.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full z-0">
      <div
        className="absolute inset-0 w-full h-full"
        data-us-project="RqJoR29nYwfENjprfjNt"
      />
      {/* Cover UnicornStudio badge */}
      <div
        className="absolute bottom-0 right-0 z-50"
        style={{ width: 200, height: 40, background: "inherit" }}
      />
    </div>
  );
}
