import type { Metadata } from "next";

import { BrandIntroduction } from "@/components/home/BrandIntroduction";
import { CategorySection } from "@/components/home/CategorySection";
import { ContactCTA } from "@/components/home/ContactCTA";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { Hero } from "@/components/home/Hero";
import { HowToBuy } from "@/components/home/HowToBuy";
import garnetStill from "@/assets/hero/garnet-still.jpg";
import { siteConfig } from "@/lib/site-config";

const title = "Serendib Gem House | Fine Gemstones in Colombo, Sri Lanka";
const description =
  "Discover carefully selected spinels, garnets, sapphires and other fine gemstones, with clear prices in LKR, transparent information and personal assistance from Colombo, Sri Lanka.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: "/",
    images: [{ url: garnetStill.src, width: garnetStill.width, height: garnetStill.height, alt: "A faceted red garnet" }],
  },
};

const organisationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteConfig.url,
  description: siteConfig.description,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colombo",
    addressCountry: "LK",
  },
  areaServed: "LK",
  ...(siteConfig.contact.email && { email: siteConfig.contact.email }),
  ...(siteConfig.contact.instagramUrl && { sameAs: [siteConfig.contact.instagramUrl] }),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organisationJsonLd).replace(/</g, "\\u003c") }}
      />
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <BrandIntroduction />
      <ContactCTA />
      <HowToBuy />
    </>
  );
}
