import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Join from "./pages/Join";
import CreateRoom from "./pages/CreateRoom";
import Editor from "./pages/Editor";
import ErrorPage from "./pages/ErrorPage";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateRoom />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/join",
    element: <Join />,
  },
  {
    path: "/room/:roomId",
    element: <Editor />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
    <Toaster />
  </>
);
