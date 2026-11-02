import Image from "next/image";

import logoStackedLight from "@/assets/brand/logo-light.png";
import logoStacked from "@/assets/brand/logo.png";
import logoNavbarLight from "@/assets/brand/logo-navbar-light.png";
import logoNavbar from "@/assets/brand/logo-navbar.png";

/**
 * Brand logo, from the supplied artwork:
 * - `horizontal`: the navbar lockup (src/assets/brand/serendib-logo-navbar-original.png),
 *   used in the header and mobile menu.
 * - `stacked`: the full lockup (src/assets/brand/serendib-logo-original.png).
 *
 * Images use empty alt text: every usage sits inside a link labelled with the brand name.
 */

type LogoProps = {
  tone?: "default" | "light";
  layout?: "horizontal" | "stacked";
  /** Header only: shrinks the logo slightly once the page is scrolled. */
  compactOnScroll?: boolean;
  className?: string;
};

export function Logo({
  tone = "default",
  layout = "horizontal",
  compactOnScroll = false,
  className = "",
}: LogoProps) {
  if (layout === "stacked") {
    return (
      <Image
        src={tone === "light" ? logoStackedLight : logoStacked}
        alt=""
        sizes="200px"
        className={`h-auto w-40 ${className}`}
      />
    );
  }

  const height = compactOnScroll
    ? "h-11 sm:h-12 lg:h-14 group-data-[scrolled=true]/header:h-10 lg:group-data-[scrolled=true]/header:h-11"
    : "h-11 sm:h-12";

  return (
    <Image
      src={tone === "light" ? logoNavbarLight : logoNavbar}
      alt=""
      loading="eager"
      sizes="(min-width: 1024px) 220px, 180px"
      className={`w-auto transition-[height] duration-300 ease-out ${height} ${className}`}
    />
  );
}
