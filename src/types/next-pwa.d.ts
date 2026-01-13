declare module "next-pwa" {
  import type { NextConfig } from "next";

  interface RuntimeCacheEntry {
    urlPattern: RegExp | string;
    handler:
      | "CacheFirst"
      | "CacheOnly"
      | "NetworkFirst"
      | "NetworkOnly"
      | "StaleWhileRevalidate";
    options?: {
      cacheName?: string;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
      cacheableResponse?: {
        statuses?: number[];
      };
    };
  }

  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    scope?: string;
    runtimeCaching?: RuntimeCacheEntry[];
    fallbacks?: {
      document?: string;
      image?: string;
      font?: string;
      audio?: string;
      video?: string;
    };
    cacheOnFrontEndNav?: boolean;
    reloadOnOnline?: boolean;
    buildExcludes?: (string | RegExp)[];
    publicExcludes?: string[];
    dynamicStartUrl?: boolean;
    dynamicStartUrlRedirect?: string;
  }

  function withPWAInit(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export default withPWAInit;
}
