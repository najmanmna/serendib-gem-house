import Image from "next/image";
import Link from "next/link";

import { ProductPrice } from "@/components/product/ProductPrice";
import { SaleBadge } from "@/components/product/SaleBadge";
import { ArrowRightIcon } from "@/components/ui/icons";
import { colourLabel, shapeLabel } from "@/lib/catalogue/options";
import { formatSpecifications } from "@/lib/format";
import { routes } from "@/lib/routes";
import type { ProductSummary } from "@/lib/types";

type ProductCardProps = {
  product: ProductSummary;
  sizes?: string;
};

/**
 * Catalogue card presented like a gallery piece: a full-bleed photograph (with a Sale tag
 * or Sold out overlay only when relevant), catalogue details, the name in the brand serif and
 * the price set apart beneath a fine rule. The whole card is a single link.
 */
export function ProductCard({
  product,
  sizes = "(min-width: 1360px) 290px, (min-width: 1024px) 21vw, (min-width: 640px) 42vw, 46vw",
}: ProductCardProps) {
  const { name, category, availability, image, price, salePrice } = product;
  const sold = availability === "sold";
  const onSale = !sold && salePrice !== undefined && salePrice < price;
  const specifications = formatSpecifications([
    product.weightCarats ? `${product.weightCarats.toFixed(2)} ct` : null,
    product.shape && product.shape !== "other" ? shapeLabel(product.shape, "card") : null,
    product.colour ? colourLabel(product.colour) : null,
  ]);

  return (
    <Link href={routes.product(product.slug)} className="group block h-full rounded-brand">
      <article className="flex h-full flex-col">
        <div className="relative aspect-square overflow-hidden rounded-brand bg-white">
          <div className="relative size-full">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              className="object-contain transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.06]"
            />

            {/* Hover reveal */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-between bg-navy/90 px-3.5 py-2.5 text-xs font-medium tracking-wide text-white transition-transform duration-300 ease-out group-hover:translate-y-0"
            >
              View details
              <ArrowRightIcon className="size-3.5" />
            </div>

            {sold && (
              <div className="absolute inset-0 grid place-items-center bg-white/60">
                <span className="rounded-full bg-navy px-4 py-2 text-[0.6875rem] font-semibold tracking-[0.2em] text-white uppercase">
                  Sold out
                </span>
              </div>
            )}
          </div>

          {onSale && (
            <div className="absolute top-3 left-3">
              <SaleBadge />
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-5 flex flex-1 flex-col">
          <p className="text-[0.625rem] font-medium tracking-[0.16em] text-muted uppercase">{category}</p>

          <h3 className="mt-2.5 mb-4 line-clamp-2 font-heading text-[1.25rem] leading-[1.15] font-semibold text-navy sm:text-[1.45rem]">
            {name}
          </h3>

          {specifications && <p className="-mt-2.5 mb-4 text-[0.8125rem] text-muted">{specifications}</p>}

          {/* Pinned to the bottom so prices align across a row */}
          <div className="mt-auto flex min-h-[4.25rem] items-center justify-between gap-3 border-t border-line pt-4">
            <ProductPrice price={price} salePrice={onSale ? salePrice : undefined} />
            <span
              aria-hidden="true"
              className="hidden size-9 shrink-0 items-center justify-center rounded-full border border-navy/15 text-navy transition-colors duration-300 group-hover:border-navy group-hover:bg-navy group-hover:text-white sm:flex"
            >
              <ArrowRightIcon className="size-4" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
