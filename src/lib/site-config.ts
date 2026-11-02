/**
 * Central business configuration.
 *
 * Contact details are set here directly. Leave a value as `null` until it is
 * confirmed: the site then shows a neutral "Coming soon" instead of an invented detail.
 */

type ContactDetails = {
  /** International format, digits only, e.g. "947XXXXXXXX". Used for WhatsApp links. */
  whatsappNumber: string | null;
  email: string | null;
  instagramUrl: string | null;
};

const contact: ContactDetails = {
  whatsappNumber: "+947077411188",
  email: null,
  instagramUrl: "https://www.instagram.com/serendib_gem_house/",
};

export const siteConfig = {
  name: "Serendib Gem House",
  description:
    "Carefully selected spinels, garnets, sapphires and other fine gemstones, with transparent information and personal assistance from Colombo, Sri Lanka.",
  // Differs between local development and the live domain, so it stays an environment variable.
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  location: "Colombo, Sri Lanka",
  contact: {
    ...contact,
    whatsappNumber: contact.whatsappNumber?.replace(/\D/g, "") || null,
  },
} as const;
