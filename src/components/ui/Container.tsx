import type { ComponentProps } from "react";

/** Centres content within the 1,360px site width with consistent side margins. */
export function Container({ className = "", ...props }: ComponentProps<"div">) {
  return <div className={`mx-auto w-full max-w-site px-5 sm:px-8 lg:px-12 ${className}`} {...props} />;
}
