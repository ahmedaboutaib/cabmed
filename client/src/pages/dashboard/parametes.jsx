import React, { useEffect, useRef, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./paramitrecss/paramitre.css";
import { Login } from "../_helpers/service";
const Parametres = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "rebeccapurple" : "#333",
    };
  };

  const ulRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setActive(false);
    }
  };
  return (
    <>
      {/* <div className="row column_title">
        <div className="col-md-12">
          <div
            className={
              Login().roles === "medecin" ? "page_title medcin" : "page_title "
            }
          >
            <h2 className="dosserMedP">Parametres</h2>
            <div className="paramitre">
              <nav className="navbar">
                <button className="navbar-toggle" onClick={handleClick}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <ul ref={ulRef} className={active ? "activee" : ""}>
                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="utilisateurs">
                      Utilisateurs
                    </NavLink>
                  </li>
                  <li onClick={() => setActive(false)}>
                    <NavLink
                      style={navStyle}
                      className="aa"
                      to="ajouterutilisateur"
                    >
                      Ajouter Utilisateur
                    </NavLink>
                  </li>
                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="service">
                      Service
                    </NavLink>
                  </li>
                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="cabinet">
                      Cabinet
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
          </div>*/}
      <Outlet />
    </>
  );
};
export default Parametres;
