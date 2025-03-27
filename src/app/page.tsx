import { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SideBar } from "@/components/SideBar";
import { PostListType } from "@/types/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Howu Run | Howu의 기술 블로그",
  description:
    "프론트엔드 개발자 Howu의 기술 블로그입니다. 웹 개발, React, TypeScript, Next.js 등 다양한 기술 관련 포스트를 공유합니다.",
  metadataBase: new URL("https://howu.run"),
  alternates: {
    canonical: "https://howu.run",
  },
  openGraph: {
    title: "Howu Run | Howu의 기술 블로그",
    description:
      "프론트엔드 개발자 Howu의 기술 블로그입니다. 웹 개발, React, TypeScript, Next.js 등 다양한 기술 관련 포스트를 공유합니다.",
    url: "https://howu.run",
    siteName: "Howu Run",
    images: [
      {
        url: "/banner.png",
        width: 800,
        height: 400,
        alt: "Howu Run Banner",
      },
    ],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Howu Run | Howu의 기술 블로그",
    description:
      "프론트엔드 개발자 Howu의 기술 블로그입니다. 웹 개발, React, TypeScript, Next.js 등 다양한 기술 관련 포스트를 공유합니다.",
    images: [
      {
        url: "/banner.png",
        width: 1200,
        height: 630,
        alt: "Howu Run Banner",
      },
    ],
    creator: "@howu",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

async function getPosts(): Promise<PostListType[]> {
  try {
    const response = await fetch("https://www.howu.run/postsMeta.json", {
      next: { revalidate: 3600 },
    });
    const data: PostListType[] = await response.json();

    return data.sort((a, b) => {
      const formatDate = (dateString: string) => {
        const [year, month, day, time] = dateString
          .replace("월", "-")
          .replace("일", "")
          .split(" ")
          .map((part) => part.trim());
        return `${year}-${month.padStart(2, "0")}-${day.padStart(
          2,
          "0"
        )} ${time}`;
      };

      const dateA = formatDate(a.date);
      const dateB = formatDate(b.date);

      return dateB.localeCompare(dateA);
    });
  } catch (error) {
    console.error("❌ 포스트 데이터를 불러오는 중 오류 발생:", error);
    return [];
  }
}

export default async function Home() {
  const posts = await getPosts();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Howu Run",
    description:
      "프론트엔드 개발자 Howu의 기술 블로그입니다. 웹 개발, React, TypeScript, Next.js 등 다양한 기술 관련 포스트를 공유합니다.",
    url: "https://howu.run",
    publisher: {
      "@type": "Organization",
      name: "Howu Run",
      logo: {
        "@type": "ImageObject",
        url: "https://howu.run/logo.png",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="w-full">
        <div className="flex w-full items-center justify-center">
          <div className="mt-7 mb-10 h-[100px] w-full max-w-[1200px] overflow-hidden rounded-2xl">
            <Image
              src="/banner.png"
              alt="Howu Run Banner"
              width={1200}
              height={100}
              className="rounded-2xl object-fit"
              priority
            />
          </div>
        </div>

        <div className="w-full">
          <div className="flex w-full justify-between mx-auto max-w-[1200px]">
            <PostList posts={posts} decodeId={""} />
            <SideBar posts={posts} />
          </div>
        </div>
      </div>
    </>
  );
}
