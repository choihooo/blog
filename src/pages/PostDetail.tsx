import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "@/lib/getPost"; // ✅ getPost 함수 import
import MarkdownRenderer from "@/shared/ui/MarkdownRenderer";
import { Tag } from "@/shared/ui/Tag";
import { v4 as uuidv4 } from "uuid";

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const decodedId = id ? decodeURIComponent(id) : ""; // ✅ URL 디코딩 적용
  const [postContent, setPostContent] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [postDate, setPostDate] = useState("");
  const [postThumbnail, setPostThumbnail] = useState<string>(
    "/default-thumbnail.jpg",
  ); // ✅ 기본값 추가
  const [postTags, setPostTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true); // ✅ 로딩 상태 추가

  useEffect(() => {
    if (!decodedId) return; // ✅ id가 없으면 요청하지 않음

    const fetchPostContent = async () => {
      setIsLoading(true);
      try {
        const postData = await getPost(decodedId);
        if (postData) {
          setPostContent(postData.content);
          setPostTitle(postData.title);
          setPostDate(postData.date);
          setPostThumbnail(postData.thumbnail || "/default-thumbnail.jpg"); // ✅ 기본값 유지
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
    <div className="post-detail">
      <header className="post-detail__header">
        {postThumbnail && (
          <div className="post-detail__header-thumbnail">
            <img
              src={postThumbnail} // ✅ postThumbnail을 string으로 설정
              alt={postTitle}
              className="post-detail__header-thumbnail-img"
            />
          </div>
        )}
        <h1 className="post-detail__header-title">{postTitle}</h1>
        <p className="post-detail__header-date">{postDate}</p>
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
    </div>
  );
}

export default PostDetail;
