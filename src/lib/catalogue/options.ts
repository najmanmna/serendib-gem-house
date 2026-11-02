/** Filter and sort options for the gemstone catalogue (docs/03-design-system.md §8). */

export const colourOptions = [
  { value: "blue", label: "Blue", swatch: "#2453b8" },
  { value: "red", label: "Red", swatch: "#b3122e" },
  { value: "pink", label: "Pink", swatch: "#e26a9a" },
  { value: "purple", label: "Purple", swatch: "#7b3fa0" },
  { value: "green", label: "Green", swatch: "#2e8b57" },
  { value: "yellow", label: "Yellow", swatch: "#e8b923" },
  { value: "white", label: "White", swatch: "#f6f6f3" },
  { value: "black", label: "Black", swatch: "#1b1b1b" },
  {
    value: "other",
    label: "Other",
    swatch: "conic-gradient(#12b9dc, #7b3fa0, #e26a9a, #e8b923, #2e8b57, #12b9dc)",
  },
] as const;

export const shapeOptions = [
  { value: "oval", label: "Oval" },
  { value: "round", label: "Round" },
  { value: "cushion", label: "Cushion" },
  { value: "pear", label: "Pear" },
  { value: "emerald", label: "Emerald", cardLabel: "Emerald cut" },
  { value: "marquise", label: "Marquise" },
  { value: "radiant", label: "Radiant" },
  { value: "princess", label: "Princess" },
  { value: "other", label: "Other" },
] as const;

/** Only verified origins are listed as filterable values. */
export const originOptions = [
  { value: "sri-lanka", label: "Sri Lanka" },
  { value: "madagascar", label: "Madagascar" },
] as const;

export const sortOptions = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
] as const;

export type ColourValue = (typeof colourOptions)[number]["value"];
export type ShapeValue = (typeof shapeOptions)[number]["value"];
export type OriginValue = (typeof originOptions)[number]["value"];
export type SortValue = (typeof sortOptions)[number]["value"];

export function colourLabel(value: string) {
  return colourOptions.find((option) => option.value === value)?.label ?? value;
}

export function shapeLabel(value: string, context: "filter" | "card" = "filter") {
  const option = shapeOptions.find((item) => item.value === value);
  if (!option) return value;
  return context === "card" && "cardLabel" in option ? option.cardLabel : option.label;
}

export function originLabel(value: string) {
  return originOptions.find((option) => option.value === value)?.label ?? value;
}
