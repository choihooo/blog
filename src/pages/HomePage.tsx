import { PostList } from "@/widgets/PostList";
import SideBar from "@/widgets/SideBar";
import { useEffect, useState } from "react";
import { PostListType } from "@/types";

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
    <div className="w-full">
      <div className="mt-7 mb-10 h-[300px] max-w-[1050px] overflow-hidden rounded-2xl">
        <img
          src="/banner.png"
          className="h-full w-full rounded-2xl object-cover"
        />
      </div>

      <div className="flex w-full justify-evenly">
        <PostList posts={posts} isLoading={isLoading} />
        <SideBar posts={posts} />
      </div>
    </div>
  );
};

export default HomePage;
