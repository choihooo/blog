import { Skeleton } from "@/components/ui/skeleton";
import { PostListType } from "@/types";
import { Link } from "react-router-dom";

interface PostListProps {
  post: PostListType;
  isLoading: boolean;
}

export const PostItem = ({ post, isLoading }: PostListProps) => {
  return (
    <div className="group w-full cursor-pointer">
      <Link to={`/post/${encodeURIComponent(post.title)}`} className="block">
        {" "}
        {/* ✅ URL 변환 */}
        <div className="flex justify-between">
          <div className="mr-5 flex max-w-[501px] flex-col gap-4">
            {isLoading ? (
              <>
                <Skeleton className="h-[16px] w-[200px]" /> {/* 제목 로딩 */}
                <div>
                  <Skeleton className="mb-2 h-[13px] w-[500px]" />{" "}
                  <Skeleton className="mb-2 h-[13px] w-[500px]" />{" "}
                  <Skeleton className="h-[13px] w-[300px]" />{" "}
                </div>
                <Skeleton className="h-[12px] w-[94px]" /> {/* 날짜 로딩 */}
              </>
            ) : (
              <>
                <div className="group-hover:text-primary text-[16px]">
                  {post.title}
                </div>
                <div className="text-[13px]">{post.excerpt}</div>
                <div className="text-[12px]">{post.date}</div>
              </>
            )}
          </div>
          <div className="h-[90px] min-w-[130px] overflow-hidden rounded-xl">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <img
                src={
                  post.thumbnail || "https://example.com/default-thumbnail.jpg"
                } // ✅ 기본값 추가
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                alt="Post Thumbnail"
              />
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
