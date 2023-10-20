import { useNavigate, useLocation } from "react-router-dom";
import { Login } from "./service";

export function useCabinetId() {
  const navigate = useNavigate();
  const location = useLocation();
  const CabinetId = Login()?.CabinetId;
  const tokn = Login()?.token;

  if (!CabinetId || !tokn) {
    navigate("/connexion", { state: { from: location }, replace: true });
    return null;
  }

  return CabinetId;
}
