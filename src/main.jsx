import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import DashBoard from "./features/dashboard/Dashboard.jsx";
import ManageStudents from "./features/student/ManageStudents.jsx";
import ManageCourses from "./features/courses/ManageCourses.jsx";
import RouteError from "./features/RouteError.jsx";
import Add_Update_Students from "./features/student/Add_Update_Students.jsx";
import SignIn from "./features/user/SignIn.jsx";
import SignUp from "./features/user/SignUp.jsx";
import { Provider } from "react-redux";
import store from "./app/store.jsx";

const router = createBrowserRouter([
  { path: "/", element: <SignIn />, errorElement: <RouteError /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/home", element: <DashBoard /> },
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
  </Provider>,

  // </StrictMode>,
);
