import { PostListType } from "@/types/types";

interface RawPost {
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  thumbnail?: string;
  tags?: string[];
  series?: string;
}

export async function getData(): Promise<PostListType[]> {
  const response = await fetch("http://www.howu.run/postsMeta.json");
  const posts: RawPost[] = await response.json();
  
  return posts.map((post) => ({
    ...post,
    thumbnail: post.thumbnail || "/default-thumbnail.jpg",
    tags: post.tags || [],
    series: post.series || ""
  }));
} 