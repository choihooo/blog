import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PostList } from "@/widgets/PostList";
import SideBar from "@/widgets/SideBar";
import { PostListType } from "@/types";

const SearchPage = () => {
  const { id } = useParams<{ id?: string }>();
  const decodedId = id ? decodeURIComponent(id).toLowerCase() : "";
  const [posts, setPosts] = useState<PostListType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostListType[]>([]);
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

  useEffect(() => {
    if (!decodedId) {
      setFilteredPosts(posts);
      return;
    }

    const filtered = posts.filter((post) => {
      const title = post.title.toLowerCase();
      const tags = Array.isArray(post.tags)
        ? post.tags.map((tag: string) => tag.toLowerCase())
        : [];
      const excerpt = post.excerpt?.toLowerCase() || "";

      return (
        title.includes(decodedId) ||
        tags.some((tag: string) => tag.includes(decodedId)) ||
        excerpt.includes(decodedId)
      );
    });

    setFilteredPosts(filtered);
  }, [decodedId, posts]);

  return (
    <div className="w-full">
      <div className="mt-7 mb-10 max-w-[1050px]">
        <h1 className="text-2xl font-bold">
          "{decodedId}" 검색 결과 ({filteredPosts.length}개)
        </h1>
        <div className="h-[150px] w-full bg-black"></div>
      </div>
      <div className="flex w-full justify-evenly">
        <PostList posts={filteredPosts} isLoading={isLoading} />
        <SideBar posts={filteredPosts} />
      </div>
    </div>
  );
};

export default SearchPage;
