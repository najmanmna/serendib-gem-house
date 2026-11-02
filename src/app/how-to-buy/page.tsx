import type { Metadata } from "next";
import type { ComponentType, SVGProps } from "react";

import { ContactCTA } from "@/components/home/ContactCTA";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { CheckCircleIcon, EyeIcon, GemIcon, MessageIcon, TagIcon } from "@/components/ui/icons";
import { sectionTitle } from "@/components/ui/SectionHeading";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "How to Buy",
  description:
    "How buying a gemstone from Serendib Crown Gems works: browse the collection, send an enquiry, then arrange payment and delivery or handover with us personally.",
  alternates: { canonical: routes.howToBuy },
};

type Step = {
  title: string;
  Icon: ComponentType<SVGProps<SVGSVGElement>>;
  points: string[];
};

const steps: Step[] = [
  {
    title: "Browse the collection",
    Icon: GemIcon,
    points: [
      "Explore our gemstones, each with photographs, specifications and a price in LKR.",
      "Filter by gemstone, colour, shape, carat weight and price to find what suits you.",
    ],
  },
  {
    title: "Send an enquiry",
    Icon: MessageIcon,
    points: [
      "Message us on WhatsApp from any gemstone page: your message includes its name, Product ID and price.",
      "Or use our enquiry form. We will confirm availability and answer your questions.",
    ],
  },
  {
    title: "Agree on payment",
    Icon: TagIcon,
    points: [
      "Once you have decided, we confirm the details with you directly.",
      "Payment is by bank transfer or an agreed in-person payment.",
    ],
  },
  {
    title: "Receive your gemstone",
    Icon: CheckCircleIcon,
    points: [
      "Delivery or an in-person handover is arranged individually with you.",
      "We will confirm the arrangement that works best before anything is sent.",
    ],
  },
];

const extras = [
  {
    title: "Viewing in person",
    body: "If you are in Colombo and would like to see a gemstone before deciding, a viewing can be arranged by appointment. Just ask when you enquire.",
    Icon: EyeIcon,
  },
  {
    title: "Certification",
    body: "Certification is optional and can be arranged on request for an additional fee. We will confirm the laboratory, cost and turnaround with you before going ahead.",
    Icon: GemIcon,
  },
];

export default function HowToBuyPage() {
  return (
    <>
      <Container className="pt-10 pb-16 sm:pt-14 lg:pt-16 lg:pb-20">
        <header className="max-w-2xl">
          <h1 className="animate-fade-up font-heading text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
            How to Buy
          </h1>
          <p className="mt-5 animate-fade-up text-lg leading-relaxed text-muted [animation-delay:80ms]">
            Every purchase is arranged personally with you, at your own pace.
          </p>
        </header>

        <ol className="mt-14 lg:mt-20">
          {steps.map(({ title, Icon, points }, index) => (
            <li
              key={title}
              className="reveal grid gap-5 border-t border-line py-10 sm:grid-cols-[4rem_1fr] sm:gap-8 lg:grid-cols-[4rem_minmax(0,20rem)_1fr] lg:gap-12 lg:py-12"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-pale-blue">
                <Icon className="size-6 text-navy" strokeWidth={1.4} />
              </span>
              <h2 className="font-heading text-[2rem] leading-tight font-semibold sm:col-start-2 lg:pt-2">
                <span className="sr-only">Step {index + 1}: </span>
                {title}
              </h2>
              <ul className="space-y-3 text-base leading-relaxed text-navy/75 sm:col-start-2 lg:col-start-3 lg:pt-3">
                {points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Container>

      <section aria-labelledby="extras-heading" className="bg-pale-blue">
        <Container className="py-16 sm:py-20 lg:py-24">
          <h2 id="extras-heading" className={`reveal ${sectionTitle}`}>
            Optional extras
          </h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-12">
            {extras.map(({ title, body, Icon }) => (
              <li key={title} className="reveal flex gap-5 rounded-brand bg-white p-7 sm:p-8">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-pale-blue">
                  <Icon className="size-5 text-navy" strokeWidth={1.4} />
                </span>
                <div>
                  <h3 className="font-heading text-[1.6rem] leading-tight font-semibold">{title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-navy/75">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <ArrowLink href={routes.gemstones} className="reveal mt-12">
            Explore the collection
          </ArrowLink>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
