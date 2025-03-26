export interface PostListType {
  title: string;
  date: string;
  categories: string[];
  excerpt: string;
  thumbnail: string;
  tags: string[];
  series: string;
}

export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  postTitle: string;
} 