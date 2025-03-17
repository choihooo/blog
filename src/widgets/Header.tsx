const Header = () => {
  return (
    <header className="sticky top-0 mx-auto flex h-[60px] w-full max-w-[1200px] items-center justify-between p-4">
      <h1 className="text-2xl font-bold">Howu Run</h1>
      <div className="flex items-center gap-6">
        <div className="cursor-pointer">About</div>
        <div className="cursor-pointer">Portfolio</div>
        <div className="flex items-center justify-center">
          <input
            type="text"
            placeholder="제목 및 태그 검색.."
            className="focus:ring-none w-64 rounded-lg border border-gray-300 p-2 text-base focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
