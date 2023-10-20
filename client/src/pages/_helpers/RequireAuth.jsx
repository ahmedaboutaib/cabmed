import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Login } from "./service";
const RequireAuth = () => {
  const location = useLocation();
  return Login()?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  );
};

export default RequireAuth;
