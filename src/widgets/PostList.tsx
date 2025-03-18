import { PostItem } from "@/shared/ui/PostItem";
import { PostListType } from "@/types";

interface PostListProps {
  posts: PostListType[];
  isLoading: boolean;
}

export const PostList = ({ posts, isLoading }: PostListProps) => {
  return (
    <div className="flex w-[700px] flex-col gap-6">
      {posts.map((post, index) => (
        <PostItem key={index} post={post} isLoading={isLoading} />
      ))}
    </div>
  );
};
