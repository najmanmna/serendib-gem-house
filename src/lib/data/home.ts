/**
 * Homepage content.
 *
 * Temporary, in-code content until the Sanity integration is implemented:
 * - `categories`, section images → Sanity `homepage` and `category` documents
 * - `featuredProducts`         → products referenced by the `homepage` document
 *
 * Every image imported below is a temporary placeholder photograph — see
 * src/assets/placeholder/ATTRIBUTION.md. None of them show business inventory.
 */
import categoryGarnet from "@/assets/placeholder/category-garnet.jpg";
import categoryOther from "@/assets/placeholder/category-other.jpg";
import categorySapphire from "@/assets/placeholder/category-sapphire.jpg";
import categorySpinel from "@/assets/placeholder/category-spinel.jpg";
import ctaSapphire from "@/assets/placeholder/cta-sapphire.jpg";
import featureSpinel from "@/assets/placeholder/feature-spinel.jpg";
import storyInHand from "@/assets/placeholder/story-in-hand.jpg";
import { featuredProductIds, products } from "@/lib/data/products";
import type { GemstoneCategory, ImageAsset, ProductSummary } from "@/lib/types";

export const storyImage: ImageAsset = {
  src: featureSpinel,
  alt: "A small red spinel crystal resting on grey fabric, casting a red glow",
};

export const storyDetailImage: ImageAsset = {
  src: storyInHand,
  alt: "A blue oval sapphire held between the fingers",
};

export const contactImage: ImageAsset = {
  src: ctaSapphire,
  alt: "An oval-cut blue sapphire and its reflection on a grey surface",
};

const allCategories: GemstoneCategory[] = [
  {
    name: "Spinel",
    slug: "spinel",
    description: "Vivid reds, pinks and blues, admired for their brilliance.",
    image: { src: categorySpinel, alt: "A red spinel crystal on a dark grey surface" },
  },
  {
    name: "Garnet",
    slug: "garnet",
    description: "Deep wine reds through to warm oranges and rare greens.",
    image: { src: categoryGarnet, alt: "An oval faceted deep red garnet" },
  },
  {
    name: "Sapphire",
    slug: "sapphire",
    description: "Classic blues and fancy colours, second only to diamond in hardness.",
    image: { src: categorySapphire, alt: "A pear-shaped cornflower blue sapphire" },
  },
  {
    name: "Other Gemstones",
    slug: "other-gemstones",
    description: "A changing selection of other fine varieties.",
    image: {
      src: categoryOther,
      alt: "Pairs of small round faceted gemstones in green, blue, red, purple and yellow",
    },
  },
];

/** Only categories that currently have a listing are shown; an empty one reappears once stock is added. */
export const categories: GemstoneCategory[] = allCategories.filter((category) =>
  products.some((product) => product.categorySlug === category.slug),
);

/** Featured gemstones for the homepage, drawn from the (sample) catalogue. */
export const featuredProducts: { items: ProductSummary[] } = {
  items: featuredProductIds
    .map((id) => products.find((product) => product.productId === id))
    .filter((product): product is ProductSummary => product !== undefined),
};

/** Brand assurances: kept to short phrases. */
export const trustPoints = [
  { title: "Carefully selected", icon: "gem" },
  { title: "Clear prices in LKR", icon: "tag" },
  { title: "Personal assistance", icon: "message" },
] as const;

/** The three buying steps. Viewing in person is optional, so it is not a step. */
export const buyingSteps = [
  { title: "Browse", description: "Find your gemstone", icon: "gem" },
  { title: "Enquire", description: "Message us on WhatsApp", icon: "message" },
  { title: "Purchase", description: "Pay and receive it", icon: "check" },
] as const;
