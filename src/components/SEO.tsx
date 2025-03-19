import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  siteName?: string;
  keywords?: string;
  author?: string;
  themeColor?: string;
}

export function SEO({
  title,
  description = "Howu의 개발 블로그",
  image = "https://howu.run/banner.png",
  url = "https://howu.run",
  siteName = "Howu Run",
  keywords = "프론트엔드, 웹개발, React, Next.js",
  author = "최호",
  themeColor = "#ffffff",
}: SEOProps) {
  return (
    <Helmet>
      {/* 기본 메타 태그 */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="theme-color" content={themeColor} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* Open Graph (Facebook, KakaoTalk 등) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ko_KR" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter Card (트위터 공유 시) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:creator" content={author} />

      {/* Favicon (파비콘 설정) */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    </Helmet>
  );
}
