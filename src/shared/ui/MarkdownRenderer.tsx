import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypePrism from "rehype-prism-plus";
import "prism-themes/themes/prism-ghcolors.css"; // ✅ 라이트모드 테마 (GitHub 스타일)
import "prism-themes/themes/prism-dracula.css"; // ✅ 다크모드 테마 (Dracula 스타일)

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

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
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypePrism]}>
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
