const lkrNumber = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

/** Formats a whole-rupee amount, e.g. `125000` → `LKR 125,000`. */
export function formatLKR(amount: number): string {
  return `LKR ${lkrNumber.format(amount)}`;
}

/** Joins the available specification values with middle dots, e.g. `2.15 ct · Oval · Blue`. */
export function formatSpecifications(values: Array<string | null | undefined>): string {
  return values.filter(Boolean).join(" · ");
}
