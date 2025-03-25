"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // ✅ 검색어 상태 추가
  const router = useRouter(); // ✅ Next.js의 useRouter 사용

  const toggleMenuAndScrollToTop = () => {
    if (!isMenuOpen) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setMenuOpen(!isMenuOpen);
  };

  // ✅ 엔터 키 입력 시 검색 페이지로 이동
  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      setTimeout(() => {
        router.push(`/search/${encodeURIComponent(searchTerm.trim())}`);
        setSearchTerm(""); // ✅ 검색 후 입력값 초기화
      }, 0);
    }
  };

  return (
    <>
      <header className="bg-background sticky top-0 z-10 mx-auto flex h-[60px] w-full items-center justify-center p-4">
        <div className="max-w-[1200px] w-full  flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            <Link href="/" className="cursor-pointer">
              Howu Run
            </Link>
          </h1>
          <div className="flex items-center gap-4">
            <div className="py-2">
              <ModeToggle />
            </div>
            <button
              onClick={toggleMenuAndScrollToTop}
              className="p-2 md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <div className="hidden items-center gap-6 md:flex">
              <Link href="/series" className="cursor-pointer">
                Series
              </Link>
              <a
                href="https://howu.notion.site/"
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer"
              >
                Portfolio
              </a>
              <div className="flex items-center justify-center">
                <input
                  type="text"
                  placeholder="제목 및 태그 검색.."
                  className="focus:ring-none border-ring w-64 rounded-lg border p-2 text-base focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div
        className={`bg-background border-border overflow-hidden transition-[height] duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "h-[202px] border-t" : "h-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
          <Link href="/series" className="hover:bg-muted block rounded-md p-2">
            Series
          </Link>
          <a
            href="https://howu.notion.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:bg-muted block rounded-md p-2"
          >
            Portfolio
          </a>
          <div className="flex items-center justify-center py-2">
            <input
              type="text"
              placeholder="제목 및 태그 검색.."
              className="border-ring text-foreground w-full rounded-lg border p-2 text-base focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
