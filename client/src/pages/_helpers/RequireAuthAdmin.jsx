import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Login } from "./service";
const RequireAuthAdimn = () => {
  const location = useLocation();
  return Login()?.roles === "admin" ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  );
};

export default RequireAuthAdimn;
