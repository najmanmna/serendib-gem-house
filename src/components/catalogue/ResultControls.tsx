"use client";

import { useCatalogue } from "@/components/catalogue/CatalogueContext";
import { PAGE_SIZE } from "@/lib/catalogue/filters";

/** Shows the next page of results in place, keeping filters and sorting. */
export function LoadMore({ shown, total }: { shown: number; total: number }) {
  const { filters, update, isPending } = useCatalogue();

  return (
    <div className="mt-14 flex flex-col items-center gap-4">
      <p className="text-sm text-muted">
        Showing {shown} of {total} gemstones
      </p>
      {shown < total && (
        <button
          type="button"
          disabled={isPending}
          onClick={() => update({ show: filters.show + PAGE_SIZE }, { keepShow: true })}
          className="inline-flex h-12 items-center justify-center rounded-brand border border-navy px-8 text-[0.9375rem] font-medium text-navy transition-colors hover:bg-navy hover:text-white disabled:opacity-60"
        >
          {isPending ? "Loading…" : "Load more"}
        </button>
      )}
    </div>
  );
}

export function ClearFiltersButton() {
  const { clearAll } = useCatalogue();

  return (
    <button
      type="button"
      onClick={clearAll}
      className="inline-flex h-12 items-center justify-center rounded-brand bg-navy px-7 text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-hover"
    >
      Clear all filters
    </button>
  );
}
