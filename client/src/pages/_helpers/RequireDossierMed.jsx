import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Login } from "./service";
const RequireDossierMed = () => {
  return Login()?.roles === "medecin" ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  );
};

export default RequireDossierMed;
//Login()?.roles === "secretaire"
