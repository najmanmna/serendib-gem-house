"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import garnetStill from "@/assets/hero/garnet-still.jpg";
import { RotateIcon } from "@/components/ui/icons";

type Status = "loading" | "ready" | "unavailable";

function supportsWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

/**
 * Slowly rotating 3D garnet. three.js is imported only after hydration, so it
 * never delays the hero text. Without WebGL, a still frame of the same render is
 * shown instead. Decorative: hidden from assistive technology.
 */
export function GemShowcase({ className = "" }: { className?: string }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    let disposed = false;
    let unmount: (() => void) | undefined;

    (async () => {
      if (!supportsWebGL()) {
        setStatus("unavailable");
        return;
      }
      try {
        const { mountGarnet } = await import("@/components/home/gem/garnet-scene");
        if (disposed) return;
        unmount = mountGarnet(stage, {
          reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
          onFirstFrame: () => setStatus("ready"),
        });
      } catch {
        if (!disposed) setStatus("unavailable");
      }
    })();

    return () => {
      disposed = true;
      unmount?.();
    };
  }, []);

  if (status === "unavailable") {
    return (
      <div aria-hidden="true" className={`relative ${className}`}>
        <Image src={garnetStill} alt="" fill sizes="(min-width: 1024px) 560px, 90vw" className="object-contain" />
      </div>
    );
  }

  return (
    <div aria-hidden="true" className={`relative ${className}`}>
      <div
        ref={stageRef}
        className={`gem-float absolute inset-0 transition-opacity duration-1000 ease-out ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
      <div
        className={`gem-shadow pointer-events-none absolute bottom-[9%] left-1/2 h-[8%] w-[44%] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(closest-side,rgb(7_29_59/0.2),transparent)] transition-opacity duration-1000 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      />
      {/* Tells visitors the gem can be turned by hand */}
      <p
        className={`pointer-events-none absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-1.5 text-[0.6875rem] font-medium tracking-[0.16em] whitespace-nowrap text-muted uppercase transition-opacity delay-700 duration-1000 ${
          status === "ready" ? "opacity-100" : "opacity-0"
        }`}
      >
        <RotateIcon className="size-3.5" />
        Drag to rotate
      </p>
    </div>
  );
}
