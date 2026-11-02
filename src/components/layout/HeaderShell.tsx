"use client";

import { useEffect, useState, type ReactNode } from "react";

const COMPACT_AFTER_PX = 24;

/**
 * Sticky header wrapper. Exposes `data-scrolled` so children can compact
 * themselves with `group-data-[scrolled=true]/header:` utilities.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > COMPACT_AFTER_PX);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    // Covers pages restored mid-scroll (back/forward navigation, reloads).
    frame = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group/header sticky top-0 z-40 border-b border-transparent bg-white transition-[background-color,border-color,box-shadow] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-white/90 data-[scrolled=true]:shadow-[0_10px_30px_-24px_rgb(7_29_59/0.45)] data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
