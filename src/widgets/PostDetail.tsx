import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPost } from "@/lib/getPost";
import MarkdownRenderer from "@/shared/ui/MarkdownRenderer";
import { Tag } from "@/shared/ui/Tag";
import { v4 as uuidv4 } from "uuid";
import Comments from "@/shared/ui/Comments";
import { increaseViewCount } from "@/lib/increaseViewCount";
import { SEO } from "@/components/SEO"; // ✅ SEO 컴포넌트 추가

function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const decodedId = slug ? decodeURIComponent(slug) : "";
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

          // ✅ 서버 렌더링된 데이터를 클라이언트에서 사용할 수 있도록 설정
          window.__PRERENDERED_DATA__ = {
            title: postData.title,
            description: postData.content.slice(0, 150),
            image: postData.thumbnail || "/default-thumbnail.jpg",
            url: `https://howu.run/blog/${slug}`,
            siteName: "Howu Run",
            keywords: postData.tags.join(", "),
            author: "최호",
          };
        }
      } catch (error) {
        console.error("❌ 포스트를 불러오는 중 오류 발생:", error);
      }
      setIsLoading(false);
    };

    fetchPostContent();
  }, [decodedId, slug]);

  useEffect(() => {
    if (slug) increaseViewCount(slug);
  }, [slug]);

  if (isLoading) return <p className="loading">로딩 중...</p>;
  if (!postContent)
    return <p className="error-message">포스트를 찾을 수 없습니다.</p>;

  return (
    <div className="mt-10 max-w-[900px]">
      {/* ✅ SEO 컴포넌트 추가 */}
      <SEO
        title={postTitle}
        description={postContent.slice(0, 150)} // 글 내용의 앞부분을 설명으로 사용
        image={postThumbnail}
        url={`https://howu.run/blog/${slug}`} // 동적 URL
        siteName="Howu Run"
        keywords={postTags.join(", ")}
        author="최호"
      />

      <header className="post-detail__header">
        {postThumbnail && (
          <div className="flex w-full justify-center">
            <img
              src={postThumbnail}
              alt={postTitle}
              className="h-auto w-full max-w-full rounded-2xl object-cover"
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
        <Comments />
      </main>
    </div>
  );
}

export default PostDetail;
