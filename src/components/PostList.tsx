import { PostItem } from "@/components/PostItem";
import { PostListType } from "@/types/types";

interface PostListProps {
  posts: PostListType[];
  decodeId?: string;
}

export const PostList = ({ posts, decodeId }: PostListProps) => {
  return (
    <div className="flex w-[700px] flex-col gap-6">
      {decodeId && (
        <h1 className="mb-2 text-2xl font-bold">
          {decodeId} 검색 결과 ({posts.length}개)
        </h1>
      )}
      {posts.map((post, index) => (
        <PostItem key={index} post={post} />
      ))}
    </div>
  );
};
