import type { Metadata } from "next";
import { Suspense } from "react";

import { CatalogueProvider } from "@/components/catalogue/CatalogueContext";
import { CatalogueLayout } from "@/components/catalogue/CatalogueLayout";
import { ClearFiltersButton, LoadMore } from "@/components/catalogue/ResultControls";
import { ProductCard } from "@/components/product/ProductCard";
import { Container } from "@/components/ui/Container";
import { categories } from "@/lib/data/home";
import { parseFilters } from "@/lib/catalogue/filters";
import { getCatalogue } from "@/lib/catalogue/query";
import { routes } from "@/lib/routes";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Our Collection",
  description:
    "Browse carefully selected spinels, garnets, sapphires and other fine gemstones, with photographs, details and prices in LKR.",
  alternates: { canonical: routes.gemstones },
};

const categoryOptions = categories.map(({ name, slug }) => ({ name, slug }));

const productGrid =
  "grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8 lg:group-data-[sidebar=open]/catalogue:grid-cols-3";

function EmptyState() {
  const whatsapp = getWhatsAppLink("Hello, I am looking for a gemstone. Could you help me find one?");

  return (
    <div className="flex flex-col items-center py-20 text-center">
      <h2 className="font-heading text-4xl font-semibold">No gemstones found</h2>
      <p className="mt-3 max-w-sm text-navy/70">
        Try adjusting or clearing your filters to see more of the collection.
      </p>
      <div className="mt-8">
        <ClearFiltersButton />
      </div>
      <a
        href={whatsapp.href}
        {...(whatsapp.isWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="mt-6 border-b border-navy/30 pb-0.5 text-sm text-navy transition-colors hover:border-navy"
      >
        Looking for something specific? Ask us
      </a>
    </div>
  );
}

async function Catalogue({ searchParams }: { searchParams: PageProps<"/gemstones">["searchParams"] }) {
  const filters = parseFilters(await searchParams);
  const { items, total } = getCatalogue(filters);

  return (
    <CatalogueProvider filters={filters}>
      <CatalogueLayout categories={categoryOptions} total={total}>
        {items.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <ul className={productGrid}>
              {items.map((product) => (
                <li key={product.productId}>
                  <ProductCard
                    product={product}
                    sizes="(min-width: 1360px) 300px, (min-width: 1024px) 24vw, (min-width: 640px) 31vw, 46vw"
                  />
                </li>
              ))}
            </ul>
            <LoadMore shown={items.length} total={total} />
          </>
        )}
      </CatalogueLayout>
    </CatalogueProvider>
  );
}

function CatalogueSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="h-[4.75rem] border-y border-line" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index}>
            <div className="aspect-square rounded-brand bg-pale-blue motion-safe:animate-pulse" />
            <div className="mt-5 h-3 w-1/3 rounded bg-pale-blue motion-safe:animate-pulse" />
            <div className="mt-3 h-5 w-3/4 rounded bg-pale-blue motion-safe:animate-pulse" />
            <div className="mt-6 h-4 w-1/2 rounded bg-pale-blue motion-safe:animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GemstonesPage(props: PageProps<"/gemstones">) {
  return (
    <Container className="pt-10 pb-20 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-32">
      <header className="max-w-2xl">
        <h1 className="font-heading text-[2.9rem] leading-[0.98] font-semibold tracking-[-0.02em] sm:text-6xl lg:text-[4.5rem]">
          Our Collection
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Explore our gemstones, each one carefully chosen.
        </p>
      </header>

      <div className="mt-10 lg:mt-12">
        <Suspense fallback={<CatalogueSkeleton />}>
          <Catalogue searchParams={props.searchParams} />
        </Suspense>
      </div>
    </Container>
  );
}
