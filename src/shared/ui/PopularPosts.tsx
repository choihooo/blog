import { getPopularPostsByChangeRate } from "@/lib/getPopularPosts";
import { useEffect, useState } from "react";

export const PopularPosts = () => {
  const [posts, setPosts] = useState<
    { title: string; url: string; views: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPopularPosts() {
      const data = await getPopularPostsByChangeRate();
      setPosts(data);
      setLoading(false); // 데이터 로드 완료 후 로딩 상태 변경
    }
    fetchPopularPosts();
  }, []);

  return (
    <div className="mt-4">
      <ul>
        {loading ? (
          <p>인기 글을 불러오는 중...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <li key={post.url} className="py-3">
              {/* key로 slug 또는 URL 사용 */}
              <a href={post.url}>
                <div className="text-sm font-bold text-foreground">{post.title}</div>
                <div className="text-xs text-chart-1">Howu</div>
              </a>
            </li>
          ))
        ) : (
          <p>인기 글이 없습니다.</p>
        )}
      </ul>
    </div>
  );
};
