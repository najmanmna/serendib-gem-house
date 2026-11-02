"use client";

import { usePathname } from "next/navigation";

import { NavigationList, type NavigationListProps } from "@/components/layout/NavigationList";

/**
 * Marks the current page in the navigation. Render inside <Suspense> with a
 * `NavigationList pathname={null}` fallback, as routes with request-time params
 * cannot resolve the pathname during prerendering.
 */
export function ActiveNavigationList(props: Omit<NavigationListProps, "pathname">) {
  const pathname = usePathname();

  return <NavigationList pathname={pathname} {...props} />;
}
