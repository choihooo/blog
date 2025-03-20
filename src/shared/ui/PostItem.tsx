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
        <div className="flex justify-between">
          <div className="mr-5 flex max-w-[501px] min-w-[177px] flex-col gap-4">
            {isLoading ? (
              <>
                <Skeleton className="h-[16px] w-[200px]" />
                <div>
                  <Skeleton className="mb-2 h-[13px] w-[500px]" />
                  <Skeleton className="mb-2 h-[13px] w-[500px]" />
                  <Skeleton className="h-[13px] w-[300px]" />
                </div>
                <Skeleton className="h-[12px] w-[94px]" />
              </>
            ) : (
              <>
                <div className="group-hover:text-primary text-[16px]">
                  {post.title}
                </div>
                <div className="max-h-[100px] overflow-hidden text-[13px] text-ellipsis">
                  {post.excerpt}
                </div>
                <div className="text-[12px]">{post.date}</div>
              </>
            )}
          </div>
          <div className="h-[90px] min-w-[130px] max-w-[140px] w-full overflow-hidden rounded-xl">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <img
                src={
                  post.thumbnail || "https://example.com/default-thumbnail.jpg"
                }
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
