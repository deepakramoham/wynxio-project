import styles from "../Layout.module.css";
import { FaUserCircle } from "react-icons/fa";
import { useState } from "react";
import DropDownMenu from "./DropdownMenu";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = ({ setSidebarOpen }) => {
  const [dropDown, setDropdown] = useState(false);
  return (
    <header className={styles.header}>
      <nav className="navbar bg-body-tertiary" style={{ minHeight: "3rem" }}>
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "end",
            paddingRight: "1.5em",
          }}
        >
          <div className={styles["hamburger-container"]}>
            <GiHamburgerMenu
              style={{ fontSize: "3rem" }}
              onClick={() => setSidebarOpen(true)}
            />
          </div>

          <div>
            <FaUserCircle
              style={{ fontSize: "3rem", cursor: "pointer" }}
              onClick={() => setDropdown(!dropDown)}
            />
          </div>
        </div>
      </nav>

      {dropDown && <DropDownMenu />}
    </header>
  );
};

export default Header;
