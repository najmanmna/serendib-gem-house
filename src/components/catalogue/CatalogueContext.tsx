"use client";

import { useRouter } from "next/navigation";
import { createContext, use, useState, useTransition, type ReactNode } from "react";

import {
  PAGE_SIZE,
  defaultFilters,
  serializeFilters,
  type CatalogueFilters,
} from "@/lib/catalogue/filters";
import { routes } from "@/lib/routes";

type CatalogueContextValue = {
  filters: CatalogueFilters;
  /** Applies a filter change. Results restart at the first page unless `keepShow` is set. */
  update: (changes: Partial<CatalogueFilters>, options?: { keepShow?: boolean; resetInputs?: boolean }) => void;
  clearAll: () => void;
  isPending: boolean;
  /** Changes whenever typed inputs (search, ranges) must be reset to the URL values. */
  resetKey: number;
};

const CatalogueContext = createContext<CatalogueContextValue | null>(null);

export function useCatalogue() {
  const value = use(CatalogueContext);
  if (!value) throw new Error("useCatalogue must be used inside <CatalogueProvider>");
  return value;
}

/**
 * Keeps the catalogue state in the URL. Every change replaces the query string
 * (no extra history entries, no scroll jump); the server then re-renders the results.
 */
export function CatalogueProvider({ filters, children }: { filters: CatalogueFilters; children: ReactNode }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [resetKey, setResetKey] = useState(0);

  const navigate = (next: CatalogueFilters) => {
    const query = serializeFilters(next);
    startTransition(() => {
      router.replace(query ? `${routes.gemstones}?${query}` : routes.gemstones, { scroll: false });
    });
  };

  const update: CatalogueContextValue["update"] = (changes, options = {}) => {
    if (options.resetInputs) setResetKey((key) => key + 1);
    navigate({ ...filters, ...changes, show: options.keepShow ? (changes.show ?? filters.show) : PAGE_SIZE });
  };

  const clearAll = () => {
    setResetKey((key) => key + 1);
    navigate({ ...defaultFilters, sort: filters.sort });
  };

  return (
    <CatalogueContext value={{ filters, update, clearAll, isPending, resetKey }}>{children}</CatalogueContext>
  );
}
