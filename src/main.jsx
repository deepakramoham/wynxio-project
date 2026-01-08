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
import RouteError from "./pages/RouteError.jsx";
import Add_Update_Students from "./pages/Add_Update_Students.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteError />,
    children: [
      { index: true, element: <Home /> },
      { path: "/home", element: <Home /> },
      {
        path: "/students",
        element: <ManageStudents />,
      },
      { path: "/students/add-student", element: <Add_Update_Students /> },
      {
        path: "/students/edit-student",
        element: <Add_Update_Students />,
      },
      { path: "/courses", element: <ManageCourses /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </Provider>

  // </StrictMode>,
);
