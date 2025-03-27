"use client";

import { Comment } from "@/types/types";
import { useState, useEffect } from "react";
import { LoadingModal } from "./LoadingModal";
import { getLatestComments } from "@/lib/getLatestComments";

export function LatestComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const latestComments = await getLatestComments();
        setComments(latestComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, []);

  const handleClick = () => {
    setIsLoading(true);
  };

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <div className="w-full max-w-[800px]">
      <h2 className="text-2xl font-bold mb-6">최신 댓글</h2>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="font-semibold">{comment.author}</span>
                <span className="text-gray-500 dark:text-gray-400 ml-2">
                  {comment.date}
                </span>
              </div>
              <a
                href={`/post/${encodeURIComponent(comment.postTitle)}`}
                onClick={handleClick}
                className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                원문 보기
              </a>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 