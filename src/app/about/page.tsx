import type { Metadata } from "next";
import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { ContactCTA } from "@/components/home/ContactCTA";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { GemIcon, MessageIcon, TagIcon } from "@/components/ui/icons";
import { sectionTitle } from "@/components/ui/SectionHeading";
import { aboutImages } from "@/lib/data/about";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Serendib Crown Gems is a Colombo-based gemstone business making fine gemstones accessible and affordable for everyone, with clear prices and personal assistance.",
  alternates: { canonical: routes.about },
};

const label = "text-xs font-medium tracking-[0.2em] text-navy/60 uppercase";

const principles: Array<{ title: string; description: string; Icon: ComponentType<SVGProps<SVGSVGElement>> }> = [
  {
    title: "Careful selection",
    description:
      "Every gemstone is chosen individually, across a range of varieties and prices, so there is something for every budget.",
    Icon: GemIcon,
  },
  {
    title: "Honest information",
    description:
      "Clear prices in LKR and only the details we can verify. Origin and treatment are stated when known, never assumed.",
    Icon: TagIcon,
  },
  {
    title: "Personal assistance",
    description:
      "Speak with us directly before you decide. We are happy to answer your questions and help you choose.",
    Icon: MessageIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Introduction */}
      <section aria-labelledby="about-heading" className="overflow-x-clip">
        <Container className="grid items-center gap-12 pt-10 pb-20 sm:pt-14 lg:grid-cols-12 lg:gap-10 lg:pt-16 lg:pb-28">
          <div className="lg:col-span-6">
            <p className={`animate-fade-up ${label}`}>About us</p>
            <h1
              id="about-heading"
              className="mt-5 animate-fade-up font-heading text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.02em] text-balance [animation-delay:60ms] sm:text-6xl lg:text-[5rem]"
            >
              About Serendib Crown Gems
            </h1>
            <p className="mt-7 max-w-lg animate-fade-up text-lg leading-relaxed text-muted [animation-delay:120ms]">
              A Colombo-based gemstone business offering carefully selected gemstones, with clear
              prices and personal assistance.
            </p>
          </div>

          <div className="animate-fade-up [animation-delay:120ms] lg:col-span-5 lg:col-start-8">
            <div className="relative mx-auto aspect-[4/3] max-w-md overflow-hidden rounded-brand sm:aspect-[4/5] lg:mr-0">
              <Image
                src={aboutImages.intro.src}
                alt={aboutImages.intro.alt}
                fill
                loading="eager"
                fetchPriority="high"
                sizes="(min-width: 1024px) 448px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section aria-labelledby="mission-heading" className="bg-pale-blue">
        <Container className="reveal py-20 text-center sm:py-24 lg:py-32">
          <h2 id="mission-heading" className={label}>
            Our mission
          </h2>
          <p className="mx-auto mt-6 max-w-4xl font-heading text-[2.25rem] leading-[1.1] font-semibold tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.75rem]">
            To make fine gemstones accessible and affordable for everyone.
          </p>
        </Container>
      </section>

      {/* How we work */}
      <section aria-labelledby="principles-heading">
        <Container className="py-20 sm:py-24 lg:py-32">
          <h2 id="principles-heading" className={`reveal ${sectionTitle}`}>
            How we work
          </h2>

          <ul className="mt-12 grid gap-12 sm:grid-cols-3 sm:gap-8 lg:mt-16 lg:gap-12">
            {principles.map(({ title, description, Icon }) => (
              <li key={title} className="reveal border-t border-line pt-8">
                <span className="flex size-12 items-center justify-center rounded-full bg-pale-blue">
                  <Icon className="size-5 text-navy" strokeWidth={1.4} />
                </span>
                <h3 className="mt-6 font-heading text-[1.75rem] leading-tight font-semibold">{title}</h3>
                <p className="mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-navy/70">{description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Based in Colombo */}
      <section aria-labelledby="colombo-heading" className="bg-pale-blue">
        <div className="mx-auto grid max-w-[100rem] lg:grid-cols-2">
          <div className="relative aspect-[4/3] lg:aspect-auto lg:min-h-[36rem]">
            <Image
              src={aboutImages.colombo.src}
              alt={aboutImages.colombo.alt}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="reveal flex flex-col justify-center px-5 py-16 sm:px-8 sm:py-20 lg:px-16 xl:px-24">
            <h2 id="colombo-heading" className={sectionTitle}>
              Based in Colombo
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-navy/75">
              We serve customers across Sri Lanka. If you would like to see a gemstone in person, a
              viewing in Colombo can be arranged by appointment. Certification can also be arranged
              on request.
            </p>
            <ArrowLink href={routes.howToBuy} className="mt-10 self-start">
              How to buy
            </ArrowLink>
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
