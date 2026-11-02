import type { ComponentType, SVGProps } from "react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { CheckCircleIcon, GemIcon, MessageIcon } from "@/components/ui/icons";
import { sectionTitle } from "@/components/ui/SectionHeading";
import { buyingSteps } from "@/lib/data/home";
import { routes } from "@/lib/routes";

const stepIcons: Record<(typeof buyingSteps)[number]["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  gem: GemIcon,
  message: MessageIcon,
  check: CheckCircleIcon,
};

/** Three steps, kept visual: an icon, one word and a short caption each. */
export function HowToBuy() {
  return (
    <section aria-labelledby="how-to-buy-heading">
      <Container className="py-16 text-center sm:py-20 lg:py-24">
        <h2 id="how-to-buy-heading" className={`reveal ${sectionTitle}`}>
          How to Buy
        </h2>

        <ol className="relative mx-auto mt-12 grid max-w-4xl grid-cols-3 gap-4 sm:gap-8 lg:mt-14">
          {/* Line joining the step icons */}
          <span aria-hidden="true" className="absolute top-8 right-[16.67%] left-[16.67%] h-px bg-navy/15 sm:top-10" />
          {buyingSteps.map((step, index) => {
            const StepIcon = stepIcons[step.icon];

            return (
              <li key={step.title} className="reveal relative flex flex-col items-center">
                <span className="relative flex size-16 items-center justify-center rounded-full bg-pale-blue sm:size-20">
                  <StepIcon className="size-7 text-navy sm:size-8" strokeWidth={1.3} />
                  <span className="absolute -top-1 -right-1 flex size-6 items-center justify-center rounded-full bg-navy text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-5 font-heading text-[1.5rem] leading-none font-semibold sm:text-[1.9rem]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-navy/65 sm:text-[0.9375rem]">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <ArrowLink href={routes.howToBuy} className="reveal mt-12 lg:mt-14">
          Learn more
        </ArrowLink>
      </Container>
    </section>
  );
}
