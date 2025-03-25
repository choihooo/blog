"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

export function Comments() {
  const commentRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (!commentRef.current) return;

    // 기존 스크립트가 있으면 제거
    commentRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.setAttribute("repo", "choihooo/comment");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", theme === "dark" ? "github-dark" : "github-light");
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    commentRef.current.appendChild(script);
  }, [theme]);

  return (
    <div ref={commentRef} className="mt-10 h-full"></div>
  );
} 