import { siteConfig } from "@/lib/site-config";

export const GENERAL_ENQUIRY_MESSAGE =
  "Hello, I would like to enquire about Serendib Crown Gems.\n\nCould you please provide more information?";

export type WhatsAppLink = {
  href: string;
  /** False when no business number is configured and the link falls back to the contact page. */
  isWhatsApp: boolean;
};

/**
 * Builds a WhatsApp click-to-chat link with a pre-filled, editable message.
 * Falls back to the contact page (or `fallbackHref`, e.g. a pre-filled enquiry form)
 * until the business number is configured.
 */
export function getWhatsAppLink(
  message: string = GENERAL_ENQUIRY_MESSAGE,
  fallbackHref: string = "/contact",
): WhatsAppLink {
  const number = siteConfig.contact.whatsappNumber;

  if (!number) {
    return { href: fallbackHref, isWhatsApp: false };
  }

  return {
    href: `https://wa.me/${number}?text=${encodeURIComponent(message)}`,
    isWhatsApp: true,
  };
}
