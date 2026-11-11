/**
 * Static product data for building the catalogue before the Sanity integration.
 *
 * `SGH-DEMO-` products are SAMPLES, not inventory, with temporary placeholder
 * photographs (see src/assets/placeholder/ATTRIBUTION.md). Products with plain IDs
 * (`SGH-0001`, ...) are real stones with their own photographs in src/assets/products.
 * Replace all of this with Sanity queries before launch.
 */
import blueGemstone1 from "@/assets/products/blue-pear-1.jpg";
import blueGemstone2 from "@/assets/products/blue-pear-2.jpg";
import blueGemstone3 from "@/assets/products/blue-pear-3.jpg";
import greenZircon1 from "@/assets/products/green-zircon-1.jpg";
import greenZircon2 from "@/assets/products/green-zircon-2.jpg";
import greenZircon3 from "@/assets/products/green-zircon-3.jpg";
import greenZircon4 from "@/assets/products/green-zircon-4.jpg";
import pinkGemstone1 from "@/assets/products/pink-cushion-1.jpg";
import pinkGemstone2 from "@/assets/products/pink-cushion-2.jpg";
import pinkGemstone3 from "@/assets/products/pink-cushion-3.jpg";
import categoryGarnet from "@/assets/placeholder/category-garnet.jpg";
import categorySapphire from "@/assets/placeholder/category-sapphire.jpg";
import categorySpinel from "@/assets/placeholder/category-spinel.jpg";
import ctaSapphire from "@/assets/placeholder/cta-sapphire.jpg";
import featureSpinel from "@/assets/placeholder/feature-spinel.jpg";
import productHotPinkSpinel from "@/assets/placeholder/product-hot-pink-spinel.jpg";
import productOvalGarnet from "@/assets/placeholder/product-oval-garnet.jpg";
import productPearSapphire from "@/assets/placeholder/product-pear-sapphire.jpg";
import productRedSpinel from "@/assets/placeholder/product-red-spinel.jpg";
import productRoyalBlueSapphire from "@/assets/placeholder/product-royal-blue-sapphire.jpg";
import productTealSapphire from "@/assets/placeholder/product-teal-sapphire.jpg";
import sampleAquamarine from "@/assets/placeholder/sample-aquamarine.jpg";
import sampleGarnet from "@/assets/placeholder/sample-garnet.jpg";
import sampleSapphire from "@/assets/placeholder/sample-sapphire.jpg";
import sampleSpinel from "@/assets/placeholder/sample-spinel.jpg";
import storyInHand from "@/assets/placeholder/story-in-hand.jpg";
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
  // (SGH-0003 is confirmed as zircon by the owner; its price is still a placeholder.)
  {
    productId: "SGH-0001",
    name: "Deep Blue Pear Cut",
    slug: "deep-blue-pear-cut-sgh-0001",
    ...category.other,
    price: 95000, // PLACEHOLDER
    availability: "available",
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
    shape: "oval",
    colour: "green",
    image: { src: greenZircon1, alt: "A green oval faceted zircon on a white background" },
    publishedAt: "2026-11-09",
  },
  {
    productId: "SGH-DEMO-01",
    name: "Pink Spinel Crystal",
    slug: "sample-pink-spinel-crystal-sgh-demo-01",
    ...category.spinel,
    price: 185000,
    availability: "available",
    weightCarats: 3.42,
    shape: "other",
    colour: "pink",
    image: { src: sampleSpinel, alt: "A pink spinel crystal photographed on white" },
    publishedAt: "2026-10-30",
  },
  {
    productId: "SGH-DEMO-02",
    name: "Round Red Garnets, Set of Four",
    slug: "sample-round-red-garnets-sgh-demo-02",
    ...category.garnet,
    price: 48000,
    availability: "available",
    weightCarats: 4.1,
    shape: "round",
    colour: "red",
    origin: "sri-lanka",
    image: { src: sampleGarnet, alt: "Four round faceted dark red garnets" },
    publishedAt: "2026-10-29",
  },
  {
    productId: "SGH-DEMO-03",
    name: "Purple Sapphire",
    slug: "sample-purple-sapphire-sgh-demo-03",
    ...category.sapphire,
    price: 165000,
    availability: "reserved",
    weightCarats: 1.12,
    shape: "round",
    colour: "purple",
    origin: "sri-lanka",
    image: { src: sampleSapphire, alt: "A round brilliant-cut purple sapphire" },
    publishedAt: "2026-10-27",
  },
  {
    productId: "SGH-DEMO-04",
    name: "Aquamarine, Step Cut",
    slug: "sample-aquamarine-step-cut-sgh-demo-04",
    ...category.other,
    price: 62000,
    salePrice: 54000,
    availability: "available",
    weightCarats: 2.35,
    shape: "emerald",
    colour: "blue",
    origin: "madagascar",
    image: { src: sampleAquamarine, alt: "A pale blue step-cut aquamarine casting a soft shadow" },
    publishedAt: "2026-10-26",
  },
  {
    productId: "SGH-DEMO-05",
    name: "Red Spinel Crystal",
    slug: "sample-red-spinel-crystal-sgh-demo-05",
    ...category.spinel,
    price: 95000,
    availability: "available",
    weightCarats: 2.8,
    shape: "other",
    colour: "red",
    image: { src: productRedSpinel, alt: "A red spinel crystal on a dark grey surface" },
    publishedAt: "2026-10-24",
  },
  {
    productId: "SGH-DEMO-06",
    name: "Oval Almandine Garnet",
    slug: "sample-oval-almandine-garnet-sgh-demo-06",
    ...category.garnet,
    price: 72000,
    availability: "available",
    weightCarats: 3.05,
    shape: "oval",
    colour: "red",
    origin: "sri-lanka",
    image: { src: productOvalGarnet, alt: "An oval faceted deep red garnet" },
    publishedAt: "2026-10-22",
  },
  {
    productId: "SGH-DEMO-07",
    name: "Cornflower Blue Sapphire",
    slug: "sample-cornflower-blue-sapphire-sgh-demo-07",
    ...category.sapphire,
    price: 285000,
    availability: "available",
    weightCarats: 1.48,
    shape: "pear",
    colour: "blue",
    origin: "sri-lanka",
    image: { src: productPearSapphire, alt: "A pear-shaped cornflower blue sapphire" },
    publishedAt: "2026-10-20",
  },
  {
    productId: "SGH-DEMO-08",
    name: "Hot Pink Spinel",
    slug: "sample-hot-pink-spinel-sgh-demo-08",
    ...category.spinel,
    price: 120000,
    availability: "sold",
    weightCarats: 1.2,
    shape: "other",
    colour: "pink",
    image: { src: productHotPinkSpinel, alt: "A small hot pink spinel crystal on grey fabric" },
    publishedAt: "2026-10-18",
  },
  {
    productId: "SGH-DEMO-09",
    name: "Royal Blue Sapphire",
    slug: "sample-royal-blue-sapphire-sgh-demo-09",
    ...category.sapphire,
    price: 640000,
    availability: "available",
    weightCarats: 2.05,
    shape: "oval",
    colour: "blue",
    origin: "sri-lanka",
    image: { src: productRoyalBlueSapphire, alt: "An oval royal blue sapphire and its reflection" },
    publishedAt: "2026-10-16",
  },
  {
    productId: "SGH-DEMO-10",
    name: "Teal Blue Sapphire",
    slug: "sample-teal-blue-sapphire-sgh-demo-10",
    ...category.sapphire,
    price: 210000,
    salePrice: 189000,
    availability: "available",
    weightCarats: 1.63,
    shape: "oval",
    colour: "blue",
    image: { src: productTealSapphire, alt: "A teal blue oval sapphire held between the fingers" },
    publishedAt: "2026-10-14",
  },
  {
    productId: "SGH-DEMO-11",
    name: "Natural Red Spinel",
    slug: "sample-natural-red-spinel-sgh-demo-11",
    ...category.spinel,
    price: 78000,
    availability: "available",
    weightCarats: 1.95,
    shape: "other",
    colour: "red",
    image: { src: productRedSpinel, alt: "A red spinel crystal on a dark grey surface" },
    publishedAt: "2026-10-12",
  },
  {
    productId: "SGH-DEMO-12",
    name: "Oval Red Garnet",
    slug: "sample-oval-red-garnet-sgh-demo-12",
    ...category.garnet,
    price: 58000,
    availability: "reserved",
    weightCarats: 2.4,
    shape: "oval",
    colour: "red",
    image: { src: productOvalGarnet, alt: "An oval faceted deep red garnet" },
    publishedAt: "2026-10-10",
  },
  {
    productId: "SGH-DEMO-13",
    name: "Light Blue Aquamarine",
    slug: "sample-light-blue-aquamarine-sgh-demo-13",
    ...category.other,
    price: 45000,
    availability: "available",
    weightCarats: 1.8,
    shape: "emerald",
    colour: "blue",
    origin: "madagascar",
    image: { src: sampleAquamarine, alt: "A pale blue step-cut aquamarine casting a soft shadow" },
    publishedAt: "2026-10-08",
  },
  {
    productId: "SGH-DEMO-14",
    name: "Violet Sapphire",
    slug: "sample-violet-sapphire-sgh-demo-14",
    ...category.sapphire,
    price: 135000,
    availability: "available",
    weightCarats: 0.92,
    shape: "round",
    colour: "purple",
    origin: "sri-lanka",
    image: { src: sampleSapphire, alt: "A round brilliant-cut purple sapphire" },
    publishedAt: "2026-10-06",
  },
  {
    productId: "SGH-DEMO-15",
    name: "Red Garnet Set",
    slug: "sample-red-garnet-set-sgh-demo-15",
    ...category.garnet,
    price: 36000,
    availability: "sold",
    weightCarats: 3.2,
    shape: "round",
    colour: "red",
    image: { src: sampleGarnet, alt: "Four round faceted dark red garnets" },
    publishedAt: "2026-10-04",
  },
  {
    productId: "SGH-DEMO-16",
    name: "Pink Spinel Specimen",
    slug: "sample-pink-spinel-specimen-sgh-demo-16",
    ...category.spinel,
    price: 98000,
    availability: "available",
    weightCarats: 1.05,
    shape: "other",
    colour: "pink",
    image: { src: productHotPinkSpinel, alt: "A small hot pink spinel crystal on grey fabric" },
    publishedAt: "2026-10-02",
  },
];

