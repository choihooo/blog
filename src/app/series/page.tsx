import { Metadata } from "next";
import { SeriesList } from "@/components/SeriesList";
import { SideBar } from "@/components/SideBar";
import { PostListType } from "@/types/types";
import Image from "next/image";

export const metadata: Metadata = {
  title: "시리즈 | Howu Run",
  description: "블로그의 시리즈 모음입니다.",
};

interface SeriesMetaType {
  [key: string]: {
    count: number;
    latest_date: string;
    first_thumbnail: string;
  };
}

async function getData() {
  const postsResponse = await fetch("http://www.howu.run/postsMeta.json");
  const seriesResponse = await fetch("http://www.howu.run/seriesMeta.json");

  const posts: PostListType[] = await postsResponse.json();
  const seriesMeta: SeriesMetaType = await seriesResponse.json();

  // 시리즈 리스트를 생성
  const seriesList = Object.entries(seriesMeta).map(([name, meta]) => ({
    name,
    count: meta.count,
    latestDate: meta.latest_date,
    thumbnail: meta.first_thumbnail,
  }));

  return {
    posts,
    seriesList,
  };
}

export default async function SeriesPage() {
  const { posts, seriesList } = await getData();

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
          <SeriesList series={seriesList} />
          <SideBar posts={posts} />
        </div>
      </div>
    </div>
  );
}
