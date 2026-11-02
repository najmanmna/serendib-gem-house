"use client";

import Link from "next/link";
import { Suspense, useEffect, useRef, useState } from "react";

import { Logo } from "@/components/brand/Logo";
import { ActiveNavigationList } from "@/components/layout/ActiveNavigationList";
import { NavigationList } from "@/components/layout/NavigationList";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import type { WhatsAppLink } from "@/lib/whatsapp";

const DIALOG_ID = "mobile-navigation";

/**
 * Full-screen menu for small screens, built on the native <dialog> element for
 * focus containment, Escape-to-close and focus restoration.
 */
export function MobileNavigation({ whatsapp, location }: { whatsapp: WhatsAppLink; location: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    dialogRef.current?.showModal();
    setIsOpen(true);
  };

  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const dialog = dialogRef.current;
    const desktop = window.matchMedia("(min-width: 64rem)");

    const onDialogClose = () => setIsOpen(false);
    const onBreakpointChange = (event: MediaQueryListEvent) => {
      if (event.matches) dialog?.close();
    };

    dialog?.addEventListener("close", onDialogClose);
    desktop.addEventListener("change", onBreakpointChange);

    return () => {
      dialog?.removeEventListener("close", onDialogClose);
      desktop.removeEventListener("change", onBreakpointChange);
    };
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls={DIALOG_ID}
        className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-brand text-navy lg:hidden"
      >
        <MenuIcon className="size-6" />
        <span className="sr-only">Open menu</span>
      </button>

      <dialog
        ref={dialogRef}
        id={DIALOG_ID}
        aria-label="Menu"
        className="mobile-nav fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none bg-white p-0 text-navy"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-20 shrink-0 items-center justify-between border-b border-line px-5 sm:px-8">
            <Link href="/" onClick={close} aria-label="Serendib Crown Gems, home" className="rounded-brand">
              <Logo />
            </Link>
            <button
              type="button"
              onClick={close}
              className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-brand"
            >
              <CloseIcon className="size-6" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>

          <nav aria-label="Main" className="flex-1 overflow-y-auto px-5 pt-2 sm:px-8">
            <Suspense fallback={<NavigationList pathname={null} variant="mobile" onNavigate={close} />}>
              <ActiveNavigationList variant="mobile" onNavigate={close} />
            </Suspense>
          </nav>

          <div className="shrink-0 space-y-4 border-t border-line px-5 py-6 sm:px-8">
            <WhatsAppButton link={whatsapp} className="w-full" />
            <p className="text-center text-sm text-muted">{location}</p>
          </div>
        </div>
      </dialog>
    </>
  );
}
