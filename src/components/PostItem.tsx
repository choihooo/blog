import { PostListType } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

interface PostItemProps {
  post: PostListType;
}

export const PostItem = ({ post }: PostItemProps) => {
  return (
    <div className="group w-full cursor-pointer">
      <Link href={`/post/${encodeURIComponent(post.title)}`} className="block">
        <div className="flex justify-between">
          <div className="mr-5 flex max-w-[501px] min-w-[177px] flex-col gap-4">
            <div className="group-hover:text-primary text-[16px]">
              {post.title}
            </div>
            <div className="max-h-[100px] overflow-hidden text-[13px] text-ellipsis line-clamp-5">
              {post.excerpt}
            </div>
            <div className="text-[12px]">{post.date}</div>
          </div>
          <div className="relative h-[90px] min-w-[130px] max-w-[140px] w-full overflow-hidden rounded-xl">
            <Image
              src={post.thumbnail || "/default-thumbnail.jpg"}
              alt={`${post.title} 썸네일`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </Link>
    </div>
  );
}; 