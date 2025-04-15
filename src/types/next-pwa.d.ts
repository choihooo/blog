declare module "next-pwa" {
  import { NextConfig } from "next";

  // Workbox RuntimeCaching 관련 타입 정의
  interface RuntimeCachingRule {
    urlPattern: RegExp | string;
    handler: string;
    options?: {
      cacheName?: string;
      expiration?: {
        maxEntries?: number;
        maxAgeSeconds?: number;
      };
      cacheableResponse?: {
        statuses?: number[];
        headers?: {
          [key: string]: string;
        };
      };
      networkTimeoutSeconds?: number;
      backgroundSync?: {
        name: string;
        options?: {
          maxRetentionTime?: number;
        };
      };
      broadcastUpdate?: {
        channelName?: string;
      };
      matchOptions?: {
        ignoreSearch?: boolean;
        ignoreVary?: boolean;
      };
      rangeRequests?: boolean;
      plugins?: any[];
    };
  }

  interface PWAConfig {
    dest?: string;
    disable?: boolean;
    register?: boolean;
    skipWaiting?: boolean;
    buildExcludes?: (string | RegExp)[];
    runtimeCaching?: RuntimeCachingRule[];
    workbox?: {
      excludes?: string[];
      [key: string]: any;
    };
  }

  function withPWA(config: PWAConfig): (nextConfig: NextConfig) => NextConfig;

  export default withPWA;
}