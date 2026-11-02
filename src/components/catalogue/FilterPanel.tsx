"use client";

import { useState, type ReactNode } from "react";

import { useCatalogue } from "@/components/catalogue/CatalogueContext";
import { ShapeIcon } from "@/components/catalogue/ShapeIcon";
import { ChevronDownIcon } from "@/components/ui/icons";
import { colourOptions, originOptions, shapeOptions } from "@/lib/catalogue/options";

type CategoryOption = { name: string; slug: string };

function FilterGroup({ title, open, children }: { title: string; open: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group/filter border-b border-line py-5">
      <summary className="flex cursor-pointer list-none items-center justify-between text-[0.9375rem] font-medium text-navy [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon className="size-4 text-navy/60 transition-transform duration-200 group-open/filter:rotate-180" />
      </summary>
      <fieldset className="mt-4">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

function toggle(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

/** Minimum and maximum inputs. Applied on Enter or when focus leaves the pair; blank means no limit. */
function RangeFields({
  id,
  min,
  max,
  unit,
  step,
  onApply,
}: {
  id: string;
  min: number | null;
  max: number | null;
  unit: string;
  step: string;
  onApply: (min: number | null, max: number | null) => void;
}) {
  const [minText, setMinText] = useState(min?.toString() ?? "");
  const [maxText, setMaxText] = useState(max?.toString() ?? "");
  const [error, setError] = useState("");

  const parse = (text: string) => {
    const value = Number.parseFloat(text.replace(/,/g, ""));
    return text.trim() === "" || !Number.isFinite(value) || value < 0 ? null : value;
  };

  const apply = () => {
    const nextMin = parse(minText);
    const nextMax = parse(maxText);
    if (nextMin !== null && nextMax !== null && nextMin > nextMax) {
      setError("The minimum can't be more than the maximum.");
      return;
    }
    setError("");
    if (nextMin !== min || nextMax !== max) onApply(nextMin, nextMax);
  };

  const input =
    "h-10 w-full rounded-brand border border-line bg-white px-3 text-sm text-navy placeholder:text-muted focus:border-navy focus:outline-none";

  return (
    <div
      onBlur={(event) => {
        // Moving between Min and Max does not apply; leaving the pair does.
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) apply();
      }}
    >
      <div className="grid grid-cols-2 gap-3">
        {(["min", "max"] as const).map((bound) => (
          <label key={bound} className="block">
            <span className="mb-1.5 block text-xs text-muted">
              {bound === "min" ? "Min" : "Max"} ({unit})
            </span>
            <input
              id={`${id}-${bound}`}
              inputMode="decimal"
              step={step}
              placeholder={bound === "min" ? "No min" : "No max"}
              value={bound === "min" ? minText : maxText}
              onChange={(event) => (bound === "min" ? setMinText : setMaxText)(event.target.value)}
              onKeyDown={(event) => event.key === "Enter" && apply()}
              aria-invalid={error ? true : undefined}
              aria-describedby={error ? `${id}-error` : undefined}
              className={input}
            />
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-2 text-xs text-[#b3122e]">
          {error}
        </p>
      )}
    </div>
  );
}

/** `idPrefix` keeps ids unique: the panel appears in both the sidebar and the mobile drawer. */
export function FilterPanel({ categories, idPrefix }: { categories: CategoryOption[]; idPrefix: string }) {
  const { filters, update, resetKey } = useCatalogue();

  const checkbox = "size-4 shrink-0 cursor-pointer accent-navy";

  return (
    <div>
      <FilterGroup title="Category" open>
        <div className="space-y-1">
          {[{ name: "All Gemstones", slug: "" }, ...categories].map((category) => {
            const selected = (filters.category ?? "") === category.slug;
            return (
              <label
                key={category.slug || "all"}
                className={`flex cursor-pointer items-center justify-between rounded-brand px-3 py-2 text-sm transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-1 has-[:focus-visible]:outline-navy ${
                  selected ? "bg-pale-blue font-medium text-navy" : "text-navy/80 hover:bg-pale-blue/60"
                }`}
              >
                <input
                  type="radio"
                  name={`${idPrefix}-category`}
                  value={category.slug}
                  checked={selected}
                  onChange={() => update({ category: category.slug || null })}
                  className="sr-only"
                />
                {category.name}
                {selected && <span aria-hidden="true" className="size-1.5 rounded-full bg-aqua" />}
              </label>
            );
          })}
        </div>
      </FilterGroup>

      <FilterGroup title="Price" open={filters.minPrice !== null || filters.maxPrice !== null}>
        <RangeFields
          key={`price-${resetKey}`}
          id={`${idPrefix}-price`}
          min={filters.minPrice}
          max={filters.maxPrice}
          unit="LKR"
          step="1000"
          onApply={(minPrice, maxPrice) => update({ minPrice, maxPrice })}
        />
      </FilterGroup>

      <FilterGroup title="Colour" open={filters.colours.length > 0}>
        <div className="grid grid-cols-3 gap-x-2 gap-y-3">
          {colourOptions.map((colour) => (
            <label key={colour.value} className="group/swatch flex cursor-pointer flex-col items-center gap-1.5 text-xs text-navy/80">
              <input
                type="checkbox"
                checked={filters.colours.includes(colour.value)}
                onChange={() => update({ colours: toggle(filters.colours, colour.value) })}
                className="peer sr-only"
              />
              <span
                aria-hidden="true"
                className="size-8 rounded-full ring-1 ring-navy/15 ring-offset-2 transition-shadow peer-checked:ring-2 peer-checked:ring-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-navy"
                style={{ background: colour.swatch }}
              />
              <span className="peer-checked:font-medium peer-checked:text-navy">{colour.label}</span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Carat weight" open={filters.minCarat !== null || filters.maxCarat !== null}>
        <RangeFields
          key={`carat-${resetKey}`}
          id={`${idPrefix}-carat`}
          min={filters.minCarat}
          max={filters.maxCarat}
          unit="ct"
          step="0.01"
          onApply={(minCarat, maxCarat) => update({ minCarat, maxCarat })}
        />
      </FilterGroup>

      <FilterGroup title="Shape" open={filters.shapes.length > 0}>
        <div className="grid grid-cols-3 gap-2">
          {shapeOptions.map((shape) => (
            <label key={shape.value} className="cursor-pointer">
              <input
                type="checkbox"
                checked={filters.shapes.includes(shape.value)}
                onChange={() => update({ shapes: toggle(filters.shapes, shape.value) })}
                className="peer sr-only"
              />
              <span className="flex flex-col items-center gap-1.5 rounded-brand border border-line px-1 py-2.5 text-xs text-navy/80 transition-colors peer-checked:border-navy peer-checked:bg-pale-blue peer-checked:text-navy peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-navy hover:border-navy/40">
                <ShapeIcon shape={shape.value} className="size-6" />
                {shape.label}
              </span>
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Origin" open={filters.origins.length > 0}>
        <div className="space-y-3">
          {originOptions.map((origin) => (
            <label key={origin.value} className="flex cursor-pointer items-center gap-3 text-sm text-navy/80">
              <input
                type="checkbox"
                checked={filters.origins.includes(origin.value)}
                onChange={() => update({ origins: toggle(filters.origins, origin.value) })}
                className={checkbox}
              />
              {origin.label}
            </label>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
