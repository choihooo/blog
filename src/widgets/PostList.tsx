import { PostItem } from "@/shared/ui/PostItem";

export const PostList = () => {
  const posts = [
    { title: "무엇이든 물어보세요", date: "2025년 2월 17일", isLoading: true },
    {
      title: "모닥불 10화 특집: 캠프파이어",
      date: "2025년 2월 10일",
      isLoading: false,
    },
    {
      title: "코드 리뷰: 최신 트렌드",
      date: "2025년 2월 5일",
      isLoading: false,
    },
    // 더 많은 포스트 데이터 추가 가능
  ];

  return (
    <div className="flex flex-col gap-6">
      {posts.map((post, index) => (
        <PostItem key={index} isLoading={post.isLoading} />
      ))}
    </div>
  );
};
