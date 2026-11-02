import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    // Footer copyright year, fixed at build time: avoids a runtime cache for a value that
    // only needs to change once a year (the site is rebuilt on every deploy).
    NEXT_PUBLIC_BUILD_YEAR: String(new Date().getFullYear()),
  },
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev`.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
