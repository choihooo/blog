import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    domains: ["www.howu.run", "avatars.githubusercontent.com"],
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
  // 프리캐싱에서 app-build-manifest.json 제외
  buildExcludes: [/app-build-manifest.json$/],
  // 런타임 캐싱 설정 추가
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/www\.howu\.run\/_next\/image\?/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30 // 30일
        }
      }
    },
    {
      urlPattern: /\.(?:js|css)$/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'static-resources'
      }
    },
    {
      urlPattern: /^https?:\/\/[^\/]+\/(postsMeta|seriesMeta)\.json/,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 60 * 60 // 1시간
        }
      }
    }
  ]
})(nextConfig);