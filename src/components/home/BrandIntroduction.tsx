import Image from "next/image";
import type { ComponentType, SVGProps } from "react";

import { ArrowLink } from "@/components/ui/ArrowLink";
import { Container } from "@/components/ui/Container";
import { GemIcon, MessageIcon, TagIcon } from "@/components/ui/icons";
import { sectionTitle } from "@/components/ui/SectionHeading";
import { storyDetailImage, storyImage, trustPoints } from "@/lib/data/home";
import { routes } from "@/lib/routes";

const icons: Record<(typeof trustPoints)[number]["icon"], ComponentType<SVGProps<SVGSVGElement>>> = {
  gem: GemIcon,
  tag: TagIcon,
  message: MessageIcon,
};

/**
 * The brand mission and its three assurances, beside a large gemstone
 * photograph overlapped by a smaller image of a stone held in the hand.
 */
export function BrandIntroduction() {
  return (
    <section aria-labelledby="story-heading" className="overflow-x-clip bg-pale-blue">
      <Container className="grid items-center gap-16 py-20 sm:py-24 lg:grid-cols-12 lg:gap-10 lg:py-32">
        <div className="reveal lg:col-span-5">
          <p className="text-xs font-medium tracking-[0.2em] text-navy/60 uppercase">Our mission</p>
          <h2 id="story-heading" className={`mt-5 ${sectionTitle}`}>
            Fine gemstones, within everyone&rsquo;s reach.
          </h2>
          <ul className="mt-10 space-y-4 border-t border-navy/10 pt-8">
            {trustPoints.map((point) => {
              const PointIcon = icons[point.icon];

              return (
                <li key={point.title} className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white">
                    <PointIcon className="size-5 text-navy" strokeWidth={1.4} />
                  </span>
                  <span className="font-heading text-[1.35rem] leading-tight font-semibold">{point.title}</span>
                </li>
              );
            })}
          </ul>

          <ArrowLink href={routes.about} className="mt-10">
            About us
          </ArrowLink>
        </div>

        <div className="reveal relative mb-[8%] lg:col-span-6 lg:col-start-7 lg:mb-0">
          <div className="relative ml-auto aspect-[4/5] w-[82%] overflow-hidden rounded-brand">
            <Image
              src={storyImage.src}
              alt={storyImage.alt}
              fill
              sizes="(min-width: 1360px) 520px, (min-width: 1024px) 40vw, 82vw"
              className="object-cover"
            />
          </div>
          {/* The pale-blue ring separates the overlapping image from the one behind it */}
          <div className="absolute bottom-[-8%] left-0 aspect-square w-[44%] overflow-hidden rounded-brand ring-[10px] ring-pale-blue sm:ring-[14px]">
            <Image
              src={storyDetailImage.src}
              alt={storyDetailImage.alt}
              fill
              sizes="(min-width: 1360px) 280px, (min-width: 1024px) 22vw, 44vw"
              className="object-cover"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
