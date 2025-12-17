import { Link } from "react-router-dom";
const SideBar = ({ menu, setMenu }) => {
  return (
    <aside className="sidebar">
      <div
        className="d-flex flex-column flex-shrink-0 p-3 text-bg-dark"
        style={{ position: "sticky", top: "0px", minHeight: "100vh" }}
      >
        <Link
          to="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <span className="fs-4">Sidebar</span>
        </Link>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link
              to="/home"
              className={`nav-link text-white  ${
                menu === "home" ? "active" : ""
              }`}
              aria-current="page"
              onClick={() => setMenu("home")}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/students"
              className={`nav-link text-white ${
                menu === "students" ? "active" : ""
              }`}
              onClick={() => setMenu("students")}
            >
              Students
            </Link>
          </li>
          <li>
            <Link
              to="/courses"
              className={`nav-link text-white ${
                menu === "courses" ? "active" : ""
              }`}
              onClick={() => setMenu("courses")}
            >
              Courses
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
