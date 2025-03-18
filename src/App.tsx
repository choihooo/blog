import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { ThemeProvider } from "./components/ui/theme-provider";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
