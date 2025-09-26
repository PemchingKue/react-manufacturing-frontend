import NavBar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <NavBar />
      <SideBar />
      <Outlet />
    </>
  );
}
