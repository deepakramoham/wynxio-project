import SideBar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles?.container}>
      <SideBar />
      <Header />
      <Outlet />
    </div>
  );
};

export default Layout;
