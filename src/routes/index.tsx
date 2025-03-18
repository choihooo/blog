import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import { Layout } from "@/layouts/Layout";
import PostDetail from "@/pages/PostDetail";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/post/:id",
        element: <PostDetail />,
      },
    ],
  },
]);