/** Product IDs selected for the homepage, in display order (a Sanity reference list later). */
export const featuredProductIds = ["SGH-0001", "SGH-0002", "SGH-0003", "SGH-DEMO-01"];

type Details = Omit<ProductDetail, keyof ProductSummary | "images"> & { extraImages?: ImageAsset[] };

/** Detail-page information per Product ID (fields of the Sanity product document later). */
const details: Record<string, Details> = {
  "SGH-0001": {
    description: "A pear-shaped faceted gemstone in a deep blue.",
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
  "SGH-DEMO-01": {
    description:
      "A pink spinel crystal with natural crystal faces, showing a lively pink colour throughout. Offered as a rough specimen rather than a cut stone.",
    dimensions: "11.4 × 9.8 × 7.2 mm",
    treatment: "unknown",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-02": {
    description:
      "A matched set of four round faceted garnets in a deep red. Well suited to jewellery that calls for several similar stones.",
    dimensions: "Approx. 5.5 mm each",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-03": {
    description: "A round brilliant-cut sapphire in a rich purple, with good brightness when viewed face-up.",
    dimensions: "6.4 × 6.4 × 4.1 mm",
    treatment: "heated",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-04": {
    description:
      "A light blue aquamarine with a clean step cut that shows the stone's calm, even colour. Visible inclusions are present when viewed closely.",
    dimensions: "9.1 × 7.0 × 4.6 mm",
    treatment: "unknown",
    certification: { status: "not-certified" },
  },
  "SGH-DEMO-05": {
    description: "A red spinel crystal with a vivid colour and natural, uncut faces.",
    treatment: "unknown",
    certification: { status: "on-request" },
    extraImages: [{ src: categorySpinel, alt: "The same red spinel crystal, shown from further away" }],
  },
  "SGH-DEMO-06": {
    description:
      "An oval almandine garnet in a deep wine red, with bright flashes of colour across its facets.",
    dimensions: "9.0 × 7.0 × 4.5 mm",
    certification: { status: "on-request" },
    extraImages: [{ src: categoryGarnet, alt: "The same oval garnet on a pale background, in full" }],
  },
  "SGH-DEMO-07": {
    description: "A pear-shaped sapphire in a soft cornflower blue, with an even colour from tip to base.",
    dimensions: "8.1 × 5.6 × 3.9 mm",
    treatment: "heated",
    certification: { status: "pending" },
    extraImages: [{ src: categorySapphire, alt: "The same pear-shaped sapphire, shown in full" }],
  },
  "SGH-DEMO-08": {
    description: "A small hot pink spinel crystal with an intense colour and natural crystal faces.",
    treatment: "unknown",
    certification: { status: "not-certified" },
    extraImages: [{ src: featureSpinel, alt: "The same hot pink spinel on grey fabric, in full" }],
  },
  "SGH-DEMO-09": {
    description:
      "An oval sapphire in a deep royal blue, cut to show strong colour when viewed face-up.",
    dimensions: "8.0 × 6.3 × 4.2 mm",
    treatment: "heated",
    certification: { status: "on-request" },
    extraImages: [{ src: ctaSapphire, alt: "The same royal blue sapphire with its reflection, in full" }],
  },
  "SGH-DEMO-10": {
    description:
      "An oval sapphire in a blue to teal colour that shifts gently as the stone is turned in the light.",
    dimensions: "7.6 × 5.7 × 3.8 mm",
    treatment: "unknown",
    certification: { status: "on-request" },
    extraImages: [{ src: storyInHand, alt: "The same teal sapphire held between the fingers, in full" }],
  },
  "SGH-DEMO-11": {
    description: "A red spinel crystal with natural faces and a bright, saturated colour.",
    treatment: "unknown",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-12": {
    description: "An oval garnet in a deep red, faceted to bring out flashes of brighter red.",
    dimensions: "8.4 × 6.5 × 4.3 mm",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-13": {
    description: "A light blue aquamarine with a step cut and a gentle, even colour.",
    dimensions: "8.0 × 6.0 × 4.0 mm",
    treatment: "unknown",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-14": {
    description: "A round brilliant-cut sapphire in a violet tone.",
    dimensions: "6.0 × 6.0 × 3.8 mm",
    treatment: "unheated",
    certification: { status: "on-request" },
  },
  "SGH-DEMO-15": {
    description: "A set of round faceted red garnets.",
    certification: { status: "not-certified" },
  },
  "SGH-DEMO-16": {
    description: "A pink spinel specimen with natural crystal faces.",
    treatment: "unknown",
    certification: { status: "on-request" },
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
