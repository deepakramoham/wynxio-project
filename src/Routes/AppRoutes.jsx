import { lazy } from "react";
import SessionOut from "../features/pages/SessionOut.jsx";
import Unauthorized from "../features/pages/Unauthorized.jsx";
import RequiredAuth from "../components/Authorization/RequiredAuth.jsx";
import { createBrowserRouter } from "react-router-dom";
const ManageStudents = lazy(
  () => import("../features/student/ManageStudents.jsx"),
);
//import ManageStudents from "./features/student/ManageStudents.jsx";
import ManageCourses from "../features/courses/ManageCourses.jsx";
import RouteError from "../features/pages/RouteError.jsx";
import Add_Update_Students from "../features/student/Add_Update_Students.jsx";
import SignIn from "../features/user/SignIn.jsx";
import SignUp from "../features/user/SignUp.jsx";
import DashBoard from "../features/dashboard/Dashboard.jsx";
import App from "../App.jsx";

export const router = createBrowserRouter([
  { path: "/", element: <SignIn />, errorElement: <RouteError /> },
  { path: "/sign-in", element: <SignIn /> },
  { path: "/sign-up", element: <SignUp /> },
  {
    path: "/session-expired",
    element: <SessionOut />,
  },
  {
    path: "/unauthorized",
    element: <Unauthorized />,
  },
  {
    path: "/app",
    element: <App />,
    children: [
      {
        path: "admin",
        element: <RequiredAuth allowedRole={1100} />,
        children: [
          { path: "dashboard", element: <DashBoard /> },
          {
            path: "students",
            element: <ManageStudents />,
          },
          { path: "students/add-student", element: <Add_Update_Students /> },
          {
            path: "students/edit-student",
            element: <Add_Update_Students />,
          },
          { path: "courses", element: <ManageCourses /> },
        ],
      },
      {
        path: "user",
        element: <RequiredAuth allowedRole={1000} />,
        children: [{ path: "dashboard", element: <p>User Dashboard</p> }],
      },
    ],
  },
]);
