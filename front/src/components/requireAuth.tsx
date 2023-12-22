import { Navigate, Outlet, useLocation } from "react-router-dom";

export const RequireAuth = () => {
  const token = localStorage.getItem("user");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ form: location }} replace />
  );
};
