import { MetadataRoute } from "next";

interface PostMeta {
  title: string;
  date: string;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://howu.run";

  // 정적 페이지 URL
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  // 포스트 페이지 URL
  try {
    const response = await fetch("http://www.howu.run/postsMeta.json");
    const posts: PostMeta[] = await response.json();
    
    const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
      url: `${baseUrl}/post/${post.title}`,
      lastModified: new Date(post.date),
      changeFrequency: "weekly",
      priority: 0.7,
    }));

    return [...staticPages, ...postPages];
  } catch (error) {
    console.error("Failed to fetch posts for sitemap:", error);
    return staticPages;
  }
} 