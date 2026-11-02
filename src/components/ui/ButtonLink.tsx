import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "secondary" | "accent" | "outline-light";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-brand font-medium whitespace-nowrap transition-colors duration-200 ease-out";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white hover:bg-navy-hover",
  secondary: "border border-navy bg-white text-navy hover:bg-navy hover:text-white",
  accent: "bg-aqua text-navy hover:bg-aqua-hover",
  "outline-light": "border border-white/35 text-white hover:border-white hover:bg-white hover:text-navy",
};

const sizes: Record<Size, string> = {
  md: "h-12 px-5 text-sm sm:px-7 sm:text-[0.9375rem]",
  sm: "h-10 px-5 text-sm",
};

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Opens in a new browser context, e.g. WhatsApp links. */
  external?: boolean;
  className?: string;
  "aria-label"?: string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  size = "md",
  external = false,
  className = "",
  ...rest
}: ButtonLinkProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...rest}>
      {children}
    </Link>
  );
}
