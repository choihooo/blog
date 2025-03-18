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
    <div className="recent-comments rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
      <h2 className="mb-2 text-lg font-bold">📝 최근 댓글</h2>
      <ul>
        {comments.map((comment) => (
          <Link to={comment.postUrl} key={comment.id}>
            <li className="mb-3 cursor-pointer rounded-lg bg-white p-3 shadow-md transition-all hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
              <div className="flex items-center gap-3">
                <img
                  src={comment.avatar}
                  alt={comment.user}
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-semibold text-blue-500">
                  {comment.user}
                </span>
              </div>
              <p className="mt-1 text-gray-700 dark:text-gray-300">
                {comment.body.length > 100
                  ? comment.body.slice(0, 100) + "..."
                  : comment.body}
              </p>
              <span className="text-sm text-gray-500">{comment.createdAt}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default RecentComments;
