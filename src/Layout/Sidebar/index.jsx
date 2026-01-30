import { NavLink } from "react-router-dom";
import styles from "../Layout.module.css"

const SideBar = () => {
  return (
    <aside className={styles.sidebar}>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ position: "sticky", top: "0px", minHeight: "100vh" }}
      >
        <NavLink
          to="/dashboard"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Course Master</span>
        </NavLink>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/dashboard"
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
              to="/students"
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
              to="/courses"
              className={({ isActive }) =>
                `nav-link text-white ${isActive ? "active" : ""}`
              }
            >
              Courses
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
