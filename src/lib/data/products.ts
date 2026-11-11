/**
 * Static product data for building the catalogue before the Sanity integration.
 *
 * These are real stones with their own photographs in src/assets/products.
 * Replace all of this with Sanity queries before launch.
 */
import blueGemstone1 from "@/assets/products/blue-pear-1.jpg";
import blueGemstone2 from "@/assets/products/blue-pear-2.jpg";
import blueGemstone3 from "@/assets/products/blue-pear-3.jpg";
import greenZircon1 from "@/assets/products/green-zircon-1.jpg";
import greenZircon2 from "@/assets/products/green-zircon-2.jpg";
import greenZircon3 from "@/assets/products/green-zircon-3.jpg";
import greenZircon4 from "@/assets/products/green-zircon-4.jpg";
import spessartine1 from "@/assets/products/spessartine-1.jpg";
import spessartine2 from "@/assets/products/spessartine-2.jpg";
import spessartine3 from "@/assets/products/spessartine-3.jpg";
import yellowSapphire1 from "@/assets/products/yellow-sapphire-1.jpg";
import yellowSapphire2 from "@/assets/products/yellow-sapphire-2.jpg";
import yellowSapphire3 from "@/assets/products/yellow-sapphire-3.jpg";
import yellowSapphire4 from "@/assets/products/yellow-sapphire-4.jpg";
import pinkGemstone1 from "@/assets/products/pink-cushion-1.jpg";
import pinkGemstone2 from "@/assets/products/pink-cushion-2.jpg";
import pinkGemstone3 from "@/assets/products/pink-cushion-3.jpg";
import type { ImageAsset, ProductDetail, ProductSummary } from "@/lib/types";

const category = {
  spinel: { category: "Spinel", categorySlug: "spinel" },
  garnet: { category: "Garnet", categorySlug: "garnet" },
  sapphire: { category: "Sapphire", categorySlug: "sapphire" },
  other: { category: "Other Gemstones", categorySlug: "other-gemstones" },
} as const;

export const products: ProductSummary[] = [
  // Real stones (own photographs). Only what the photographs show is recorded: colour and shape.
  // PREVIEW VALUES, to confirm before publishing: variety/category, price, weight, origin, treatment.
  // (SGH-0003 zircon and SGH-0004 spessartine garnet, 2.53 ct, are confirmed by the owner; prices are still placeholders.)
  {
    productId: "SGH-0005",
    name: "Emerald-Cut Yellow Sapphire",
    slug: "emerald-cut-yellow-sapphire-sgh-0005",
    ...category.sapphire,
    variety: "Yellow Sapphire",
    price: 85000, // PLACEHOLDER
    availability: "available",
    weightCarats: 1.14,
    shape: "emerald",
    colour: "yellow",
    image: { src: yellowSapphire1, alt: "An emerald-cut yellow sapphire seen from above" },
    publishedAt: "2026-11-12",
  },
  {
    productId: "SGH-0004",
    name: "Emerald-Cut Spessartine Garnet",
    slug: "emerald-cut-spessartine-garnet-sgh-0004",
    ...category.garnet,
    variety: "Spessartine Garnet",
    price: 75000, // PLACEHOLDER
    availability: "available",
    weightCarats: 2.53,
    shape: "emerald",
    colour: "red",
    image: { src: spessartine1, alt: "An emerald-cut spessartine garnet in a deep red-brown, seen from above" },
    publishedAt: "2026-11-11",
  },
  {
    productId: "SGH-0001",
    name: "Pear-Cut Blue Sapphire",
    slug: "deep-blue-pear-cut-sgh-0001",
    ...category.sapphire,
    variety: "Blue Sapphire",
    price: 95000, // PLACEHOLDER
    availability: "available",
    weightCarats: 1.17,
    origin: "madagascar",
    shape: "pear",
    colour: "blue",
    image: { src: blueGemstone1, alt: "A deep blue pear-shaped faceted gemstone with its point upwards" },
    publishedAt: "2026-11-11",
  },
  {
    productId: "SGH-0002",
    name: "Pink Cushion Cut",
    slug: "pink-cushion-cut-sgh-0002",
    ...category.other,
    price: 120000, // PLACEHOLDER
    availability: "available",
    weightCarats: 1.13,
    shape: "cushion",
    colour: "pink",
    image: { src: pinkGemstone1, alt: "A pink cushion-shaped faceted gemstone, seen from above" },
    publishedAt: "2026-11-10",
  },
  {
    productId: "SGH-0003",
    name: "Green Oval Zircon",
    slug: "green-oval-zircon-sgh-0003",
    ...category.other,
    variety: "Zircon",
    price: 45000, // PLACEHOLDER
    availability: "available",
    weightCarats: 1.06,
    shape: "oval",
    colour: "green",
    image: { src: greenZircon1, alt: "A green oval faceted zircon on a white background" },
    publishedAt: "2026-11-09",
  },

];

