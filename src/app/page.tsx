import { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SideBar } from "@/components/SideBar";
import { PostListType } from "@/types/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Howu Run",
  description: "Howu의 개발 블로그. 최신 개발 트렌드와 기술을 공유합니다.",
  openGraph: {
    title: "Howu Run",
    description: "Howu의 개발 블로그. 최신 개발 트렌드와 기술을 공유합니다.",
    images: [{ url: "https://www.howu.run/og.png" }],
  },
};

async function getPosts(): Promise<PostListType[]> {
  try {
    const response = await fetch("https://www.howu.run/postsMeta.json", {
      next: { revalidate: 3600 }, // 1시간마다 재검증
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

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-center">
        <div className="mt-7 mb-10 h-[100px] w-full max-w-[1200px] overflow-hidden rounded-2xl">
          <Image
            src="/banner.png"
            alt="Search Banner"
            width={1200}
            height={100}
            className="rounded-2xl object-fit"
            priority
          />
        </div>
      </div>
      <div className="w-full">
        <div className="flex w-full justify-between max-w-[1200px] mx-auto">
          <PostList posts={posts} />
          <SideBar posts={posts} />
        </div>
      </div>
    </div>
  );
}
