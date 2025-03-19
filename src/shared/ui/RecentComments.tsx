import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRecentComments } from "@/lib/getComments";

const RecentComments = () => {
  const [comments, setComments] = useState<
    {
      id: number;
      body: string;
      user: string;
      avatar: string;
      url: string;
      postUrl: string;
      createdAt: string;
      title: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      const recentComments = await getRecentComments();
      setComments(recentComments);
      setIsLoading(false);
    };

    fetchComments();
  }, []);

  if (isLoading) return <p>🌀 댓글을 불러오는 중...</p>;
  if (comments.length === 0) return <p>💬 최근 댓글이 없습니다.</p>;

  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <Link to={comment.postUrl} key={comment.id}>
            <li className="mt-3 w-full p-5 hover:bg-chart-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-foreground font-semibold text-sm">
                  {comment.user}
                </span>
              </div>
              <p className="text-foreground mt-1 text-sm">
                {comment.body.length > 100
                  ? comment.body.slice(0, 100) + "..."
                  : comment.body}
              </p>
              <span className="text-foreground text-xs">{comment.title}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RecentComments;
