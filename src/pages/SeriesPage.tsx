import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SeriesList } from "@/widgets/SeriesList";
import SideBar from "@/widgets/SideBar";
import { PostListType } from "@/types";

interface SeriesMetaType {
  [key: string]: {
    count: number;
    latest_date: string;
    first_thumbnail: string;
  };
}

const SeriesPage = () => {
  const { slug } = useParams<{ slug?: string }>();
  const decodedId = slug ? decodeURIComponent(slug).toLowerCase() : "";
  const [posts, setPosts] = useState<PostListType[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<PostListType[]>([]);
  const [seriesMeta, setSeriesMeta] = useState<SeriesMetaType>({});
  const [isLoading, setIsLoading] = useState(true);

  // 포스트 데이터 가져오기
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

  // 시리즈 메타 데이터 가져오기
  useEffect(() => {
    const fetchSeriesMeta = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/seriesMeta.json");
        const data: SeriesMetaType = await response.json();
        setSeriesMeta(data);
      } catch (error) {
        console.error("❌ 시리즈 메타 데이터를 불러오는 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchSeriesMeta();
  }, []);

  // 필터링된 포스트 업데이트
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

  // 시리즈 리스트를 생성
  const seriesList = Object.entries(seriesMeta).map(([name, meta]) => ({
    name,
    count: meta.count,
    latestDate: meta.latest_date,
    thumbnail: meta.first_thumbnail,
  }));

  return (
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
        <SeriesList series={seriesList} isLoading={isLoading} />
        <SideBar posts={filteredPosts} />
      </div>
    </div>
  );
};

export default SeriesPage;
