import Link from "next/link";

import { ArrowRightIcon } from "@/components/ui/icons";
import { mainNavigation } from "@/lib/routes";

export type NavigationListProps = {
  /** `null` while the pathname is unknown (e.g. during prerendering); no item is marked active. */
  pathname: string | null;
  variant: "desktop" | "mobile";
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const linkStyles = {
  desktop:
    "relative py-2 text-[0.9375rem] font-medium tracking-[0.01em] text-navy transition-colors duration-200 hover:text-navy/70 aria-[current=page]:text-navy after:absolute after:inset-x-0 after:bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-aqua after:transition-transform after:duration-300 after:ease-out hover:after:scale-x-100 aria-[current=page]:after:scale-x-100",
  mobile:
    "group flex items-center justify-between border-b border-line py-5 font-heading text-[2rem] leading-none font-semibold text-navy aria-[current=page]:text-navy/60",
};

export function NavigationList({ pathname, variant, onNavigate }: NavigationListProps) {
  return (
    <ul className={variant === "desktop" ? "flex items-center gap-8 xl:gap-10" : "flex flex-col"}>
      {mainNavigation.map((item) => {
        const active = pathname !== null && isActive(pathname, item.href);

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={active ? "page" : undefined}
              onClick={onNavigate}
              className={linkStyles[variant]}
            >
              {item.label}
              {variant === "mobile" && (
                <ArrowRightIcon className="size-5 text-navy/40 transition-transform duration-300 group-hover:translate-x-1 group-aria-[current=page]:text-aqua" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
