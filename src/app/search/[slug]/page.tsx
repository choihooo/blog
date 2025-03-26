import { Metadata } from "next";
import { PostList } from "@/components/PostList";
import { SideBar } from "@/components/SideBar";
import { getData } from "@/lib/getData";
import { PostListType } from "@/types/types";
import Image from "next/image";
export const metadata: Metadata = {
  title: "검색 결과",
  description: "검색 결과 페이지입니다.",
};

export default async function SearchPage({
  params,
}: {
  params: { slug: string };
}) {
  const resolvedParams = await Promise.resolve(params);
  const decodeId = decodeURIComponent(resolvedParams.slug);
  const posts: PostListType[] = await getData();

  const searchTerm = decodeId.toLowerCase();
  const filteredPosts = posts.filter((post) => {
    const title = post.title.toLowerCase();
    const tags = post.tags.map((tag) => tag.toLowerCase());
    const series = post.series.toLowerCase();
    const excerpt = post.excerpt.toLowerCase();

    return (
      title.includes(searchTerm) ||
      tags.some((tag) => tag.includes(searchTerm)) ||
      series.includes(searchTerm) ||
      excerpt.includes(searchTerm)
    );
  });

  return (
    <>
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
          <PostList posts={filteredPosts} decodeId={decodeId} />
          <SideBar posts={posts} />
        </div>
      </div>
    </>
  );
}
