import Image from "next/image";
import Link from "next/link";

import { GemShowcase } from "@/components/home/gem/GemShowcase";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { featuredProducts } from "@/lib/data/home";
import { formatLKR } from "@/lib/format";
import { routes } from "@/lib/routes";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Hero() {
  // A small spotlight on the first featured gemstone (from Sanity once connected).
  const spotlight = featuredProducts.items.find((product) => product.availability !== "sold");

  return (
    <section aria-labelledby="hero-heading" className="overflow-x-clip">
      <Container className="grid items-center pt-2 pb-12 sm:pt-6 sm:pb-16 lg:grid-cols-12 lg:pt-8 lg:pb-20">
        {/* On phones the gem comes first so it shares the first screen with the headline */}
        <div className="relative order-first lg:order-last lg:col-span-5">
          <GemShowcase className="mx-auto mb-3 h-[17rem] w-full sm:mb-0 sm:h-[22rem] lg:aspect-square lg:h-auto lg:w-[112%]" />
        </div>

        <div className="relative z-10 lg:col-span-7 lg:pr-4">
          <h1
            id="hero-heading"
            className="animate-fade-up font-heading text-[2.6rem] leading-[0.98] font-semibold tracking-[-0.02em] text-balance [animation-delay:60ms] sm:text-[4.5rem] sm:leading-[0.95] lg:text-[5.5rem] xl:text-[6.75rem]"
          >
            Discover the Beauty of Fine Gemstones
          </h1>

          <div data-whatsapp-primary className="mt-8 flex animate-fade-up gap-3 [animation-delay:120ms] sm:mt-12">
            <ButtonLink href={routes.gemstones} className="flex-1 sm:flex-none">
              Explore Gemstones
            </ButtonLink>
            <WhatsAppButton link={getWhatsAppLink()} variant="secondary" className="flex-1 sm:flex-none" />
          </div>

          {spotlight && (
            <Link
              href={routes.product(spotlight.slug)}
              className="group mt-14 hidden w-full max-w-sm animate-fade-up items-center gap-4 rounded-brand bg-[#F3F7FA] p-3 pr-4 transition-colors duration-300 [animation-delay:180ms] hover:bg-pale-blue sm:flex"
            >
              <span className="relative size-16 shrink-0 overflow-hidden rounded-[3px] bg-white">
                <Image
                  src={spotlight.image.src}
                  alt=""
                  fill
                  sizes="64px"
                  className="object-cover transition-transform duration-500 ease-out motion-safe:group-hover:scale-110"
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[0.625rem] font-medium tracking-[0.16em] text-muted uppercase">
                  Featured
                </span>
                <span className="mt-1 block truncate font-heading text-lg leading-tight font-semibold text-navy">
                  {spotlight.name}
                </span>
                <span className="mt-0.5 block text-sm text-navy/70">
                  {formatLKR(
                    spotlight.salePrice !== undefined && spotlight.salePrice < spotlight.price
                      ? spotlight.salePrice
                      : spotlight.price,
                  )}
                </span>
              </span>
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white">
                <ArrowRightIcon className="size-4" />
              </span>
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
}
