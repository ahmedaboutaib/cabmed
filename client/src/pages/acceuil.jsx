import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./acceuil.css";
import { Login } from "./_helpers/service";
import {
  faCalendarAlt,
  faChartLine,
  faClock,
  faCogs,
  faFolder,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faYoutube,
  faFacebookF,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Accueil = () => {
  const [links, setLinks] = useState(false);
  const changeLinks = () => {
    setLinks(!links);
  };
  function Connecter() {
    if (Login().roles === "secretaire" || Login().roles === "medecin") {
      return (
        <>
          <Link className="linkjs " to={"/dashboard"}>
            Mon compte
          </Link>
        </>
      );
    } else if (Login().roles === "admin") {
      return (
        <>
          {" "}
          <Link className="linkjs " to={"/admin"}>
            Moncompte
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link className="linkjs " to={"/connexion"}>
            connexion
          </Link>
        </>
      );
    }
  }

  const [styel, setStyle] = useState({});
  /* const handleScroll = (event) => {
    setStyle({ backgroundColor: "#f6f6f6" });
    console.log("Défilement détecté");
  };
*/
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = (event) => {
    const scrollTop =
      event.target.documentElement.scrollTop || event.target.body.scrollTop;
    const threshold = 150;

    if (scrollTop > threshold) {
      setStyle({ backgroundColor: "rgba(0,0,0,0.4)" });
    } else {
      setStyle({});
    }
  };

  const ulRef = useRef(null);
  const ulSidb = useRef(null);
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
      ulSidb.current &&
      !ulSidb.current.contains(e.target)
    ) {
      setLinks(false);
    }
  };

  return (
    <>
      <div className="accueil">
        {/*--header--*/}

        <div onScroll={handleScroll} style={styel} className="header">
          <div className="container">
            <div className="span">
              <span className="span1 logo">Cab</span>
              <span className="span2 logo">Med</span>
            </div>
            <div className="links">
              <span
                ref={ulSidb}
                onClick={() => {
                  changeLinks();
                }}
                className="icons"
              >
                <span></span>
                <span></span>
                <span></span>
              </span>
              {links && (
                <ul ref={ulRef}>
                  <li
                    onClick={() => {
                      changeLinks();
                    }}
                  >
                    <a href="#info">Information</a>
                  </li>
                  <li
                    onClick={() => {
                      changeLinks();
                    }}
                  >
                    <Connecter />
                  </li>

                  <li
                    onClick={() => {
                      changeLinks();
                    }}
                  >
                    <NavLink className="linkdd" to="/inscription">
                      Inscription
                    </NavLink>
                  </li>
                  <li
                    onClick={() => {
                      changeLinks();
                    }}
                  >
                    <a href="#contact">Contact</a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </div>
        {/* Start Landing section */}
        {/*-- Start Landing section --*/}
        <div className="landing">
          <div className="landing_hs">
            <div className="loding_h">
              <div className="intro-text">
                <h1>Bienvenue sur CabMed!</h1>
                <p></p>
                <span>
                  <NavLink className="linkdd" to="/inscription">
                    Inscription
                  </NavLink>
                </span>
              </div>
            </div>
          </div>
        </div>
        {/*-- end Landing section  */}

        <div className="services" id="info">
          <div className="container">
            <h2 className="spcial-heading">Informations</h2>

            <div className="services-content">
              <div className="col">
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faChartLine} />

                  <div className="text">
                    <h3>Performance </h3>
                    <p>
                      CabMed offre une performance optimale pour une gestion
                      efficace de votre cabinet médical.
                    </p>
                  </div>
                </div>
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faClock} />

                  <div className="text">
                    <h3>Disponibilité</h3>
                    <p>
                      Avec CabMed, vous avez accès à une disponibilité 24h/24,
                      7j/7, vous permettant de gérer votre cabinet à tout
                      moment.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faShieldAlt} />

                  <div className="text">
                    <h3>Sécurité</h3>
                    <p>
                      La sécurité est une priorité absolue avec CabMed. Vos
                      données médicales sont protégées grâce à des mesures de
                      sécurité avancées.
                    </p>
                  </div>
                </div>
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faCogs} />

                  <div className="text">
                    <h3>Conviviale</h3>
                    <p>
                      CabMed simplifie la gestion de votre cabinet médical en
                      automatisant les tâches administratives et en offrant une
                      interface conviviale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faCalendarAlt} />

                  <div className="text">
                    <h3>Planifier</h3>
                    <p>
                      Grâce à CabMed, vous pouvez planifier et organiser les
                      rendez-vous de vos patients de manière efficace.
                    </p>
                  </div>
                </div>
                <div className="srv">
                  <FontAwesomeIcon className="i" icon={faFolder} />

                  <div className="text">
                    <h3>Gérer les dossiers médicaux</h3>
                    <p>
                      Avec CabMed, vous pouvez gérer les dossiers médicaux de
                      manière sécurisée et centralisée, accédant facilement aux
                      informations nécessaires.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**end service */}
        <div className="portfolio" id="portfolio">
          <div className="container">
            <div className="portfolio-content">
              <div className="card">
                <img
                  src="https://th.bing.com/th/id/OIP.C9YVxXbRQOta4jo9vdXufwHaE7?w=273&h=183&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt=""
                />
                <div className="info">
                  <h3>Suivi personnalisé des patients</h3>
                  <p>
                    Avec notre application de cabinet médical, vous pouvez
                    suivre et gérer les dossiers de vos patients de manière
                    centralisée. Gardez une trace de leur historique médical,
                    des rendez-vous passés et à venir, et facilitez la
                    communication avec eux. Offrez un suivi personnalisé pour
                    des soins de qualité.
                  </p>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://img2.cgtrader.com/items/1916038/bf6fabaab2/medical-patient-room-3d-model-max-obj-fbx-blend.jpg"
                  alt=""
                />
                <div className="info">
                  <h3>Sécurité et confidentialité des données</h3>
                  <p>
                    La sécurité des données est notre priorité. Notre
                    application de cabinet médical utilise des protocoles
                    avancés de chiffrement et de sauvegarde pour garantir la
                    confidentialité des informations sensibles. Soyez assuré(e)
                    que les données de vos patients sont en sécurité et
                    conformes aux normes de protection des données.
                  </p>
                </div>
              </div>
              <div className="card">
                <img
                  src="https://th.bing.com/th/id/OIP.L7ot2LRxDzSdk6gSGDUVTQHaEa?w=291&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7"
                  alt=""
                />
                <div className="info">
                  <h3>Gestion efficace du paiement et de la facturation</h3>
                  <p>
                    Notre application de cabinet médical offre une solution
                    complète de gestion qui facilite le processus de paiement et
                    de facturation. Simplifiez la gestion financière de votre
                    cabinet en automatisant les transactions, en générant des
                    factures précises et en suivant les paiements des patients.
                    Optimisez votre flux de trésorerie et gagnez du temps pour
                    vous concentrer sur les soins aux patients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/**en service */}

        <div id="contact" className="contact">
          <div className="container">
            <h2 className="spcial-heading">Contact</h2>
            <div className="info">
              <p className="label">Cantacter nous en cas d'erreur :</p>
              <a
                href="mailto:CabMed@gmail.com?subject=contact"
                className="link"
              >
                CabMed@gmail.com
              </a>
              <div className="social">
                Retrouvez-nous sur les réseaux sociaux
                <FontAwesomeIcon className="i" icon={faYoutube} />
                <FontAwesomeIcon className="i" icon={faFacebookF} />
                <FontAwesomeIcon className="i" icon={faTwitter} />
              </div>
            </div>
          </div>
        </div>
        <div className="footerr">
          &copy; 2023 - <span>Cab</span>Med
        </div>
      </div>
    </>
  );
};
export default Accueil;
