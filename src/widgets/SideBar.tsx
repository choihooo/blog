import { Tag } from "@/shared/ui/Tag";
import { PostListType } from "@/types";
import { v4 as uuidv4 } from "uuid";

interface SideBarProps {
  posts: PostListType[];
}

const SideBar = ({ posts }: SideBarProps) => {

  const allTags = [...new Set(posts.flatMap((post) => post.tags || []))];

  return (
    <div className="hidden max-w-[349px] min-w-[349px] px-6 md:block">
      <div>
        <div className="text-secondary-foreground text-[13px]">태그</div>
        <ul className="mt-3 flex w-full flex-wrap gap-2">
          {allTags.map((tag) => (
            <li key={uuidv4()} className="tag">
              <Tag text={tag} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
