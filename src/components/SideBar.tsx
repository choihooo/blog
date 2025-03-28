import { PopularPosts } from "@/components/PopularPosts";
import { RecentComments } from "@/components/RecentComments";
import { Tag } from "@/components/Tag";
import { PostListType } from "@/types/types";

interface SideBarProps {
  posts: PostListType[];
}

export const SideBar = ({ posts }: SideBarProps) => {
  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  return (
    <div className="hidden max-w-[349px] min-w-[349px] px-6 md:block">
      <div className="mb-6">
        <div className="text-secondary-foreground text-[13px]">인기있는 글</div>
        <PopularPosts />
      </div>
      <div className="mb-6">
        <div className="text-secondary-foreground text-[13px]">최신 댓글</div>
        <RecentComments />
      </div>
      <div>
        <div className="text-secondary-foreground text-[13px]">태그</div>
        <ul className="mt-3 flex w-full flex-wrap gap-2">
          {allTags.map((tag) => (
            <li key={tag} className="tag">
              <Tag text={tag} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}; 