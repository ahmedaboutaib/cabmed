import { createContext, useState } from "react";
import { saveInfo, logout, Login } from "../pages/_helpers/service";
const AuthContext = createContext({});
export const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{ saveInfo, logout, Login }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
