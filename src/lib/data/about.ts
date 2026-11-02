/**
 * About Us page images. Temporary placeholder photographs (see
 * src/assets/placeholder/ATTRIBUTION.md): replace with the business's own photography.
 */
import categoryOther from "@/assets/placeholder/category-other.jpg";
import storyInHand from "@/assets/placeholder/story-in-hand.jpg";
import type { ImageAsset } from "@/lib/types";

export const aboutImages: Record<"intro" | "colombo", ImageAsset> = {
  intro: {
    src: storyInHand,
    alt: "A blue oval sapphire held between the fingers",
  },
  colombo: {
    src: categoryOther,
    alt: "Pairs of small round faceted gemstones in green, blue, red, purple and yellow",
  },
};
