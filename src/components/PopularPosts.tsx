"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingModal } from "./LoadingModal";
import { getPopularPostsByChangeRate } from "@/lib/getPopularPosts";

export const PopularPosts = () => {
  const [posts, setPosts] = useState<
    { title: string; url: string; views: number }[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPopularPosts() {
      const data = await getPopularPostsByChangeRate();
      setPosts(data);
      setLoading(false);
    }

    fetchPopularPosts();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <>
      {isLoading && <LoadingModal />}
      <div className="mt-4">
        <ul>
          {loading ? (
            <p>인기 글을 불러오는 중...</p>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.url} className="py-3">
                <Link href={post.url} onClick={handleClick}>
                  <div className="text-sm font-bold text-foreground">
                    {post.title}
                  </div>
                  <div className="text-xs text-chart-1">
                    views: {post.views}
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p>인기 글이 없습니다.</p>
          )}
        </ul>
      </div>
    </>
  );
};
