import Image from "next/image";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { categories } from "@/lib/data/home";
import { routes } from "@/lib/routes";
import type { GemstoneCategory } from "@/lib/types";

function CategoryPanel({ category }: { category: GemstoneCategory }) {
  return (
    <Link
      href={routes.category(category.slug)}
      className="group relative block h-full overflow-hidden rounded-brand bg-navy"
    >
      <Image
        src={category.image.src}
        alt=""
        fill
        sizes="(min-width: 1024px) 40vw, (min-width: 640px) 45vw, 75vw"
        className="object-cover transition-transform duration-[900ms] ease-out motion-safe:group-hover:scale-[1.05]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-[#04122a]/90 via-[#04122a]/35 to-transparent"
      />

      <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6 lg:p-8">
        <h3 className="font-heading text-[1.9rem] leading-none font-semibold lg:text-[2.4rem]">
          {category.name}
        </h3>
        <div className="category-reveal">
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">{category.description}</p>
          <span className="mt-5 inline-flex items-center gap-3 text-sm font-medium">
            Explore
            <span className="flex size-9 items-center justify-center rounded-full border border-white/40 transition-colors duration-300 group-hover:border-aqua group-hover:bg-aqua group-hover:text-navy">
              <ArrowRightIcon className="size-4" />
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

export function CategorySection() {
  return (
    <section aria-labelledby="categories-heading" className="overflow-x-clip">
      <Container className="pb-20 sm:pb-24 lg:pb-32">
        <SectionHeading id="categories-heading" title="Shop by Gemstone" className="reveal" />

        {/* Swipeable row on small screens; expanding accordion on large screens */}
        <ul className="category-accordion reveal -mx-5 mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-8 sm:gap-4 sm:px-8 lg:mx-0 lg:mt-14 lg:h-[34rem] lg:overflow-visible lg:px-0 lg:pb-0 xl:h-[38rem] [&::-webkit-scrollbar]:hidden">
          {categories.map((category) => (
            <li
              key={category.slug}
              className="aspect-[3/4] w-[74%] shrink-0 snap-start sm:w-[44%] lg:aspect-auto lg:w-auto lg:min-w-[14%] lg:shrink"
            >
              <CategoryPanel category={category} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