/** Product IDs selected for the homepage, in display order (a Sanity reference list later). */
export const featuredProductIds = ["SGH-0005", "SGH-0004", "SGH-0001", "SGH-0002"];

type Details = Omit<ProductDetail, keyof ProductSummary | "images"> & { extraImages?: ImageAsset[] };

/** Detail-page information per Product ID (fields of the Sanity product document later). */
const details: Record<string, Details> = {
  "SGH-0005": {
    description: "An emerald-cut yellow sapphire weighing 1.14 carats, in a warm golden yellow.",
    certification: { status: "on-request" },
    extraImages: [
      { src: yellowSapphire2, alt: "The yellow sapphire turned to show its step-cut facets" },
      { src: yellowSapphire3, alt: "The yellow sapphire seen from another angle" },
      { src: yellowSapphire4, alt: "The yellow sapphire seen from the side" },
    ],
  },
  "SGH-0004": {
    description: "An emerald-cut spessartine garnet weighing 2.53 carats, in a deep red-brown.",
    certification: { status: "on-request" },
    extraImages: [
      { src: spessartine2, alt: "The spessartine garnet tilted to show its step-cut facets" },
      { src: spessartine3, alt: "The spessartine garnet seen from another angle" },
    ],
  },
  "SGH-0001": {
    description: "A pear-shaped blue sapphire from Madagascar, weighing 1.17 carats, in a deep blue.",
    treatment: "heated",
    certification: { status: "on-request" },
    extraImages: [
      { src: blueGemstone2, alt: "The deep blue pear-shaped gemstone, seen from slightly further away" },
      { src: blueGemstone3, alt: "The deep blue pear-shaped gemstone, seen from the side" },
    ],
  },
  "SGH-0003": {
    description: "An oval faceted zircon in green.",
    certification: { status: "on-request" },
    extraImages: [
      { src: greenZircon2, alt: "The green zircon seen from above, showing its facets" },
      { src: greenZircon3, alt: "The green zircon tilted to show its crown and facets" },
      { src: greenZircon4, alt: "The green zircon seen from the side" },
    ],
  },
  "SGH-0002": {
    description: "A cushion-shaped faceted gemstone in a rich pink.",
    certification: { status: "on-request" },
    extraImages: [
      { src: pinkGemstone2, alt: "The pink cushion-shaped gemstone, seen from slightly further away" },
      { src: pinkGemstone3, alt: "The pink cushion-shaped gemstone, seen from the side" },
    ],
  },

};

export function getProductBySlug(slug: string): ProductDetail | null {
  const product = products.find((item) => item.slug === slug);
  if (!product) return null;
  const { extraImages = [], ...rest } = details[product.productId] ?? {
    description: "",
    certification: { status: "on-request" as const },
  };
  return { ...product, ...rest, images: [product.image, ...extraImages] };
}

/**
 * Up to `limit` other gemstones: same category first, available before reserved,
 * sold last, then filled from other categories.
 */
export function getRelatedProducts(product: ProductSummary, limit = 4): ProductSummary[] {
  const rank = { available: 0, reserved: 1, sold: 2 } as const;
  return products
    .filter((item) => item.productId !== product.productId)
    .sort(
      (a, b) =>
        Number(b.categorySlug === product.categorySlug) - Number(a.categorySlug === product.categorySlug) ||
        rank[a.availability] - rank[b.availability] ||
        b.publishedAt.localeCompare(a.publishedAt),
    )
    .slice(0, limit);
}
