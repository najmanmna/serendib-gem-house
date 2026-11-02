import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import { ProductCard } from "@/components/product/ProductCard";
import { ProductGallery } from "@/components/product/ProductGallery";
import { SaleBadge } from "@/components/product/SaleBadge";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ChatIcon, ChevronDownIcon, EyeIcon } from "@/components/ui/icons";
import { sectionTitle } from "@/components/ui/SectionHeading";
import { colourLabel, originLabel, shapeLabel } from "@/lib/catalogue/options";
import { effectivePrice } from "@/lib/catalogue/query";
import { getProductBySlug, getRelatedProducts, products } from "@/lib/data/products";
import { formatLKR } from "@/lib/format";
import { routes } from "@/lib/routes";
import { siteConfig } from "@/lib/site-config";
import type { Availability, CertificationStatus, ProductDetail, Treatment } from "@/lib/types";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata(props: PageProps<"/gemstones/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Gemstone not found" };

  const description = `Explore this ${product.name} at ${siteConfig.name}. View its specifications, listed price of ${formatLKR(
    effectivePrice(product),
  )} and availability, or contact us with an enquiry.`;
  const image = typeof product.image.src === "string" ? product.image.src : product.image.src.src;

  return {
    title: product.name,
    description,
    alternates: { canonical: routes.product(product.slug) },
    openGraph: {
      title: `${product.name} | ${siteConfig.name}`,
      description,
      url: routes.product(product.slug),
      images: [{ url: image, alt: product.image.alt }],
    },
  };
}

const treatmentLabels: Record<Treatment, string> = {
  heated: "Heated",
  unheated: "Unheated",
  other: "Other (disclosed)",
  unknown: "Unknown",
};

const certificationLabels: Record<CertificationStatus, string> = {
  certified: "Certified",
  "not-certified": "Not certified",
  "on-request": "Available on request",
  pending: "Certification pending",
};

const statusStyles: Record<Availability, { label: string; dot: string }> = {
  available: { label: "Available", dot: "bg-aqua" },
  reserved: { label: "Reserved", dot: "bg-[#C8913A]" },
  sold: { label: "Sold out", dot: "bg-slate-400" },
};

function productUrl(product: ProductDetail) {
  return `${siteConfig.url}${routes.product(product.slug)}`;
}

function enquiryMessage(product: ProductDetail) {
  const closing =
    product.availability === "reserved"
      ? "Could you please confirm its latest availability?"
      : "Could you please provide more information?";
  return [
    "Hello, I am interested in this gemstone.",
    "",
    `Product: ${product.name}`,
    `Product ID: ${product.productId}`,
    `Listed price: ${formatLKR(effectivePrice(product))}`,
    `Product link: ${productUrl(product)}`,
    "",
    closing,
  ].join("\n");
}

function viewingMessage(product: ProductDetail) {
  return [
    "Hello, I would like to arrange a viewing of this gemstone in Colombo.",
    "",
    `Product: ${product.name}`,
    `Product ID: ${product.productId}`,
    `Product link: ${productUrl(product)}`,
  ].join("\n");
}

function specifications(product: ProductDetail): Array<[string, string]> {
  const rows: Array<[string, string | null | undefined]> = [
    ["Gemstone", product.category],
    ["Weight", product.weightCarats ? `${product.weightCarats.toFixed(2)} ct` : null],
    ["Colour", product.colour ? colourLabel(product.colour) : null],
    ["Shape / Cut", product.shape && product.shape !== "other" ? shapeLabel(product.shape, "card") : null],
    ["Dimensions", product.dimensions],
    ["Origin", product.origin ? originLabel(product.origin) : null],
    [
      "Treatment",
      product.treatment === "other" && product.treatmentNote
        ? product.treatmentNote
        : product.treatment && treatmentLabels[product.treatment],
    ],
    ["Certification", certificationLabels[product.certification.status]],
  ];
  // Unavailable attributes are hidden rather than shown empty.
  return rows.filter((row): row is [string, string] => Boolean(row[1]));
}

function InfoSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="group/info border-b border-line">
      <summary className="flex cursor-pointer list-none items-center justify-between py-5 text-[0.9375rem] font-medium text-navy [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDownIcon className="size-4 text-navy/60 transition-transform duration-200 group-open/info:rotate-180" />
      </summary>
      <div className="space-y-3 pb-6 text-[0.9375rem] leading-relaxed text-navy/75">{children}</div>
    </details>
  );
}

