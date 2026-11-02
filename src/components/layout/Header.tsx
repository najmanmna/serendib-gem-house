import Link from "next/link";
import { Suspense } from "react";

import { Logo } from "@/components/brand/Logo";
import { ActiveNavigationList } from "@/components/layout/ActiveNavigationList";
import { HeaderShell } from "@/components/layout/HeaderShell";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { NavigationList } from "@/components/layout/NavigationList";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site-config";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function Header() {
  const whatsapp = getWhatsAppLink();

  return (
    <HeaderShell>
      <Container className="flex h-20 items-center justify-between gap-6 transition-[height] duration-300 ease-out group-data-[scrolled=true]/header:h-16 lg:grid lg:h-24 lg:grid-cols-[1fr_auto_1fr] lg:group-data-[scrolled=true]/header:h-[4.5rem]">
        <Link href="/" aria-label="Serendib Crown Gems, home" className="shrink-0 justify-self-start rounded-brand">
          <Logo compactOnScroll />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <Suspense fallback={<NavigationList pathname={null} variant="desktop" />}>
            <ActiveNavigationList variant="desktop" />
          </Suspense>
        </nav>

        <div className="flex items-center gap-3 justify-self-end">
          <div className="hidden sm:block">
            <WhatsAppButton link={whatsapp} size="sm" />
          </div>
          <MobileNavigation whatsapp={whatsapp} location={siteConfig.location} />
        </div>
      </Container>
    </HeaderShell>
  );
}
