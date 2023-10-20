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
import "../dashbordcss/css/responsive.css";
import "../dashbordcss/css/style.css";
import { Login, logout } from "../../_helpers/service";

const Dash1 = () => {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(!active);
  };

  const [isActive, setIsActive] = useState(false);
  const [islogoo, setIslogoo] = useState(false);
  const changeActive = () => {
    setIslogoo(!islogoo);
    setIsActive(!isActive);
  };

  const navStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "white" : "rgba(255, 255, 255, 0.9)",
    };
  }; //{isActive ? "active" : ""}
  const apiUrl = import.meta.env.VITE_API_URL;
  const nav = useNavigate();
  const [profilVisible, setProfilVisible] = useState(false);
  const OutLog = () => {
    logout();
    return nav("");
  };
  const [stpro, setstpro] = useState({ display: "none" });
  const changeProfil = () => {
    setProfilVisible(!profilVisible);
    setstpro({ display: "block" });
  };
  const ulRef = useRef(null);
  const ulSidb = useRef(null);
  const usAh = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (ulRef.current && !ulRef.current.contains(e.target)) {
      setstpro({ display: "none" });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidSidnr);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidSidnr);
    };
  }, []);

  const handleClickOutsidSidnr = (e) => {
    if (
      ulSidb.current &&
      !ulSidb.current.contains(e.target) &&
      usAh.current &&
      !usAh.current.contains(e.target)
    ) {
      changeActivee();
    }
  };

  //isActive ? `active  ${cls}` : "inactive"
  /*useEffect(() => {
    if (cls) {
      const timer = setTimeout(() => {
        
      }, 1000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [cls]);*/

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const changeActivee = () => {
    if (windowWidth < 1200) {
      setIsActive(false);
    }
  };
  return (
    <>
      {Login().roles === "medecin" && (
        <div className="dashboard dashboard_1">
          <div className="full_container">
            <div className="inner_container">
              {/*   <!-- Sidebar  --> */}
              <nav
                ref={ulSidb}
                id="sidebar"
                className={isActive ? `active` : "inactive"}
              >
                <div className="sidebar_blog_1">
                  <div className="sidebar-header">
                    <div className="logo_section ">
                      <p className="a">
                        <span
                          style={{ backgroundColor: "#333" }}
                          className="img-responsive img-responsivee "
                        >
                          <span className="spanAdmin">
                            {" "}
                            <span className="span11">Cab</span>
                            <span className="span22">Med</span>
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="sidebar_user_info">
                    <div className="icon_setting"></div>
                    <div className="user_profle_side ">
                      <div className="user_img inlogoSel">
                        <img
                          className="img-responsive"
                          src="https://th.bing.com/th?q=Ic%c3%b4ne+Personne&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-XA&cc=MA&setlang=fr&adlt=strict&t=1&mw=247"
                          alt="#"
                        />
                      </div>

                      <div className="user_info ">
                        <h6>
                          {Login()?.user?.nom} {Login()?.user?.prenom}{" "}
                        </h6>
                        <p>
                          <span className="online_animation"></span> Online
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="sidebar_blog_2">
                  {/**<h4 style={{ backgroundColor: "" }}>General </h4> */}

                  <ul className="list-unstyled components">
                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        to="/dashboard"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a"
                      >
                        <FontAwesomeIcon
                          className="yellow_color iconn"
                          icon={faDashboard}
                        />
                        <span>Dashboard</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="patients"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a"
                      >
                        <FontAwesomeIcon
                          className="orange_color iconn"
                          icon={faPerson}
                        />

                        <span>Patient</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="rendezvous"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a"
                      >
                        <FontAwesomeIcon
                          className="purple_color2 iconn"
                          icon={faClapperboard}
                        />
                        <span>Rendez Vous</span>
                      </NavLink>
                    </li>
                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="calendrier"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="blue1_color iconn"
                          icon={faCalendar}
                        />
                        <span>Calendrier</span>
                      </NavLink>
                    </li>
                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="salledattent"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="purple_color2 iconn"
                          icon={faCalendar}
                        />
                        <span>Salle D'attent</span>
                      </NavLink>
                    </li>

                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="dossiersmedicaux"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="green_color iconn"
                          icon={faFolder}
                        />
                        <span>Dossiers Medicaux</span>
                      </NavLink>
                    </li>

                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="depenses"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="red_color iconn"
                          icon={faCalculator}
                        />
                        <span>Dépenses</span>
                      </NavLink>
                    </li>

                    <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="paiement"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="blue2_color iconn"
                          icon={faHospitalSymbol}
                        />
                        <span>Paiement</span>
                      </NavLink>
                    </li>

                    {/*  <li className="active">
                      <NavLink
                        onClick={changeActivee}
                        style={navStyle}
                        to="parametres/utilisateurs"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                      >
                        <FontAwesomeIcon
                          className="yellow_color iconn"
                          icon={faAssistiveListeningSystems}
                        />
                        <span>Parametres </span>
                      </NavLink>
</li>*/}
                  </ul>
                </div>
              </nav>
              {/*
           <!-- end sidebar -->
          */}

              <div className={isActive ? "" : "incontent"} id="content">
                {/*   <!-- topbar -->*/}

                <div className="topbar">
                  <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="full">
                      <button
                        ref={usAh}
                        type="button"
                        id="sidebarCollapse"
                        className="sidebar_toggle"
                        onClick={() => {
                          changeActive();
                        }}
                      >
                        <FontAwesomeIcon
                          style={{ color: "#ff4748", fontSize: "30px" }}
                          icon={faBars}
                        />
                      </button>

                      <div
                        className={
                          isActive ? "logo_section logoActive" : "logo_section "
                        }
                      >
                        <span className="img-responsive img-responsivee ">
                          <span className="spanAdmin">
                            <span className="span11">Cab</span>
                            <span className="span22">Med</span>
                          </span>
                        </span>
                      </div>

                      <div className="right_topbar proff">
                        <div className="icon_info">
                          <ul className="user_profile_dd">
                            <li>
                              <p
                                className="dropdown-toggl a  paragr"
                                data-toggle="dropdown"
                                onClick={() => {
                                  changeProfil();
                                }}
                                style={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                }}
                              >
                                <img
                                  className="img-responsive rounded-circle  profin-in"
                                  src="https://th.bing.com/th?q=Ic%c3%b4ne+Personne&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-XA&cc=MA&setlang=fr&adlt=strict&t=1&mw=247"
                                  alt="#"
                                />
                                <span
                                  style={{ color: "#FFFFFF" }}
                                  className="name_user"
                                >
                                  {Login()?.user?.nom} {Login()?.user?.prenom}{" "}
                                  <FontAwesomeIcon
                                    className="Sinout"
                                    icon={faSignOut}
                                  />{" "}
                                </span>
                              </p>
                              <div
                                ref={ulRef}
                                style={stpro}
                                className={
                                  profilVisible
                                    ? "dropdown-menu"
                                    : "dropdown-menu ahProfile"
                                }
                              >
                                <p
                                  className="dropdown-item a"
                                  onClick={() => {
                                    OutLog();
                                  }}
                                >
                                  Se déconnecter
                                </p>
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </nav>
                </div>

                {/* <!-- end topbar -->*/}

                {/* Commentaire en React */}
                <div className="midde_cont">
                  <div className="container-fluid">
                    {/* Commentaire pour la ligne de titre */}

                    {/* Commentaire pour la section rouge */}

                    <Outlet />
                    {/* Commentaire pour la section rouge */}
                    {/* Commentaire pour le footer */}
                    <div className="container-fluid"></div>
                  </div>
                  {/* Commentaire pour la fin du contenu du dashboard */}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dash1;
