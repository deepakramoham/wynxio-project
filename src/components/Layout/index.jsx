import SideBar from "../Sidebar";
import Header from "../Header";
import { Outlet } from "react-router-dom";
import { useState } from "react";
const Layout = () => {
  return (
    <>
      <SideBar />
      <Header />
      <Outlet />
    </>
  );
};

export default Layout;
