import ManageStudents from "./pages/ManageStudents";
import ManageCourses from "./pages/ManageCourses";
import Home from "./pages/Home";
import SideBar from "./components/Sidebar";
import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [menu, setMenu] = useState("home");
  return (
    <>
      <SideBar menu={menu} setMenu={setMenu} />
      <Header menu={menu}/>

      {menu === "home" ? (
        <Home />
      ) : menu === "students" ? (
        <ManageStudents />
      ) : menu === "courses" ? (
        <ManageCourses />
      ) : (
        <div>No page found</div>
      )}
    </>
  );
}

export default App;
