import SideBar from "./Sidebar";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useState, useRef } from "react";

const Layout = () => {
  const sidebarRef = useRef(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebar = ({ target }) => {
    if (!sidebarOpen || !sidebarRef || sidebarRef.current.contains(target))
      return;
    setSidebarOpen(!sidebarOpen);
  };

  // const handleDropdownMenu = ({ target }) => {};

  const handleClick = (e) => {
    handleSidebar(e);
    // handleDropdownMenu(e);
  };

  return (
    <div className={styles?.container} onClick={handleClick}>
      <SideBar sidebarOpen={sidebarOpen} sidebarRef={sidebarRef} />
      <Header setSidebarOpen={setSidebarOpen} />
      <main className={styles?.main}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
