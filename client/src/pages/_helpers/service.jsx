import { useLocation, Navigate } from "react-router-dom";
export const saveInfo = (info) => {
  const expirationTime = Date.now() + 80000000;
  localStorage.setItem("user", JSON.stringify({ info, expirationTime }));
};
export const logout = () => {
  localStorage.removeItem("user");
};
export const Login = () => {
  const key = "user";
  const storedValue = localStorage.getItem(key);

  if (storedValue) {
    const { info, expirationTime } = JSON.parse(storedValue);
    if (expirationTime > Date.now()) {
      // La valeur est toujours valide
      //  console.log("tkoen ", info.token);
      return info;
    } else {
      // La valeur a expiré
      localStorage.removeItem(key);
      return "";
    }
  } else {
    return "";
  }
};

export const upInfo = (inf) => {
  const key = "user";
  const storedValue = localStorage.getItem(key);
  const { info, expirationTime } = JSON.parse(storedValue);
  localStorage.setItem("user", JSON.stringify({ info: inf, expirationTime }));
};
