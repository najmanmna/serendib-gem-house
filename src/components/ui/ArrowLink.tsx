import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowRightIcon } from "@/components/ui/icons";

type ArrowLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

/** Understated text link with an underline and a gently moving arrow. */
export function ArrowLink({ href, children, className = "" }: ArrowLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border-b border-navy/25 pb-1 text-[0.9375rem] font-medium text-navy transition-colors duration-200 hover:border-aqua ${className}`}
    >
      {children}
      <ArrowRightIcon className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
    </Link>
  );
}
