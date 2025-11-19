import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { pages } from "@/pages/index.ts";
import "./index.css";
import App from "./App.tsx";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>404 Not Found</div>,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/form",
    element: <pages.Form />,
    children: [
      {
        path: "login",
        element: <pages.Login />,
      },
      {
        path: "register",
        element: <pages.Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <pages.Dashboard />,
    children: [
      {
        path: "meetings",
        element: <pages.MeetingRooms />,
      },
      {
        path: "bookings",
        element: <pages.Bookings />,
      },
    ],
  }
]);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root container not found");
}
const root = createRoot(container);

root.render(<RouterProvider router={router} />);
