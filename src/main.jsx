import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ManageStudents from "./pages/ManageStudents.jsx";
import ManageCourses from "./pages/ManageCourses.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <Home /> },
      { path: "/students", element: <ManageStudents /> },
      { path: "/courses", element: <ManageCourses /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <AppProvider>
    <RouterProvider router={router} />
  </AppProvider>

  // </StrictMode>,
);
