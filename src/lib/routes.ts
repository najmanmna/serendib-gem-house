export const routes = {
  home: "/",
  gemstones: "/gemstones",
  about: "/about",
  howToBuy: "/how-to-buy",
  contact: "/contact",
  category: (slug: string) => `/gemstones?category=${slug}`,
  product: (slug: string) => `/gemstones/${slug}`,
} as const;

export const mainNavigation = [
  { label: "Home", href: routes.home },
  { label: "Gemstones", href: routes.gemstones },
  { label: "About Us", href: routes.about },
  { label: "How to Buy", href: routes.howToBuy },
  { label: "Contact", href: routes.contact },
] as const;

export type NavigationItem = (typeof mainNavigation)[number];
