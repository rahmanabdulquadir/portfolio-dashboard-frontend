import App from "@/App";
import Blogs from "@/pages/Blogs";
import Projects from "@/pages/Projects";
import Skills from "@/pages/Skills";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/skills",
        element: <Skills />,
      },
    ],
  },
]);

export default router