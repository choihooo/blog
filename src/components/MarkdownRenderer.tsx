"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

interface MarkdownRendererProps {
  content: string;
}

// highlight.js 스타일을 클라이언트 사이드에서만 로드
const MarkdownContent = dynamic(() => import("./MarkdownContent"), {
  ssr: false,
});

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };

    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`post-content ${isDarkMode ? "dark-theme" : "light-theme"}`}
    >
      <div ref={contentRef}>
        <MarkdownContent content={content} />
      </div>
    </div>
  );
}
