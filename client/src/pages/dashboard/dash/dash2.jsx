import React, { useEffect, useRef, useState } from "react";
import { Login, logout } from "../../_helpers/service";
import "../dashbordcss/css/lion.css";
import { Helmet } from "react-helmet";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
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
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Dash2 = () => {
  const [isLogo, setLogo] = useState(false);
  const changerLogo = () => {
    setLogo(!isLogo);
  };
  const navStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? "bold" : "normal",
      color: isActive ? "black" : "black",
    };
  }; //className={isLogo ? "logopfar " : ""}
  const apiUrl = import.meta.env.VITE_API_URL;
  const clss = isLogo
    ? "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header closed-sidebar  sidebar-mobile-open "
    : "app-container app-theme-white body-tabs-shadow fixed-sidebar fixed-header ";

  const ulMed = useRef(null);
  const usAh = useRef(null);
  const ulDec = useRef(null);
  const ulDecc = useRef(null);
  const ulDecon = useRef(null);
  const ulDeccon = useRef(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (
      ulMed.current &&
      !ulMed.current.contains(e.target) &&
      usAh.current &&
      !usAh.current.contains(e.target)
    ) {
      setBlog(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsidee);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsidee);
    };
  }, []);

  const handleClickOutsidee = (e) => {
    if (
      ulDec.current &&
      !ulDec.current.contains(e.target) &&
      ulDecc.current &&
      !ulDecc.current.contains(e.target)
    ) {
      setDeconnecter(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsid);

    return () => {
      document.removeEventListener("mousedown", handleClickOutsid);
    };
  }, []);

  const handleClickOutsid = (e) => {
    if (
      ulDecon.current &&
      !ulDecon.current.contains(e.target) &&
      ulDeccon.current &&
      !ulDeccon.current.contains(e.target)
    ) {
      setDeconn(false);
    }
  };
  const [blog, setBlog] = useState(false);
  const changeBlog = () => {
    setBlog(!blog);
  };
  const [deconnecter, setDeconnecter] = useState(false);
  const changeDec = () => {
    setDeconnecter(!deconnecter);
  };
  const [deconn, setDeconn] = useState(false);
  const changeUtilDec = () => {
    setDeconn(!deconn);
  };
  const clsss = blog ? "mobil-cab-med  blog1 cccccc" : "mobil-cab-med  blog";
  const clslog = deconnecter ? "deconnecter" : "sdeconnecter";
  const clslogo = isLogo ? "imag mageLogo" : "imag mageLogo2";
  const nav = useNavigate();
  const OutLog = () => {
    logout();
    return nav("/");
  };
  return (
    <>
      {Login().roles === "secretaire" && (
        <>
          <div className={clss}>
            <div className="app-header header-shadow">
              <div className="app-header__logo  tele ">
                <div>
                  <span className="image">
                    <span className="span1112">
                      {" "}
                      <span className="span11">Cab</span>
                      <span className="span22">Med</span>
                    </span>
                  </span>
                  <span className="imag">
                    <span className="span1112">
                      {" "}
                      <span className="span11">Cab</span>
                      <span className="span22">Med</span>
                    </span>
                  </span>
                </div>
                <div className="header__pane ml-auto imag ">
                  <div>
                    <button
                      type="button"
                      className="hamburger close-sidebar-btn hamburger--elastic "
                      data-className="closed-sidebar"
                      onClick={() => {
                        changerLogo();
                      }}
                    >
                      <span className="hamburger-box ">
                        <span className="hamburger-inner">.</span>
                      </span>
                    </button>
                  </div>
                </div>
                {/*<img
                  class={clslogo}
                  src={apiUrl + Login()?.Cabinet?.logo}
                  alt="#"
                  height={"50px"}
                  width={"50px"}
                />*/}
              </div>

              <div className="app-header__mobile-menu">
                <div>
                  <button
                    type="button"
                    className=""
                    ref={usAh}
                    onClick={changeBlog}
                  >
                    <span className="hamburger-box">
                      <span className="hamburger-inner"></span>
                    </span>
                  </button>
                </div>
              </div>
              <div ref={ulDecc} className="app-header__menu">
                <span
                  onClick={() => {
                    changeDec();
                  }}
                  className="out"
                >
                  <span className="nomUtil">
                    <span>{Login()?.user?.nom}</span>
                    <span> {Login()?.user?.prenom} </span>
                  </span>
                  <span>
                    <FontAwesomeIcon className="Sinouttt" icon={faSignOut} />
                  </span>
                </span>
                <div ref={ulDec} className={clslog}>
                  <div>
                    <button
                      onClick={() => {
                        OutLog();
                      }}
                      type="button"
                    >
                      Se déconnecter
                    </button>
                  </div>
                </div>
              </div>

              <div className="app-header__content">
                {/**rechercher */}
                <div className="app-header-left">
                  <div className="search-wrapper"></div>
                  <ul className="header-menu nav"></ul>
                </div>
                {/*start decon */}{" "}
                <div className="app-header-right">
                  <div className="header-btn-lg pr-0">
                    <div className="widget-content p-0">
                      <div className="widget-content-wrapper">
                        <div className="widget-content-left">
                          <div className="btn-group">
                            <p
                              ref={ulDeccon}
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                              }}
                              onClick={() => {
                                changeUtilDec();
                              }}
                            >
                              {/*}   <img
                                width="42"
                                className="rounded-circle"
                                src=""
                                alt=""
                              />*/}
                              <img
                                width={"50"}
                                className="rounded-circle"
                                src="https://th.bing.com/th?q=Ic%c3%b4ne+Personne&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.3&pid=InlineBlock&mkt=en-XA&cc=MA&setlang=fr&adlt=strict&t=1&mw=247"
                                alt=""
                              />
                              <p
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                  alignContent: "center",
                                }}
                              >
                                {Login()?.user?.nom} {Login()?.user?.prenom}{" "}
                                <span>
                                  {" "}
                                  <span className="online_animation"></span>{" "}
                                  Online{" "}
                                </span>
                              </p>
                              <span className="span-Sinout">
                                {" "}
                                <FontAwesomeIcon
                                  className="Sinoutt"
                                  icon={faSignOut}
                                />
                              </span>
                            </p>

                            <div
                              className={
                                deconn ? "util-deconer" : "util_connecter"
                              }
                              ref={ulDecon}
                            >
                              <div>
                                <button
                                  onClick={() => {
                                    OutLog();
                                  }}
                                  type="button"
                                >
                                  Se déconnecter
                                </button>
                              </div>
                            </div>

                            {/*
                            <div
                              tabindex="-1"
                              role="menu"
                              aria-hidden="true"
                              className="dropdown-menu dropdown-menu-right"
                              style={{ backgroundColor: "brown" }}
                            >
                              <button
                                type="button"
                                tabindex="0"
                                className="dropdown-item"
                                onClick={() => {
                                  OutLog();
                                }}
                              >
                                Déconnecter
                              </button>
                            </div>*/}
                          </div>
                        </div>
                        <div className="widget-content-left  ml-3 header-user-info">
                          <div className="widget-heading"></div>
                          <div className="widget-subheading"></div>
                        </div>
                        <div className="widget-content-right header-user-info ml-3">
                          {" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/** end decon */}
              </div>
            </div>
            {/******************************************************** */}
            <div style={{ position: "relative" }} className="app-main">
              {/*sid par */}
              <div ref={ulMed} className={clsss}>
                <div className="mobi-cab-med  ">
                  <ul className="">
                    <li className="li1  lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="/"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a "
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="yellow_color iconn"
                          icon={faHome}
                        />
                        <span className="mobil-ecrer">Accueil</span>
                      </NavLink>
                    </li>
                    <li className="li2 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="patients"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a "
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="orange_color iconn"
                          icon={faPerson}
                        />

                        <span className="mobil-ecrer">Patient</span>
                      </NavLink>
                    </li>
                    <li className="li3 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="rendezvous"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="dropdown-toggl a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="purple_color2 iconn "
                          appointment
                          icon={faClapperboard}
                        />
                        <span className="mobil-ecrer">Rendez Vous</span>
                      </NavLink>
                    </li>
                    <li className="li4 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="calendrier"
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
                        <span className="mobil-ecrer">Calendrier</span>
                      </NavLink>
                    </li>

                    <li className="li5 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="salledattent"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="purple_color2 iconn"
                          appointment
                          icon={faCalendar}
                        />
                        <span className="mobil-ecrer">Salle D'attent</span>
                      </NavLink>
                    </li>
                    {/**  <li className="li6 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="dossiersmedicaux"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="green_color iconn"
                          appointment
                          icon={faFolder}
                        />
                        <span className="mobil-ecrer">Dossiers Medicaux</span>
                      </NavLink>
                    </li>*/}
                    <li className="li7 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="depenses"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="red_color iconn"
                          appointment
                          icon={faCalculator}
                        />
                        <span className="mobil-ecrer">Dépenses</span>
                      </NavLink>
                    </li>
                    <li className="li8 lisize">
                      <NavLink
                        onClick={() => {
                          setBlog(false);
                        }}
                        style={navStyle}
                        to="paiement"
                        data-toggle="collapse"
                        aria-expanded="false"
                        className="a"
                        activeClassName="active"
                      >
                        <FontAwesomeIcon
                          className="blue2_color iconn "
                          appointment
                          icon={faHospitalSymbol}
                        />
                        <span className="mobil-ecrer">Paiement</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              {/**sid par 222*/}
              {/******************************************************** */}
              <div
                style={{ zIndex: "3" }}
                className="app-sidebar sidebar-shadow"
              >
                <div className="app-header__logo">
                  {/* <div className="">
                    <span className="span1">PHARMA</span>
                    <span className="span2">JAVA</span>
                      </div>*/}
                  <div className="header__pane ml-auto">
                    <div>
                      {/**dddddd */}
                      <button
                        type="button"
                        className="hamburger close-sidebar-btn hamburger--elastic"
                        data-className="closed-sidebar"
                      >
                        <span className="hamburger-box">
                          <span className="hamburger-inner"></span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="app-header__mobile-menu">
                  <div>
                    <button
                      type="button"
                      className="hamburger hamburger--elastic mobile-toggle-nav"
                    >
                      <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                      </span>
                    </button>
                  </div>
                </div>
                <div className="app-header__menu">
                  <span>
                    <button
                      type="button"
                      className="btn-icon btn-icon-only btn btn-primary btn-sm mobile-toggle-header-nav"
                    >
                      <span className="btn-icon-wrapper"></span>
                    </button>
                  </span>
                </div>
                <div className="scrollbar-sidebar">
                  <div className="app-sidebar__inner">
                    <ul className="vertical-nav-menu">
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="/"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="dropdown-toggl a "
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="yellow_color iconn"
                            icon={faHome}
                          />
                          <span className="mobil-ecrer">Accueil</span>
                        </NavLink>
                      </li>
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="patients"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="dropdown-toggl a "
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="orange_color iconn"
                            icon={faPerson}
                          />

                          <span>Patient</span>
                        </NavLink>
                      </li>
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="rendezvous"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="dropdown-toggl a"
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="purple_color2 iconn "
                            appointment
                            icon={faClapperboard}
                          />
                          <span>Rendez Vous</span>
                        </NavLink>
                      </li>
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="calendrier"
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
                          <span>Calendrier</span>
                        </NavLink>
                      </li>
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="salledattent"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="a"
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="purple_color2 iconn"
                            appointment
                            icon={faCalendar}
                          />
                          <span>Salle D'attent</span>
                        </NavLink>
                      </li>
                      {/*<li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="dossiersmedicaux"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="a"
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="green_color iconn"
                            appointment
                            icon={faFolder}
                          />
                          <span>Dossiers Medicaux</span>
                        </NavLink>
                      </li>*/}
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="depenses"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="a"
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="red_color iconn"
                            appointment
                            icon={faCalculator}
                          />
                          <span>Dépenses</span>
                        </NavLink>
                      </li>
                      <li className="app-sidebar__heading lisize">
                        <NavLink
                          style={navStyle}
                          to="paiement"
                          data-toggle="collapse"
                          aria-expanded="false"
                          className="a"
                          activeClassName="active"
                        >
                          <FontAwesomeIcon
                            className="blue2_color iconn"
                            appointment
                            icon={faHospitalSymbol}
                          />
                          <span>Paiement</span>
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/******************************************************** */}
              {/**sid par */}
              <div style={{ zIndex: "2" }} className="app-main__outer">
                <div className="app-main__inner">
                  {/** !--dube table-->
                 
                    <!--fin table-->*/}

                  <Outlet />
                </div>
                <div className="app-wrapper-footer">
                  <div className="footer">
                    &copy; 2023 - <span>Cab</span>Med
                  </div>
                </div>
              </div>
            </div>
            <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
          </div>

          <Helmet>
            <script
              type="text/javascript"
              src="https://demo.dashboardpack.com/architectui-html-free/assets/scripts/main.js"
            />
          </Helmet>
        </>
      )}
    </>
  );
};

export default Dash2;
