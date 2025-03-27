"use client";

import { useEffect, useRef } from "react";

export function Comments() {
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!commentRef.current) return;

    // 기존 스크립트가 있으면 제거
    commentRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", "choihooo/comment");
    script.setAttribute("data-repo-id", "R_kgDOOKp8Lw");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOOKp8L84CogcO");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "ko");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentRef.current.appendChild(script);
  }, []);

  return (
    <div ref={commentRef} className="mt-10 h-full" suppressHydrationWarning />
  );
}
