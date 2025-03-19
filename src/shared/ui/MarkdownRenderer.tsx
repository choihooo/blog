import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import "prism-themes/themes/prism-ghcolors.css"; // 라이트모드 테마
import "prism-themes/themes/prism-dracula.css"; // 다크모드 테마

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const contentRef = useRef<HTMLDivElement | null>(null); // Markdown content의 ref 추가

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
      {/* Markdown Content */}
      <div ref={contentRef}>
        <ReactMarkdown rehypePlugins={[rehypeRaw, rehypePrism]}>
          {content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default MarkdownRenderer;
