/**
 * Catalogue filters live in the URL, so filtered views can be shared, bookmarked
 * and reached from links such as `/gemstones?category=spinel`.
 */
import { colourLabel, originLabel, shapeLabel, sortOptions, type SortValue } from "@/lib/catalogue/options";
import { formatLKR } from "@/lib/format";

export const PAGE_SIZE = 12;

export type CatalogueFilters = {
  q: string;
  category: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  colours: string[];
  minCarat: number | null;
  maxCarat: number | null;
  shapes: string[];
  origins: string[];
  sort: SortValue;
  /** How many results to show (grows by PAGE_SIZE with "Load more"). */
  show: number;
};

export const defaultFilters: CatalogueFilters = {
  q: "",
  category: null,
  minPrice: null,
  maxPrice: null,
  colours: [],
  minCarat: null,
  maxCarat: null,
  shapes: [],
  origins: [],
  sort: "newest",
  show: PAGE_SIZE,
};

type SearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

const list = (value: string | string[] | undefined) =>
  first(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

function number(value: string | string[] | undefined) {
  const parsed = Number.parseFloat(first(value));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : null;
}

export function parseFilters(params: SearchParams): CatalogueFilters {
  const sort = first(params.sort);
  const show = number(params.show);

  return {
    q: first(params.q).slice(0, 100),
    category: first(params.category) || null,
    minPrice: number(params.minPrice),
    maxPrice: number(params.maxPrice),
    colours: list(params.colour),
    minCarat: number(params.minCt),
    maxCarat: number(params.maxCt),
    shapes: list(params.shape),
    origins: list(params.origin),
    sort: sortOptions.some((option) => option.value === sort) ? (sort as SortValue) : "newest",
    show: show ? Math.max(PAGE_SIZE, Math.round(show)) : PAGE_SIZE,
  };
}

/** Builds the query string, leaving out anything at its default value. */
export function serializeFilters(filters: CatalogueFilters): string {
  const params = new URLSearchParams();
  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.minPrice !== null) params.set("minPrice", String(filters.minPrice));
  if (filters.maxPrice !== null) params.set("maxPrice", String(filters.maxPrice));
  if (filters.colours.length) params.set("colour", filters.colours.join(","));
  if (filters.minCarat !== null) params.set("minCt", String(filters.minCarat));
  if (filters.maxCarat !== null) params.set("maxCt", String(filters.maxCarat));
  if (filters.shapes.length) params.set("shape", filters.shapes.join(","));
  if (filters.origins.length) params.set("origin", filters.origins.join(","));
  if (filters.sort !== "newest") params.set("sort", filters.sort);
  if (filters.show !== PAGE_SIZE) params.set("show", String(filters.show));
  return params.toString();
}

export type FilterChip = {
  key: string;
  label: string;
  /** The filters with this one removed. */
  without: Partial<CatalogueFilters>;
};

function rangeLabel(min: number | null, max: number | null, format: (value: number) => string) {
  if (min !== null && max !== null) return `${format(min)} – ${format(max)}`;
  if (min !== null) return `From ${format(min)}`;
  return `Up to ${format(max as number)}`;
}

/** The removable chips shown above the results for every active filter. */
export function activeFilterChips(filters: CatalogueFilters, categoryName: (slug: string) => string): FilterChip[] {
  const chips: FilterChip[] = [];

  if (filters.q) chips.push({ key: "q", label: `“${filters.q}”`, without: { q: "" } });
  if (filters.category) {
    chips.push({ key: "category", label: categoryName(filters.category), without: { category: null } });
  }
  if (filters.minPrice !== null || filters.maxPrice !== null) {
    chips.push({
      key: "price",
      label: rangeLabel(filters.minPrice, filters.maxPrice, formatLKR),
      without: { minPrice: null, maxPrice: null },
    });
  }
  for (const colour of filters.colours) {
    chips.push({
      key: `colour-${colour}`,
      label: colourLabel(colour),
      without: { colours: filters.colours.filter((item) => item !== colour) },
    });
  }
  if (filters.minCarat !== null || filters.maxCarat !== null) {
    chips.push({
      key: "carat",
      label: rangeLabel(filters.minCarat, filters.maxCarat, (value) => `${value} ct`),
      without: { minCarat: null, maxCarat: null },
    });
  }
  for (const shape of filters.shapes) {
    chips.push({
      key: `shape-${shape}`,
      label: shapeLabel(shape),
      without: { shapes: filters.shapes.filter((item) => item !== shape) },
    });
  }
  for (const origin of filters.origins) {
    chips.push({
      key: `origin-${origin}`,
      label: originLabel(origin),
      without: { origins: filters.origins.filter((item) => item !== origin) },
    });
  }

  return chips;
}
