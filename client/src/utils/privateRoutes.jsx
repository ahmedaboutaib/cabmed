import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  let auth = { token: true };

  return auth.token ? <Outlet /> : <Navigate to="connexion" />;
};

export default PrivateRoutes;
