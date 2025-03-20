import { useEffect, useRef } from "react";

const Comments = () => {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef.current) return;

    // 기존 스크립트가 있으면 제거
    commentRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "choihooo/comment"); // ✅ 본인의 GitHub 저장소 설정
    script.setAttribute("issue-term", "pathname"); // ✅ 각 게시글 URL을 기준으로 댓글 연결
    script.setAttribute("theme", "github-light"); // ✅ 테마 설정
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentRef.current.appendChild(script);
  }, []);

  return (
    <>
      <div ref={commentRef} className="mt-10 h-full"></div>
    </>
  );
};

export default Comments;
