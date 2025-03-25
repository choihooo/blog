import { MetadataRoute } from "next";

interface PostMeta {
  title: string;
  date: string;
}

// 한국어 날짜 형식을 Date 객체로 변환하는 함수
function parseKoreanDate(dateStr: string): Date {
  try {
    // "2025월 03월 19일 16:37" 형식을 파싱
    const match = dateStr.match(/(\d{4})월\s*(\d{2})월\s*(\d{2})일\s*(\d{2}):(\d{2})/);
    if (!match) {
      return new Date();
    }

    const [, year, month, day, hours, minutes] = match;
    // 월은 0부터 시작하므로 1을 빼줍니다
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
  } catch (error) {
    console.error("날짜 파싱 오류:", error);
    return new Date();
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://howu.run";

  // 정적 페이지 URL
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: 0.8,
    },
  ];

  // 포스트 페이지 URL
  try {
    const response = await fetch("http://www.howu.run/postsMeta.json");
    const posts: PostMeta[] = await response.json();
    
    const postPages: MetadataRoute.Sitemap = posts.map((post) => {
      const postDate = parseKoreanDate(post.date);
      const lastModified = isNaN(postDate.getTime()) ? new Date() : postDate;

      return {
        url: `${baseUrl}/post/${post.title}`,
        lastModified: lastModified.toISOString(),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      };
    });

    return [...staticPages, ...postPages];
  } catch (error) {
    console.error("Error generating sitemap:", error);
    // 에러 발생 시 정적 페이지만 반환합니다
    return staticPages;
  }
} 