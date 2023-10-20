import React, { useContext, useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { userLogin } from "../../utils/auth";
import { useNavigate, useLocation } from "react-router-dom";
import "./authcss/logincsss.css";
const Connexion = () => {
  const { saveInfo, Login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/dashboard";

  const log = async () => {
    try {
      const res = await userLogin({ nomUtil: user, email: user, pwd: pwd });
      console.log(user, pwd);
      const token = res?.token;
      const roles = res?.user?.role;
      const User = res?.user;
      const CabinetId = res?.user?.CabinetId;
      const Cabinet = res?.user?.Cabinet;

      saveInfo({ user: User, roles, token, CabinetId, Cabinet });
      setUser("");
      setPwd("");
      if (res?.user?.role === "admin") {
        navigate("/admin");
      } else {
        // navigate(from, { replace: true });
        navigate("/dashboard");
      }
    } catch (error) {
      if (!error?.response) {
        setErrMsg("pas de réponse du serveur");
      } else if (error.response?.status == 400) {
        setErrMsg("Nom d'utilisateur ou mot de passe manquant");
      } else if (error.response?.status == 401) {
        setErrMsg("Non autorisé");
      } else {
        setErrMsg("Échec de la connexion");
      }
      errRef.current.focus();
    }
  };
  //--
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) {
      userRef.current.focus();
    }
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    log();
  };

  return (
    <>
      <div className="login">
        <div className="login2">
          <div className="login-wrapper">
            <form className="form" onSubmit={(event) => handleSubmit(event)}>
              <h2>Connexion</h2>
              <div className="form-group">
                <p
                  style={{ color: "red" }}
                  ref={errRef}
                  className={errMsg ? "errmsg pargCon" : "offscreen"}
                  aria-live="assertive"
                >
                  {errMsg}
                </p>
                <label htmlFor="username"> Nom d'utilisateur / email : </label>
                <input
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password"> Mot de passe : </label>
                <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
                />
              </div>
              <button type="submit">Se connecter</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default Connexion;
