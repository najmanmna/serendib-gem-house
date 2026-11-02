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
  whatsappNumber: "+94707741118",
  email: null,
  instagramUrl: "https://www.instagram.com/serendib_gem_house/",
};

/** "+94707741118" → "+94 70 774 1118"; other formats are shown as given. */
function formatSriLankanNumber(number: string | null) {
  const digits = number?.replace(/\D/g, "") ?? "";
  const match = digits.match(/^94(\d{2})(\d{3})(\d{4})$/);
  return match ? `+94 ${match[1]} ${match[2]} ${match[3]}` : number;
}

export const siteConfig = {
  name: "Serendib Crown Gems",
  description:
    "Carefully selected spinels, garnets, sapphires and other fine gemstones, with transparent information and personal assistance from Colombo, Sri Lanka.",
  // Differs between local development and the live domain, so it stays an environment variable.
  url: process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000",
  location: "Colombo, Sri Lanka",
  contact: {
    ...contact,
    whatsappNumber: contact.whatsappNumber?.replace(/\D/g, "") || null,
    /** For display, e.g. "+94 70 774 1118". */
    whatsappDisplay: formatSriLankanNumber(contact.whatsappNumber),
  },
} as const;
