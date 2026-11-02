"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";

import { ArrowRightIcon } from "@/components/ui/icons";
import type { ImageAsset } from "@/lib/types";

type ProductGalleryProps = {
  images: ImageAsset[];
  sold?: boolean;
};

/**
 * Main image with thumbnails. On devices with a mouse, hovering magnifies the
 * area under the pointer; on touch screens, swipe to change image.
 * Arrow keys move between images when the gallery has focus.
 */
export function ProductGallery({ images, sold = false }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const touchStart = useRef<number | null>(null);
  const count = images.length;
  const image = images[active];

  const go = (index: number) => setActive((index + count) % count);

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    setZoom({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
    });
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (count < 2) return;
    if (event.key === "ArrowRight") go(active + 1);
    if (event.key === "ArrowLeft") go(active - 1);
  };

  return (
    <div onKeyDown={onKeyDown}>
      <div
        role="group"
        aria-roledescription="gallery"
        aria-label={`Image ${active + 1} of ${count}`}
        className="relative aspect-square overflow-hidden rounded-brand bg-white"
        onPointerMove={onPointerMove}
        onPointerLeave={() => setZoom(null)}
        onTouchStart={(event) => (touchStart.current = event.touches[0].clientX)}
        onTouchEnd={(event) => {
          if (touchStart.current === null || count < 2) return;
          const distance = event.changedTouches[0].clientX - touchStart.current;
          if (Math.abs(distance) > 40) go(active + (distance < 0 ? 1 : -1));
          touchStart.current = null;
        }}
      >
        <Image
          key={active}
          src={image.src}
          alt={image.alt}
          fill
          loading={active === 0 ? "eager" : undefined}
          fetchPriority={active === 0 ? "high" : undefined}
          sizes="(min-width: 1360px) 640px, (min-width: 1024px) 48vw, 100vw"
          className={`object-contain transition-transform duration-200 ease-out motion-safe:animate-[fade-in_300ms_ease-out] ${
            zoom && !sold ? "scale-[2.2] cursor-zoom-in" : "scale-100"
          }`}
          style={zoom ? { transformOrigin: `${zoom.x}% ${zoom.y}%` } : undefined}
        />

        {sold && (
          <div className="absolute inset-0 grid place-items-center bg-white/55">
            <span className="rounded-full bg-navy px-5 py-2.5 text-xs font-semibold tracking-[0.2em] text-white uppercase">
              Sold out
            </span>
          </div>
        )}

        {count > 1 && (
          <>
            {(["previous", "next"] as const).map((direction) => (
              <button
                key={direction}
                type="button"
                onClick={() => go(active + (direction === "next" ? 1 : -1))}
                className={`absolute top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-[0_2px_8px_rgb(7_29_59/0.12)] transition-colors hover:bg-white ${
                  direction === "next" ? "right-3" : "left-3"
                }`}
              >
                <ArrowRightIcon className={`size-4 ${direction === "previous" ? "rotate-180" : ""}`} />
                <span className="sr-only">{direction === "next" ? "Next image" : "Previous image"}</span>
              </button>
            ))}
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="mt-4 flex gap-3">
          {images.map((thumbnail, index) => (
            <li key={index}>
              <button
                type="button"
                onClick={() => setActive(index)}
                aria-current={index === active ? "true" : undefined}
                className={`relative block size-20 overflow-hidden rounded-brand bg-white ring-offset-2 transition-shadow sm:size-24 ${
                  index === active ? "ring-2 ring-navy" : "opacity-75 ring-1 ring-line hover:opacity-100"
                }`}
              >
                <Image src={thumbnail.src} alt="" fill sizes="96px" className="object-cover" />
                <span className="sr-only">
                  Show image {index + 1}: {thumbnail.alt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
