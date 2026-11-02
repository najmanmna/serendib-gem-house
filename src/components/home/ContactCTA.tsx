import Image from "next/image";
import Link from "next/link";

import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { contactImage } from "@/lib/data/home";
import { routes } from "@/lib/routes";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-heading" data-surface="dark" className="bg-navy text-white">
      <div className="mx-auto grid max-w-[100rem] lg:grid-cols-2">
        <div className="reveal order-2 flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:order-1 lg:px-16 lg:py-28 xl:px-24">
          <h2
            id="contact-cta-heading"
            className="max-w-lg font-heading text-[2.75rem] leading-[1.02] font-semibold tracking-[-0.02em] text-balance sm:text-6xl xl:text-[4.5rem]"
          >
            Looking for Something Special?
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-white/70">
            Get in touch and let us help you find the right gemstone.
          </p>
          <div data-whatsapp-primary className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-8">
            <WhatsAppButton link={getWhatsAppLink()} variant="accent" label="Chat on WhatsApp" />
            <Link
              href={routes.contact}
              className="self-start border-b border-white/30 pb-1 text-[0.9375rem] text-white/85 transition-colors duration-200 hover:border-aqua hover:text-white sm:self-auto"
            >
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className="relative order-1 aspect-[16/11] lg:order-2 lg:aspect-auto lg:min-h-[38rem]">
          <Image
            src={contactImage.src}
            alt={contactImage.alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
