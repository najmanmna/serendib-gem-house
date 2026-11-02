import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/ButtonLink";
import { Container } from "@/components/ui/Container";
import { routes } from "@/lib/routes";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <Container className="flex flex-col items-start py-28 lg:py-40">
      <p className="text-sm tracking-[0.2em] text-muted">404</p>
      <h1 className="mt-5 font-heading text-5xl leading-tight font-semibold tracking-[-0.02em] lg:text-7xl">
        This page is not available
      </h1>
      <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
        The page you are looking for could not be found. It may have moved, or it may not be
        published yet.
      </p>
      <ButtonLink href={routes.home} className="mt-10">
        Return home
      </ButtonLink>
    </Container>
  );
}
