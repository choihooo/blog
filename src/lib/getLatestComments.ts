import { Comment } from "@/types/types";

interface GitHubDiscussion {
  id: string;
  user: {
    login: string;
  };
  body: string;
  updated_at: string;
  title: string;
}

export async function getLatestComments(): Promise<Comment[]> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/choihooo/comment/discussions?sort=updated&direction=desc&per_page=5`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    const discussions: GitHubDiscussion[] = await response.json();
    return discussions.map((discussion) => ({
      id: discussion.id,
      author: discussion.user.login,
      content: discussion.body,
      date: new Date(discussion.updated_at).toLocaleDateString("ko-KR"),
      postTitle: discussion.title,
    }));
  } catch (error) {
    console.error("Error fetching latest comments:", error);
    return [];
  }
} 