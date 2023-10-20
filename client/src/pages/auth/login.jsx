import React from "react";

const Login = () => {
  return <div>login</div>;
};

export default Login;
/*
import React, { useState } from "react";
import { userLogin } from "../../utils/apis";
import "./authcss/logincsss.css";
import { service } from "../_helpers/service";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    pwd: "",
  });
  const [msg, setMsg] = useState("");
  const loginform = (event) => {
    if (user.email != null && user.pwd != null) {
      event.preventDefault();
      const userLogins = async () => {
        try {
          let resp = await userLogin(user);
          service.saveToken(resp.token);
          navigate("/dashboard");
          setMsg("");
        } catch {
          setMsg("Le mot de passe ou l'adresse e-mail est incorrect(e)"); //???
          console.error("error de login ", error);
        }
      };
      userLogins();
    }
  };
  return (
    <>
      <div className="login">
        <div className="login-wrapper">
          <form onSubmit={(event) => loginform(event)}>
            <h2>Connexion</h2>
            <div class="form-group">
              <label for="email">Adresse e-mail</label>
              <input
                onChange={(event) =>
                  setUser({ ...user, email: event.target.value })
                }
                type="text"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="form-group">
              <label for="password">Mot de passe</label>
              <input
                onChange={(event) =>
                  setUser({ ...user, pwd: event.target.value })
                }
                type="password"
                id="password"
                name="password"
                required
              />
            </div>
            <button type="submit">Se connecter</button>
            {msg}
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
*/
