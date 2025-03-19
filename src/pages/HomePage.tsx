import { PostList } from "@/widgets/PostList";
import SideBar from "@/widgets/SideBar";
import { useEffect, useState } from "react";
import { PostListType } from "@/types";
import { SEO } from "@/components/SEO";

const HomePage = () => {
  const [posts, setPosts] = useState<PostListType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/postsMeta.json");
        const data: PostListType[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("❌ 포스트 데이터를 불러오는 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <SEO  title="Howu Run"/>
      <div className="w-full">
        <div className="flex w-full items-center justify-center">
          <div className="mt-7 mb-10 h-[100px] w-full max-w-[900px] overflow-hidden rounded-2xl">
            <img
              src="/banner.png"
              className="h-full w-full rounded-2xl object-cover"
            />
          </div>
        </div>

        <div className="flex w-full justify-evenly">
          <PostList posts={posts} isLoading={isLoading} />
          <SideBar posts={posts} />
        </div>
      </div>
    </>
  );
};

export default HomePage;
