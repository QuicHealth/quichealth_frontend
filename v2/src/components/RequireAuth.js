import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const RequireAuth = () => {
  let user = JSON.parse(localStorage?.getItem("user")) || "";

  const location = useLocation();

  const expertRoute = location?.pathname?.includes("expert");
  return user ? (
    <Outlet />
  ) : expertRoute ? (
    <Navigate to="/expert-signin" state={{ from: location }} replace />
  ) : (
    <Navigate to="/signin" state={{ from: location }} replace />
  );
};

export default RequireAuth;
