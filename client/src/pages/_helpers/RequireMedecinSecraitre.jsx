import { useLocation, Navigate, Outlet } from "react-router-dom";
import { Login } from "./service";
const RequireMedecinSecraitre = () => {
  return Login()?.roles === "medecin" || Login()?.roles === "secretaire" ? (
    <Outlet />
  ) : (
    <Navigate to="/connexion" state={{ from: location }} replace />
  );
};

export default RequireMedecinSecraitre;
//Login()?.roles === "secretaire"
