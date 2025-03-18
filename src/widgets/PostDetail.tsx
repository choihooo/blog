import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "@/lib/getPost";
import MarkdownRenderer from "@/shared/ui/MarkdownRenderer";
import { Tag } from "@/shared/ui/Tag";
import { v4 as uuidv4 } from "uuid";
import Comments from "@/components/ui/Comments";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const decodedId = id ? decodeURIComponent(id) : "";
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postThumbnail, setPostThumbnail] = useState<string>(
    "/default-thumbnail.jpg",
  );
  const [postTags, setPostTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!decodedId) return;

    const fetchPostContent = async () => {
      setIsLoading(true);
      try {
        const postData = await getPost(decodedId);
        if (postData) {
          setPostContent(postData.content);
          setPostTitle(postData.title);
          setPostDate(postData.date);
          setPostThumbnail(postData.thumbnail || "/default-thumbnail.jpg");
          setPostTags(postData.tags || []);
        }
      } catch (error) {
        console.error("❌ 포스트를 불러오는 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchPostContent();
  }, [decodedId]);

  if (isLoading) return <p className="loading">로딩 중...</p>;
  if (!postContent)
    return <p className="error-message">포스트를 찾을 수 없습니다.</p>;

  return (
    <div className="mt-10 max-w-[900px]">
      <header className="post-detail__header">
        {postThumbnail && (
          <div className="flex max-w-full justify-center">
            <img
              src={postThumbnail}
              alt={postTitle}
              className="max-h-[300px] w-full rounded-2xl object-cover transition-all duration-300 ease-in-out md:max-h-[500px] lg:max-h-[600px]"
            />
          </div>
        )}
        <h1 className="text-foreground mt-[20px] text-3xl font-bold">
          {postTitle}
        </h1>
        <p className="text-popover mt-[20px]">{postDate}</p>
        <ul className="mt-3 flex w-full flex-wrap gap-2">
          {postTags.map((tag) => (
            <li key={uuidv4()} className="tag">
              <Tag text={tag} />
            </li>
          ))}
        </ul>
      </header>

      <main className="post-detail__content">
        <MarkdownRenderer content={postContent} />
      </main>

      <Comments />
    </div>
  );
}

export default PostDetail;
