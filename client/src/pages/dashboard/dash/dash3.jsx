import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

import {
  faBars,
  faPerson,
  faClapperboard,
  faCalendar,
  faFolder,
  faCalculator,
  faHospitalSymbol,
  faAssistiveListeningSystems,
  faDashboard,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login, logout } from "../../_helpers/service";
import "../dashbordcss/css/dash3.css";
const Dash3 = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const navStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "white" : "rgba(255, 255, 255, 0.9)",
    };
  }; //{isActive ? "active" : ""}
  const apiUrl = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const OutLog = () => {
    logout();
    return nav("");
  };
  const ulSidb = useRef(null);
  const usAh = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidSide);
    };
  }, []);

  const handleClickOutsidSide = (e) => {
    if (
      ulSidb.current &&
      !ulSidb.current.contains(e.target) &&
      usAh.current &&
      !usAh.current.contains(e.target)
    ) {
      setActive(false);
    }
  };
  return (
    <>
      {Login().roles === "admin" && (
        <>
          <div className="secretaire">
            <div className="poss">
              <nav ref={usAh} className="navbar">
                <button className="navbar-toggle" onClick={handleClick}>
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
                <div className="navCab">
                  <span className="logsecr">
                    {" "}
                    <span className="">
                      <span className="span1112 spansec">
                        {" "}
                        <span className="span11">Cab</span>
                        <span className="span22">Med</span>
                      </span>
                    </span>
                  </span>
                  <ul ref={ulSidb} className={active ? "activee" : ""}>
                    {" "}
                    <li>
                      <NavLink
                        onClick={handleClick}
                        to="utilisateurs"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a "
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="yellow_color iconn"
                          icon={faDashboard}
                        />
                        <span>Utilsateurs</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleClick}
                        style={navStyle}
                        to="ajouterutilisateur"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a "
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          onClick={handleClick}
                          className="orange_color iconn"
                          icon={faPerson}
                        />

                        <span>Ajouter Utilisateur</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={handleClick}
                        style={navStyle}
                        to="service"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="purple_color2 iconn"
                          appointment
                          icon={faClapperboard}
                        />
                        <span>Service </span>
                      </NavLink>
                    </li>
                    <li className="active">
                      <NavLink
                        onClick={handleClick}
                        style={navStyle}
                        to="cabinet"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="blue1_color iconn"
                          appointment
                          icon={faCalendar}
                        />
                        <span> Cabinet</span>
                      </NavLink>
                    </li>
                    <li>
                      <p className="aaa">
                        <img
                          className="img-responsive rounded-circle imgin  user-info"
                          width={"40px"}
                          src="https://th.bing.com/th?q=Ic%c3%b4ne+Personne&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-XA&cc=MA&setlang=fr&adlt=strict&t=1&mw=247"
                          alt="#"
                        />{" "}
                        <span className="user-info" style={{ color: "grey" }}>
                          ...
                        </span>
                        <span>
                          <span
                            className="user-info"
                            style={{ color: "white" }}
                          >
                            {Login()?.user?.nom} {Login()?.user?.prenom}{" "}
                            <p style={{ color: "white" }}>
                              <span className="online_animation "></span>{" "}
                              <span style={{ color: "white" }}>Online</span>
                            </p>
                          </span>
                          <FontAwesomeIcon
                            className="blue2_color "
                            appointment
                            icon={faSignOut}
                            onClick={OutLog}
                          />
                          <span
                            onClick={OutLog}
                            style={{ color: "white" }}
                            className="aaa iconn"
                          >
                            Se déconnecter
                          </span>
                        </span>
                      </p>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
            <div className="conte">
              <Outlet />
            </div>
            <div className="app-wrapper-footer">
              <div className="footer">
                &copy; 2023 - <span>Cab</span>Med
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Dash3;
