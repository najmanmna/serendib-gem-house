import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Suspense } from "react";

import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { ChatIcon, InstagramIcon, MailIcon, MapPinIcon } from "@/components/ui/icons";
import { products } from "@/lib/data/products";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Serendib Crown Gems in Colombo, Sri Lanka, on WhatsApp, by email or through our enquiry form.",
  alternates: { canonical: routes.contact },
};

function ContactMethod({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 border-b border-line py-5 first:pt-0">
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-pale-blue text-navy">
        {icon}
      </span>
      <div>
        <p className="text-xs tracking-wide text-muted">{label}</p>
        <div className="mt-1 text-[0.9375rem] text-navy">{children}</div>
      </div>
    </li>
  );
}

const comingSoon = <span className="text-muted">Coming soon</span>;
const linkClass = "border-b border-navy/25 transition-colors hover:border-navy";

/** Pre-fills the form from links such as /contact?type=viewing&product=SGH-0001. */
async function PrefilledForm({ searchParams }: { searchParams: PageProps<"/contact">["searchParams"] }) {
  const params = await searchParams;
  const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";
  const productId = first(params.product).toUpperCase().slice(0, 20);
  const product = products.find((item) => item.productId === productId);

  return <EnquiryForm initialType={first(params.type)} initialProductId={productId} productName={product?.name} />;
}

export default function ContactPage(props: PageProps<"/contact">) {
  const { whatsappNumber, email, instagramUrl } = siteConfig.contact;
  const whatsapp = getWhatsAppLink();
  const iconClass = "size-5";

  return (
    <Container className="pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32">
      {/* Phones: title, then the form, then contact details. Desktop: details beside the form. */}
      <div className="grid gap-10 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-10 lg:gap-y-0">
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-1">
          <h1 className="animate-fade-up font-heading text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
            Contact Us
          </h1>
          <p className="mt-5 max-w-md animate-fade-up text-lg leading-relaxed text-muted [animation-delay:80ms]">
            Questions about a gemstone, or looking for something specific? We are happy to help.
          </p>
        </div>

        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          {whatsapp.isWhatsApp && (
            <div data-whatsapp-primary className="mt-2 animate-fade-up [animation-delay:120ms] lg:mt-8">
              <WhatsAppButton link={whatsapp} label="Chat on WhatsApp" />
            </div>
          )}

          <ul className="mt-6 animate-fade-up [animation-delay:160ms] lg:mt-10">
            <ContactMethod icon={<ChatIcon className={iconClass} />} label="WhatsApp">
              {whatsapp.isWhatsApp ? (
                <a href={whatsapp.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  +{whatsappNumber}
                </a>
              ) : (
                comingSoon
              )}
            </ContactMethod>
            <ContactMethod icon={<MailIcon className={iconClass} />} label="Email">
              {email ? (
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              ) : (
                comingSoon
              )}
            </ContactMethod>
            <ContactMethod icon={<InstagramIcon className={iconClass} />} label="Instagram">
              {instagramUrl ? (
                <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  Follow us on Instagram
                </a>
              ) : (
                comingSoon
              )}
            </ContactMethod>
            <ContactMethod icon={<MapPinIcon className={iconClass} />} label="Location">
              {siteConfig.location}
              <span className="mt-0.5 block text-sm text-muted">Viewings by appointment</span>
            </ContactMethod>
          </ul>
        </div>

        <section
          aria-labelledby="enquiry-heading"
          className="row-start-2 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-start"
        >
          <div className="rounded-brand border border-line p-6 sm:p-10">
            <h2 id="enquiry-heading" className="font-heading text-[2rem] leading-tight font-semibold">
              Send an enquiry
            </h2>
            <p className="mt-2 mb-8 text-[0.9375rem] text-navy/70">
              Fill in the form and we will get back to you.
            </p>
            <Suspense fallback={<EnquiryForm />}>
              <PrefilledForm searchParams={props.searchParams} />
            </Suspense>
          </div>
        </section>
      </div>
    </Container>
  );
}
