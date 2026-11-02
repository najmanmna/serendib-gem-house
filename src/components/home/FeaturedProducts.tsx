import { ProductCard } from "@/components/product/ProductCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { featuredProducts } from "@/lib/data/home";
import { routes } from "@/lib/routes";

export function FeaturedProducts() {
  const { items } = featuredProducts;

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="featured-heading">
      <Container className="pt-8 pb-20 sm:pt-12 sm:pb-24 lg:pt-16 lg:pb-32">
        <h2 id="featured-heading" className="reveal text-xs font-medium tracking-[0.2em] text-navy/60 uppercase">
          <span className="sr-only">Featured gemstones</span>
          <span aria-hidden="true">Featured</span>
        </h2>

        <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 lg:mt-8 lg:grid-cols-4 lg:gap-x-8">
          {items.map((product) => (
            <li key={product.productId} className="reveal">
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center lg:mt-16">
          <ButtonLink href={routes.gemstones} variant="secondary" className="group">
            View All Gemstones
            <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
