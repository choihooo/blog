import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@/components/ui/mode-toggle";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenuAndScrollToTop = () => {
    if (!isMenuOpen) {
      // 메뉴가 닫혀 있을 때만 실행
      window.scrollTo({
        top: 0, // 스크롤을 맨 위로 이동
        behavior: "smooth", // 부드러운 스크롤 효과
      });
    }
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="bg-background sticky top-0 z-10 mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between p-4">
        <h1 className="text-2xl font-bold">
          <Link
            to="/"
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Howu Run
          </Link>
        </h1>
        <div className="flex items-center gap-4">
          <div className="py-2">
            <ModeToggle />
          </div>
          <button onClick={toggleMenuAndScrollToTop} className="p-2 md:hidden">
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
            <Link
              to="/about"
              className="cursor-pointer"
              onClick={toggleMenuAndScrollToTop}
            >
              About
            </Link>
            <Link
              to="/portfolio"
              className="cursor-pointer"
              onClick={toggleMenuAndScrollToTop}
            >
              Portfolio
            </Link>
            <div className="flex items-center justify-center">
              <input
                type="text"
                placeholder="제목 및 태그 검색.."
                className="focus:ring-none border-input w-64 rounded-lg border p-2 text-base focus:outline-none"
              />
            </div>
          </div>
        </div>
      </header>

      <div
        className={`bg-background border-border overflow-hidden transition-[height] duration-300 ease-in-out md:hidden ${isMenuOpen ? "h-[202px] border-t" : "h-0"}`}
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-4 p-4">
          <Link
            to="/about"
            className="hover:bg-muted block rounded-md p-2"
            onClick={toggleMenuAndScrollToTop}
          >
            About
          </Link>
          <Link
            to="/portfolio"
            className="hover:bg-muted block rounded-md p-2"
            onClick={toggleMenuAndScrollToTop}
          >
            Portfolio
          </Link>
          <div className="flex items-center justify-center py-2">
            <input
              type="text"
              placeholder="제목 및 태그 검색.."
              className="border-input text-foreground w-full rounded-lg border p-2 text-base focus:outline-none"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
