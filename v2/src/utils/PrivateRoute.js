import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { SidebarCollapseContext } from "../context/SidebarCollapseContext";

function PrivateRoute() {
  const { userData } = useContext(SidebarCollapseContext);
  console.log(userData, "userData");
  const auth = userData?.auth;
  const token = localStorage?.getItem("token");

//   return token ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;
