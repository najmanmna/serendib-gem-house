"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { WhatsAppLogo } from "@/components/ui/icons";
import type { WhatsAppLink } from "@/lib/whatsapp";

/**
 * Floating WhatsApp button, bottom-right on every page. It steps aside while a
 * page's own primary WhatsApp action (marked `data-whatsapp-primary`) is on screen,
 * so it never covers or duplicates it.
 */
export function FloatingWhatsApp({ link }: { link: WhatsAppLink }) {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);

  // Re-checked on every page, as the layout (and this button) persists between navigations.
  useEffect(() => {
    const targets = document.querySelectorAll("[data-whatsapp-primary]");

    const visible = new Set<Element>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target);
        else visible.delete(entry.target);
      }
      setHidden(visible.size > 0);
    });
    targets.forEach((target) => observer.observe(target));
    return () => {
      observer.disconnect();
      setHidden(false);
    };
  }, [pathname]);

  if (!link.isWhatsApp) return null;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp (opens WhatsApp)"
      tabIndex={hidden ? -1 : undefined}
      aria-hidden={hidden || undefined}
      className={`group fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-30 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_-6px_rgb(7_29_59/0.35)] transition-[transform,opacity] duration-300 ease-out hover:scale-105 sm:right-6 sm:bottom-6 ${
        hidden ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppLogo className="size-7" />
    </a>
  );
}
