import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import prerender from "@prerenderer/rollup-plugin";
import fs from "fs";

export interface Post {
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  series: string;
  excerpt: string;
  thumbnail: string;
}

const postsMetaPath = path.resolve(__dirname, "public", "postsMeta.json");

const posts = JSON.parse(fs.readFileSync(postsMetaPath, "utf-8"));

function convertToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const blogRoutes = posts.map(
  (post: Post) => `/post/${convertToSlug(post.title)}`,
);

console.log(blogRoutes);

// https://vite.dev/config/
export default defineConfig({
  server: { port: 3000 },
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      routes: ["/", ...blogRoutes],
      renderer: "@prerenderer/renderer-puppeteer",
      server: {
        port: 3000,
        host: "localhost",
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterTime: 500,
      },
      postProcess(renderedRoute) {
        renderedRoute.html = renderedRoute.html
          .replace(/http:/i, "https:")
          .replace(
            /(https:\/\/)?(localhost|127\.0\.0\.1):\d*/i,
            "https://www.howu.run/",
          );
      },
    }),
  ],
  base: "/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@types": path.resolve(__dirname, "src/types"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@api": path.resolve(__dirname, "src/api"),
    },
  },
});