function Breadcrumb({ product }: { product: ProductDetail }) {
  const items = [
    { label: "Home", href: routes.home },
    { label: "Gemstones", href: routes.gemstones },
    { label: product.category, href: routes.category(product.categorySlug) },
  ];

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8125rem] text-muted">
        {items.map((item) => (
          <li key={item.href} className="flex items-center gap-2">
            <Link href={item.href} className="transition-colors hover:text-navy">
              {item.label}
            </Link>
            <span aria-hidden="true">/</span>
          </li>
        ))}
        <li aria-current="page" className="text-navy">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}

function productJsonLd(product: ProductDetail) {
  const availability = {
    available: "https://schema.org/InStock",
    reserved: "https://schema.org/LimitedAvailability",
    sold: "https://schema.org/SoldOut",
  }[product.availability];
  const image = typeof product.image.src === "string" ? product.image.src : product.image.src.src;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.productId,
    description: product.description,
    category: product.category,
    image: new URL(image, siteConfig.url).toString(),
    url: productUrl(product),
    brand: { "@type": "Brand", name: siteConfig.name },
    offers: {
      "@type": "Offer",
      price: effectivePrice(product),
      priceCurrency: "LKR",
      availability,
      url: productUrl(product),
      seller: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

export default async function GemstonePage(props: PageProps<"/gemstones/[slug]">) {
  const { slug } = await props.params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { availability } = product;
  const sold = availability === "sold";
  const onSale = !sold && product.salePrice !== undefined && product.salePrice < product.price;
  const status = statusStyles[availability];
  const related = getRelatedProducts(product);
  const enquiry = getWhatsAppLink(
    enquiryMessage(product),
    `${routes.contact}?type=purchase&product=${product.productId}`,
  );
  const viewing = getWhatsAppLink(
    viewingMessage(product),
    `${routes.contact}?type=viewing&product=${product.productId}`,
  );
  const similar = getWhatsAppLink(
    `Hello, I saw the ${product.name} (${product.productId}) has been sold. Do you have any similar gemstones?`,
  );
  const external = (link: { isWhatsApp: boolean }) =>
    link.isWhatsApp ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c") }}
      />

      <Container className="pt-6 pb-20 sm:pt-8 lg:pt-10 lg:pb-28">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2 lg:grid-rows-[auto_1fr] xl:gap-x-20">
          {/* Header: before the gallery on phones, beside it on desktop */}
          <div className="lg:col-start-2 lg:row-start-1">
            <Breadcrumb product={product} />
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-medium tracking-[0.16em] text-navy uppercase">
              <span aria-hidden="true" className={`size-2 rounded-full ${status.dot}`} />
              {status.label}
            </p>
            <h1 className="mt-3 font-heading text-[2.6rem] leading-[1.02] font-semibold tracking-[-0.015em] text-balance sm:text-5xl lg:text-[3.5rem]">
              {product.name}
            </h1>
            <p className="mt-3 text-sm text-muted">Product ID: {product.productId}</p>
          </div>

          <div className="lg:sticky lg:top-28 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:self-start">
            <ProductGallery images={product.images} sold={sold} />
          </div>

          <div className="lg:col-start-2 lg:row-start-2">
            {/* Price */}
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[1.75rem] font-semibold text-navy">
                {onSale && <span className="sr-only">Sale price: </span>}
                {formatLKR(effectivePrice(product))}
              </p>
              {onSale && (
                <>
                  <p className="text-lg text-muted">
                    <span className="sr-only">Original price: </span>
                    <s>{formatLKR(product.price)}</s>
                  </p>
                  <SaleBadge />
                </>
              )}
            </div>

            {product.description && (
              <p className="mt-6 max-w-xl text-base leading-relaxed text-navy/75">{product.description}</p>
            )}

            {/* Specifications */}
            <dl className="mt-8 grid grid-cols-2 border-t border-line">
              {specifications(product).map(([label, value]) => (
                <div key={label} className="border-b border-line py-4 pr-4">
                  <dt className="text-xs tracking-wide text-muted">{label}</dt>
                  <dd className="mt-1 text-[0.9375rem] font-medium text-navy">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Actions */}
            <div className="mt-8">
              {sold ? (
                <div className="rounded-brand bg-pale-blue p-6">
                  <p className="text-[0.9375rem] leading-relaxed text-navy">
                    This gemstone has been sold. You are welcome to contact us about similar gemstones.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-3">
                    <ButtonLink href={routes.category(product.categorySlug)} size="sm">
                      Browse {product.category === "Other Gemstones" ? "similar gemstones" : product.category}
                    </ButtonLink>
                    <a
                      href={similar.href}
                      {...external(similar)}
                      className="inline-flex h-10 items-center gap-2 rounded-brand border border-navy px-5 text-sm font-medium text-navy transition-colors hover:bg-navy hover:text-white"
                    >
                      <ChatIcon className="size-4" />
                      Ask about similar stones
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  {availability === "reserved" && (
                    <p className="mb-4 rounded-brand bg-[#F6EEDF] px-4 py-3 text-sm text-[#5c4415]">
                      This gemstone is currently reserved. Please contact us to confirm its latest availability.
                    </p>
                  )}
                  <a
                    href={enquiry.href}
                    {...external(enquiry)}
                    data-whatsapp-primary
                    className="flex h-14 w-full items-center justify-center gap-2.5 rounded-brand bg-navy text-[0.9375rem] font-medium text-white transition-colors hover:bg-navy-hover"
                  >
                    <ChatIcon className="size-5" />
                    {availability === "reserved" ? "Ask about availability" : enquiry.isWhatsApp ? "Enquire on WhatsApp" : "Send an enquiry"}
                    {enquiry.isWhatsApp && <span className="sr-only"> (opens WhatsApp)</span>}
                  </a>
                  <p className="mt-3 text-center text-xs text-muted">
                    {enquiry.isWhatsApp ? (
                      <>
                        Your message includes this gemstone&rsquo;s name, Product ID and price.{" "}
                        <Link
                          href={`${routes.contact}?type=purchase&product=${product.productId}`}
                          className="whitespace-nowrap text-navy underline decoration-navy/30 underline-offset-2 hover:decoration-navy"
                        >
                          Prefer email? Send an enquiry
                        </Link>
                      </>
                    ) : (
                      "Your enquiry will include this gemstone\u2019s Product ID."
                    )}
                  </p>

                  {/* Viewing in person is optional, so it is a quiet secondary link */}
                  <a
                    href={viewing.href}
                    {...external(viewing)}
                    className="group mt-6 flex items-center justify-between gap-4 border-t border-line pt-5 text-[0.9375rem] text-navy"
                  >
                    <span className="flex items-center gap-3">
                      <EyeIcon className="size-5 shrink-0" strokeWidth={1.4} />
                      In Colombo? Request a viewing by appointment
                    </span>
                    <ArrowRightIcon className="size-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </a>
                </>
              )}
            </div>

            {/* More information */}
            <div className="mt-8 border-t border-line">
              <InfoSection title="Origin and treatment">
                <p>
                  {product.origin
                    ? `Origin: ${originLabel(product.origin)}.`
                    : "The origin of this gemstone is not specified."}
                </p>
                <p>
                  {product.treatment && product.treatment !== "unknown"
                    ? `Treatment: ${
                        product.treatment === "other" && product.treatmentNote
                          ? product.treatmentNote
                          : treatmentLabels[product.treatment]
                      }.`
                    : "Treatment information is not known for this gemstone, so it should not be assumed to be untreated."}
                </p>
              </InfoSection>

              <InfoSection title="Certification">
                {product.certification.status === "certified" ? (
                  <p>
                    This gemstone is certified
                    {product.certification.laboratory ? ` by ${product.certification.laboratory}` : ""}
                    {product.certification.reference ? ` (reference ${product.certification.reference})` : ""}.
                  </p>
                ) : product.certification.status === "pending" ? (
                  <p>Certification for this gemstone is in progress. Please ask us for an update.</p>
                ) : (
                  <p>
                    This gemstone is not currently certified. Certification is optional and can be arranged
                    on request, for an additional fee. We will confirm the laboratory, cost and turnaround
                    with you before going ahead.
                  </p>
                )}
              </InfoSection>

              <InfoSection title="Buying and viewing">
                <p>
                  Purchases are arranged personally. Send us an enquiry and we will confirm availability
                  and answer your questions. Payment is by bank transfer or in person.
                </p>
                <p>
                  If you are in Colombo, you are welcome to view the gemstone before deciding, by
                  appointment. Delivery or handover is arranged individually.
                </p>
                <p>
                  <Link href={routes.howToBuy} className="border-b border-navy/30 text-navy hover:border-navy">
                    How to buy
                  </Link>
                </p>
              </InfoSection>
            </div>
          </div>
        </div>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t border-line">
          <Container className="py-16 sm:py-20 lg:py-24">
            <h2 id="related-heading" className={sectionTitle}>
              You may also like
            </h2>
            <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-12 lg:grid-cols-4 lg:gap-x-8">
              {related.map((item) => (
                <li key={item.productId}>
                  <ProductCard product={item} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </>
  );
}
