import type { StaticImageData } from "next/image";

/**
 * A static import today; a Sanity image URL once the CMS is connected. Images are
 * rendered with `fill` inside fixed-ratio containers, so dimensions are not needed.
 */
export type ImageAsset = {
  src: StaticImageData | string;
  alt: string;
};

export type Availability = "available" | "reserved" | "sold";

export type GemstoneCategory = {
  name: string;
  slug: string;
  /** One short, factual line about the variety. */
  description: string;
  image: ImageAsset;
};

/**
 * The product fields needed for catalogue cards, search and filtering.
 * Optional attributes are omitted (never guessed) when they are not known.
 */
export type ProductSummary = {
  productId: string;
  name: string;
  slug: string;
  /** Display name of the category, e.g. "Other Gemstones". */
  category: string;
  categorySlug: string;
  price: number;
  salePrice?: number;
  availability: Availability;
  image: ImageAsset;
  weightCarats?: number;
  /** A `shapeOptions` value, e.g. "oval". */
  shape?: string;
  /** A `colourOptions` value, e.g. "blue". */
  colour?: string;
  /** An `originOptions` value; only set when the origin is verified. */
  origin?: string;
  /** ISO date the listing was published, used for "Newest first". */
  publishedAt: string;
};

/** Only verified treatment information is shown; "unknown" is stated as such. */
export type Treatment = "heated" | "unheated" | "other" | "unknown";

export type CertificationStatus = "certified" | "not-certified" | "on-request" | "pending";

/** Everything shown on an individual gemstone page. */
export type ProductDetail = ProductSummary & {
  /** All photographs of this gemstone; the first is the main image. */
  images: ImageAsset[];
  description: string;
  /** e.g. "8.2 × 6.1 × 4.0 mm" */
  dimensions?: string;
  treatment?: Treatment;
  /** Details for an "other" treatment. */
  treatmentNote?: string;
  certification: {
    status: CertificationStatus;
    laboratory?: string;
    reference?: string;
  };
};
