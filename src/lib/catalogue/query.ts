/**
 * Catalogue query over the static sample data. This is the single function to
 * replace with a Sanity (GROQ) query: it takes the URL filters and returns one
 * page of results plus the total number of matches.
 */
import type { CatalogueFilters } from "@/lib/catalogue/filters";
import { products } from "@/lib/data/products";
import type { ProductSummary } from "@/lib/types";

export type CatalogueResult = {
  items: ProductSummary[];
  /** Number of products matching the filters (before "Load more" slicing). */
  total: number;
};

/** The price a customer pays today: a valid sale price, otherwise the regular price. */
export function effectivePrice(product: ProductSummary) {
  return product.salePrice !== undefined && product.salePrice < product.price ? product.salePrice : product.price;
}

/** Case-insensitive; ignores spaces and hyphens so "sghdemo01" finds "SGH-DEMO-01". */
const normalise = (value: string) => value.toLowerCase().replace(/[^a-z0-9]/g, "");

function inRange(value: number | undefined, min: number | null, max: number | null) {
  if (min === null && max === null) return true;
  // Products without a recorded value never match an active range filter.
  if (value === undefined) return false;
  return (min === null || value >= min) && (max === null || value <= max);
}

function matchesAny(value: string | undefined, selected: string[]) {
  if (selected.length === 0) return true;
  return value !== undefined && selected.includes(value);
}

export function getCatalogue(filters: CatalogueFilters): CatalogueResult {
  const query = normalise(filters.q);

  const matching = products.filter(
    (product) =>
      (!query || normalise(product.name).includes(query) || normalise(product.productId).includes(query)) &&
      (!filters.category || product.categorySlug === filters.category) &&
      inRange(effectivePrice(product), filters.minPrice, filters.maxPrice) &&
      matchesAny(product.colour, filters.colours) &&
      inRange(product.weightCarats, filters.minCarat, filters.maxCarat) &&
      matchesAny(product.shape, filters.shapes) &&
      matchesAny(product.origin, filters.origins),
  );

  const sorted = [...matching].sort((a, b) => {
    if (filters.sort === "price-asc") return effectivePrice(a) - effectivePrice(b);
    if (filters.sort === "price-desc") return effectivePrice(b) - effectivePrice(a);
    return b.publishedAt.localeCompare(a.publishedAt);
  });

  return { items: sorted.slice(0, filters.show), total: sorted.length };
}
