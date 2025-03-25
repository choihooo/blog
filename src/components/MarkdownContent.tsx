"use client";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import Image from "next/image";
import "highlight.js/styles/github-dark.css";

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        img: ({ src, alt }) => {
          if (!src) return null;
          return (
            <div className="relative my-4 h-[300px] w-full">
              <Image
                src={src}
                alt={alt || ""}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
} 