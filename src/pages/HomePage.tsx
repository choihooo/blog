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

        // 날짜 형식을 '2025-02-26 03:44'로 변환하여 정렬
        const sortedPosts = data.sort((a, b) => {
          const formatDate = (dateString: string) => {
            const [year, month, day, time] = dateString
              .replace("월", "-")
              .replace("일", "")
              .split(" ")
              .map((part) => part.trim());
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")} ${time}`;
          };

          const dateA = formatDate(a.date);
          const dateB = formatDate(b.date);

          // 정렬을 거꾸로 해서 가장 오래된 날짜가 위로 오게 함
          return dateB.localeCompare(dateA); // 오래된 날짜가 위로 오게 정렬
        });

        setPosts(sortedPosts); // 정렬된 데이터를 상태에 저장
      } catch (error) {
        console.error("❌ 포스트 데이터를 불러오는 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
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
