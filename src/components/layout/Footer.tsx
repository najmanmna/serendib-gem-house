import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/Logo";
import { Container } from "@/components/ui/Container";
import { ChatIcon, InstagramIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { categories } from "@/lib/data/home";
import { mainNavigation, routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppLink } from "@/lib/whatsapp";

/** Captured once in the cached static shell rather than on every request. */
async function CurrentYear() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

function ColumnHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-medium tracking-[0.18em] text-white/60 uppercase">{children}</h2>
  );
}

const footerLink = "text-[0.9375rem] text-white/85 transition-colors duration-200 hover:text-aqua";

type ContactItemProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function ContactItem({ icon, label, children }: ContactItemProps) {
  return (
    <li className="flex gap-3.5">
      <span className="mt-0.5 text-aqua">{icon}</span>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <div className="mt-0.5 text-[0.9375rem] text-white/85">{children}</div>
      </div>
    </li>
  );
}

function NotYetConfigured() {
  return <span className="text-white/60">Coming soon</span>;
}

export function Footer() {
  const { email, instagramUrl, whatsappNumber } = siteConfig.contact;
  const whatsapp = getWhatsAppLink();
  const iconClass = "size-[1.125rem]";

  return (
    <footer data-surface="dark" className="border-t border-white/10 bg-navy text-white">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Link href="/" aria-label="Serendib Gem House, home" className="inline-block rounded-brand">
            <Logo tone="light" layout="stacked" />
          </Link>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-white/70">
            Carefully selected gemstones, transparent information and personal service from Colombo,
            Sri Lanka.
          </p>
        </div>

        <nav aria-labelledby="footer-explore" className="lg:col-span-2 lg:col-start-6">
          <ColumnHeading>
            <span id="footer-explore">Explore</span>
          </ColumnHeading>
          <ul className="mt-5 space-y-3">
            {mainNavigation.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={footerLink}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-gemstones" className="lg:col-span-2">
          <ColumnHeading>
            <span id="footer-gemstones">Gemstones</span>
          </ColumnHeading>
          <ul className="mt-5 space-y-3">
            {categories.map((category) => (
              <li key={category.slug}>
                <Link href={routes.category(category.slug)} className={footerLink}>
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-2 lg:col-span-3 lg:col-start-10">
          <ColumnHeading>Contact</ColumnHeading>
          <ul className="mt-5 space-y-5">
            <ContactItem icon={<ChatIcon className={iconClass} />} label="WhatsApp">
              {whatsapp.isWhatsApp ? (
                <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  +{whatsappNumber}
                  <span className="sr-only"> (opens WhatsApp)</span>
                </a>
              ) : (
                <NotYetConfigured />
              )}
            </ContactItem>
            <ContactItem icon={<MailIcon className={iconClass} />} label="Email">
              {email ? (
                <a href={`mailto:${email}`} className={footerLink}>
                  {email}
                </a>
              ) : (
                <NotYetConfigured />
              )}
            </ContactItem>
            <ContactItem icon={<MapPinIcon className={iconClass} />} label="Location">
              {siteConfig.location}
              <span className="block text-sm text-white/60">Viewings by appointment</span>
            </ContactItem>
            <ContactItem icon={<InstagramIcon className={iconClass} />} label="Instagram">
              {instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={footerLink}>
                  Follow us on Instagram
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ) : (
                <NotYetConfigured />
              )}
            </ContactItem>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © <CurrentYear /> {siteConfig.name}. All rights reserved.
          </p>
          <p>{siteConfig.location}</p>
        </Container>
      </div>
    </footer>
  );
}
