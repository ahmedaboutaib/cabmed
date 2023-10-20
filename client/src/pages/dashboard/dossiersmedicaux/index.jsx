import React, { useEffect, useRef, useState } from "react";
import "../dashbordcss/indexcss.css";

import { NavLink, Outlet } from "react-router-dom";
import { Login } from "../../_helpers/service";

const Index = () => {
  const [patientindex, setPatientindex] = useState(
    JSON.parse(localStorage.getItem("patient"))
  );

  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "blue" : "#333",
    };
  };

  const ulRef = useRef(null);
  const usAh = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      ulRef.current &&
      !ulRef.current.contains(e.target) &&
      usAh.current &&
      !usAh.current.contains(e.target)
    ) {
      setActive(false);
    }
  };
  return (
    <>
      <div className="row column_title">
        <div className="col-md-12">
          <div
            className={
              Login().roles === "medecin"
                ? "page_title medcin"
                : Login().roles === "secretaire"
                ? "page_title secretair"
                : "page_title "
            }
          >
            <h2 className="dosserMed">Dossier Médicaux</h2>
            <div className="index-dossier mobileInf">
              <center>
                <p className="nomPatient">
                  Patient : {patientindex.nom} {patientindex.prenom}
                </p>
              </center>
              <nav className="navbar">
                <button
                  className="navbar-toggle"
                  ref={usAh}
                  onClick={() => {
                    handleClick();
                  }}
                >
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <ul ref={ulRef} className={active ? "activee" : "inactivee"}>
                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="information">
                      Information
                    </NavLink>
                  </li>
                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="rendezvous">
                      Rendez Vous
                    </NavLink>
                  </li>

                  <li onClick={() => setActive(false)}>
                    <NavLink style={navStyle} className="aa" to="paiement">
                      Paiement
                    </NavLink>
                  </li>
                  {Login().roles === "medecin" && (
                    <>
                      <li onClick={() => setActive(false)}>
                        <NavLink
                          style={navStyle}
                          className="aa"
                          to="consultaion"
                        >
                          Consultaion
                        </NavLink>
                      </li>
                      <li onClick={() => setActive(false)}>
                        <NavLink
                          style={navStyle}
                          className="aa"
                          to="antecedent"
                        >
                          Antecedant
                        </NavLink>
                      </li>
                      <li onClick={() => setActive(false)}>
                        <NavLink
                          style={navStyle}
                          className="aa"
                          to="ordonnance"
                        >
                          Ordonnance
                        </NavLink>
                      </li>
                      <li onClick={() => setActive(false)}>
                        <NavLink
                          style={navStyle}
                          className="aa"
                          to="certificat"
                        >
                          Certifecat
                        </NavLink>
                      </li>
                      <li onClick={() => setActive(false)}>
                        <NavLink style={navStyle} className="aa" to="Test">
                          Test Meddical
                        </NavLink>
                      </li>
                      <li onClick={() => setActive(false)}>
                        <NavLink style={navStyle} className="aa" to="bilan">
                          Bilan
                        </NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Index;
/**
 * 
 * 
 * 
 
   /*
   <div className="nompatient">
            {patientindex.nom} {patientindex.prenom}
          </div>
          <div className="element">
            <div className="information">
              <Link to="information"> information</Link>
            </div>
            <div className="consultation/">
              <Link to="consultaion/">consultation</Link>
            </div>
            <div className="paiement">
              {" "}
              <Link to="paiement/">Paiement</Link>
            </div>
            <div className="ordonnance">
              {" "}
              <Link to="ordonnance/">ordonnance</Link>
            </div>
            <div className="test">
              <Link to="test/">test</Link>
            </div>

            <div className="certificat">
              <Link to="certificat/">certificat</Link>
            </div>
          </div>
 */
