import { NavLink } from "react-router-dom";
import styles from "../Layout.module.css";
import { useSelector } from "react-redux";

const SideBar = () => {
  const userState = useSelector((state) => state.userState);
  const { user } = userState || {};
  const userRole = user?.role;
  return (
    <aside className={styles.sidebar}>
      {userRole === 1100 ? (
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
          style={{ position: "sticky", top: "0px", minHeight: "100vh" }}
        >
          <NavLink
            to="/app/admin/dashboard"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">Course Master</span>
          </NavLink>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li className="nav-item">
              <NavLink
                to="/app/admin/dashboard"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
                aria-current="page"
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/app/admin/students"
                // end
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                Students
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/app/admin/courses"
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                Courses
              </NavLink>
            </li>
          </ul>
        </div>
      ) : userRole === 1000 ? (
        <div
          className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
          style={{ position: "sticky", top: "0px", minHeight: "100vh" }}
        >
          <NavLink
            to="/app/user/dashboard"
            className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
          >
            <span className="fs-4">Course Master</span>
          </NavLink>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <NavLink
                to="/app/user/dashboard"
                // end
                className={({ isActive }) =>
                  `nav-link text-white ${isActive ? "active" : ""}`
                }
              >
                User Dashboard
              </NavLink>
            </li>
          </ul>
        </div>
      ) : (
        ""
      )}
    </aside>
  );
};

export default SideBar;
