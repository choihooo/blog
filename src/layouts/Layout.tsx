import { Header } from "@/widgets";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header/>
      <main className="max-w-[1200px] mx-auto w-full px-6 flex-1">
        <Outlet />
      </main>
    </div>
  );
};
