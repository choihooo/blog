import { PostItem } from "@/components/PostItem";
import { PostListType } from "@/types/types";
import { LoadingModal } from "./LoadingModal";

interface PostListProps {
  posts: PostListType[];
  decodeId: string;
}

export function PostList({ posts, decodeId }: PostListProps) {
  if (!posts) {
    return <LoadingModal />;
  }

  return (
    <div className="flex w-[700px] flex-col gap-6">
      {decodeId && (
        <h1 className="mb-2 text-2xl font-bold">
          {decodeId} 검색 결과 ({posts.length}개)
        </h1>
      )}
      {posts.length === 0 ? (
        <p className="text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <PostItem key={post.title} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
