import { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SideBar } from "@/components/SideBar";
import { PostListType } from "@/types/types";
import Image from "next/image";

interface Props {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug);

  return {
    title: `"${decodedSlug}" 검색 결과 | Howu Run`,
    description: `"${decodedSlug}" 검색어로 찾은 블로그 글 목록입니다.`,
  };
}

async function getData(slug: string) {
  const response = await fetch("http://www.howu.run/postsMeta.json");
  const posts: PostListType[] = await response.json();
  const decodedId = decodeURIComponent(slug).toLowerCase();

  const filteredPosts = posts.filter((post) => {
    const title = post.title.toLowerCase();
    const tags = Array.isArray(post.tags)
      ? post.tags.map((tag: string) => tag.toLowerCase())
      : [];
    const excerpt = post.excerpt?.toLowerCase() || "";
    const series = post.series ? post.series.toLowerCase() : "";

    return (
      title.includes(decodedId) ||
      tags.some((tag: string) => tag.includes(decodedId)) ||
      excerpt.includes(decodedId) ||
      series.includes(decodedId)
    );
  });

  return {
    decodedId,
    filteredPosts,
  };
}

export default async function SearchPage({ params }: Props) {
  const { slug } = await params;
  const { decodedId, filteredPosts } = await getData(slug);

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
        <div className="flex w-full justify-between mx-auto max-w-[1200px]">
          <PostList posts={filteredPosts} decodeId={decodedId} />
          <SideBar posts={filteredPosts} />
        </div>
      </div>
    </div>
  );
}
