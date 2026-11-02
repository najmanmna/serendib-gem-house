"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { useCatalogue } from "@/components/catalogue/CatalogueContext";
import { FilterPanel } from "@/components/catalogue/FilterPanel";
import { CloseIcon, SearchIcon, SlidersIcon } from "@/components/ui/icons";
import { activeFilterChips } from "@/lib/catalogue/filters";
import { sortOptions, type SortValue } from "@/lib/catalogue/options";

type CategoryOption = { name: string; slug: string };

function SearchField() {
  const { filters, update } = useCatalogue();
  const [value, setValue] = useState(filters.q);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (next: string) => {
    setValue(next);
    clearTimeout(timer.current);
    // Searching updates the results shortly after typing pauses.
    timer.current = setTimeout(() => update({ q: next.trim() }), 350);
  };

  return (
    <div className="relative w-full sm:max-w-xs">
      <label htmlFor="catalogue-search" className="sr-only">
        Search by name or Product ID
      </label>
      <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
      <input
        id="catalogue-search"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search name or Product ID"
        className="h-11 w-full rounded-brand border border-line bg-white pr-3 pl-9 text-sm text-navy placeholder:text-muted focus:border-navy focus:outline-none"
      />
    </div>
  );
}

function SortSelect() {
  const { filters, update } = useCatalogue();

  return (
    <label className="flex shrink-0 items-center gap-2 text-sm text-muted">
      <span className="hidden sm:inline">Sort by</span>
      <select
        value={filters.sort}
        onChange={(event) => update({ sort: event.target.value as SortValue })}
        className="h-11 cursor-pointer rounded-brand border border-line bg-white px-3 text-sm text-navy focus:border-navy focus:outline-none"
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ActiveFilters({ categories }: { categories: CategoryOption[] }) {
  const { filters, update, clearAll } = useCatalogue();
  const categoryName = (slug: string) => categories.find((category) => category.slug === slug)?.name ?? slug;
  const chips = activeFilterChips(filters, categoryName);

  if (chips.length === 0) return null;

  return (
    <div className="mt-5 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={() => update(chip.without, { resetInputs: true })}
          className="inline-flex items-center gap-1.5 rounded-full bg-pale-blue py-1.5 pr-2.5 pl-3.5 text-sm text-navy transition-colors hover:bg-navy hover:text-white"
        >
          {chip.label}
          <CloseIcon className="size-3.5" />
          <span className="sr-only">(remove filter)</span>
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-1 border-b border-navy/30 text-sm text-navy transition-colors hover:border-navy"
      >
        Clear all
      </button>
    </div>
  );
}

export function CatalogueLayout({
  categories,
  total,
  children,
}: {
  categories: CategoryOption[];
  total: number;
  children: ReactNode;
}) {
  const { isPending, resetKey, filters, clearAll } = useCatalogue();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const drawerRef = useRef<HTMLDialogElement>(null);
  const activeCount = activeFilterChips(filters, (slug) => slug).filter((chip) => chip.key !== "q").length;

  useEffect(() => {
    // Close the mobile drawer if the screen grows to desktop size.
    const desktop = window.matchMedia("(min-width: 64rem)");
    const onChange = (event: MediaQueryListEvent) => event.matches && drawerRef.current?.close();
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const filterToggle = (
    <>
      <button
        type="button"
        onClick={() => drawerRef.current?.showModal()}
        aria-haspopup="dialog"
        className="inline-flex h-11 shrink-0 items-center gap-2 rounded-brand border border-line px-4 text-sm font-medium text-navy lg:hidden"
      >
        <SlidersIcon className="size-4" />
        Filters
        {activeCount > 0 && (
          <span className="flex size-5 items-center justify-center rounded-full bg-navy text-[0.6875rem] text-white">
            {activeCount}
          </span>
        )}
      </button>
      <button
        type="button"
        onClick={() => setSidebarOpen((open) => !open)}
        aria-expanded={sidebarOpen}
        aria-controls="catalogue-filters"
        className="hidden h-11 shrink-0 items-center gap-2 rounded-brand border border-line px-4 text-sm font-medium text-navy transition-colors hover:border-navy/40 lg:inline-flex"
      >
        <SlidersIcon className="size-4" />
        {sidebarOpen ? "Hide filters" : "Show filters"}
      </button>
    </>
  );

  return (
    <div data-sidebar={sidebarOpen ? "open" : "closed"} className="group/catalogue">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3 border-y border-line py-4 sm:flex-nowrap">
        {filterToggle}
        <div className="order-last w-full sm:order-none sm:w-auto sm:flex-1">
          <SearchField key={resetKey} />
        </div>
        <p aria-live="polite" className="ml-auto hidden text-sm whitespace-nowrap text-muted md:block">
          {total} {total === 1 ? "gemstone" : "gemstones"}
        </p>
        <SortSelect />
      </div>

      <ActiveFilters categories={categories} />

      <div className="mt-8 flex gap-10 lg:mt-10">
        {sidebarOpen && (
          <aside id="catalogue-filters" aria-label="Filters" className="hidden w-[15.625rem] shrink-0 lg:block">
            <div className="sticky top-28 -mt-5">
              <FilterPanel categories={categories} idPrefix="sidebar" />
            </div>
          </aside>
        )}

        <div
          aria-busy={isPending}
          className={`min-w-0 flex-1 transition-opacity duration-200 ${isPending ? "opacity-50" : "opacity-100"}`}
        >
          {children}
        </div>
      </div>

      {/* Mobile filter drawer */}
      <dialog
        ref={drawerRef}
        aria-label="Filters"
        className="mobile-nav fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-[min(24rem,92vw)] max-w-none bg-white p-0 text-navy"
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <p className="font-heading text-2xl font-semibold">Filters</p>
            <button
              type="button"
              onClick={() => drawerRef.current?.close()}
              autoFocus
              className="-mr-2 inline-flex size-11 items-center justify-center rounded-brand focus:outline-none focus-visible:outline-2 focus-visible:outline-navy"
            >
              <CloseIcon className="size-5" />
              <span className="sr-only">Close filters</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-5">
            <FilterPanel categories={categories} idPrefix="drawer" />
          </div>
          <div className="flex shrink-0 gap-3 border-t border-line p-5">
            <button
              type="button"
              onClick={clearAll}
              className="h-12 flex-1 rounded-brand border border-navy text-sm font-medium text-navy"
            >
              Clear all
            </button>
            <button
              type="button"
              onClick={() => drawerRef.current?.close()}
              className="h-12 flex-[2] rounded-brand bg-navy text-sm font-medium text-white"
            >
              Show {total} {total === 1 ? "result" : "results"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
