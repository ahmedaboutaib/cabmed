import React, { useEffect, useState } from "react";
import {
  fetchRendezVous,
  fetchRendezVousACTUEL,
  fetchRendezVousMoisACTUEL,
} from "../../../utils/apis3";
import { useCabinetId } from "../../_helpers/Tokin";
import {
  faTrash,
  faPlus,
  faPencilAlt,
  faSearch,
  faFolder,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Rendezvous.css";
import SuppRDV from "./SuppRDV";
import { useNavigate } from "react-router-dom";
import ModifierRendezVous from "./ModifierRendezVous";
import { Login } from "../../_helpers/service";
import Valider from "../patient/valider";
import AjouterRdv from "./AjouterRdv";
import { fetchPatientsIdCab } from "../../../utils/apis";

const RendezVous = () => {
  const CabinetId = useCabinetId();
  const nav = useNavigate();
  const [fromSuppRDV, setFromSuppRDv] = useState(false);
  const changeFormSuppRDV = () => {
    setFromSuppRDv(!fromSuppRDV);
  };
  const [rendezvous, setRendezvous] = useState();
  const [formRv, setFormRv] = useState(false);
  const changeFormRv = () => {
    setFormRv(!formRv);
  };

  const dossier = (Patient) => {
    localStorage.setItem("patient", JSON.stringify(Patient));
    nav("/dashboard/dossiersmedicaux/patient/information/");
  };
  const [formRendezV, setRendezVous] = useState(false);
  const changeFormRendezV = () => {
    setRendezVous(!formRendezV);
  };
  const [listrendezvous, setListRendezvous] = useState([]);
  const [listrendezvousTous, setListRendezvousTous] = useState([]);
  const [listrendezvousToutes, setListRendezvousToutes] = useState([]);

  const remplirRDV = () => {
    setLoading(true);
    if (!CabinetId) {
      return;
    }
    const selectRDV = async () => {
      try {
        const resp = await fetchRendezVous(CabinetId);
        remplirRDVFiltrer(resp);
        setListRendezvousTous(resp);
        setListRendezvousToutes(resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
        // console.log(resp);
      } catch (err) {
        console.error("select  rendez vous", err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    selectRDV();
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const [optionsStatus, setOptionStatus] = useState(1);
  const [optionsRecherccher, setOptionderechercher] = useState(
    "les rendez-vous du jour"
  );
  useEffect(() => {
    remplirRDV();
  }, []);
  const [dateDeb, setDateDeb] = useState();
  const [dateFin, setDateFin] = useState();

  const filtrerdate = (listrendezvousTous) => {
    if (dateDeb && dateFin) {
      if (optionsStatus == 1) {
        const list = listrendezvousTous.filter((rdv) => {
          return (
            rdv.status === "encour" &&
            rdv.dateRDV >= dateDeb &&
            rdv.dateRDV <= dateFin
          );
        });
        setListRendezvous(list);
      } else if (optionsStatus == 2) {
        const list = listrendezvousTous.filter((rdv) => {
          return (
            rdv.status === "confirmer" &&
            rdv.dateRDV >= dateDeb &&
            rdv.dateRDV <= dateFin
          );
        });
        setListRendezvous(list);
      } else if (optionsStatus == 3) {
        const list = listrendezvousTous.filter((rdv) => {
          return (
            rdv.status === "annuler" &&
            rdv.dateRDV >= dateDeb &&
            rdv.dateRDV <= dateFin
          );
        });
        setListRendezvous(list);
      }
    } else if (dateDeb) {
      if (optionsStatus == 1) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "encour" && rdv.dateRDV >= dateDeb;
        });
        setListRendezvous(list);
      } else if (optionsStatus == 2) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "confirmer" && rdv.dateRDV >= dateDeb;
        });
        setListRendezvous(list);
      } else if (optionsStatus == 3) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "annuler" && rdv.dateRDV >= dateDeb;
        });
        setListRendezvous(list);
      }
    } else if (dateFin) {
      if (optionsStatus == 1) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "encour" && rdv.dateRDV <= dateFin;
        });
        setListRendezvous(list);
      } else if (optionsStatus == 2) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "confirmer" && rdv.dateRDV <= dateFin;
        });
        setListRendezvous(list);
      } else if (optionsStatus == 3) {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "annuler" && rdv.dateRDV <= dateFin;
        });
        setListRendezvous(list);
      }
    }
  };

  const remplirRDVFiltrer = (listrendezvousTous) => {
    switch (true) {
      case optionsRecherccher === "tous les rendez-vous" &&
        optionsStatus == 1: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "encour";
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du jour" &&
        optionsStatus == 1: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "encour" && rdv.dateRDV === getCurrentDate();
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du mois" &&
        optionsStatus == 1: {
        const list = listrendezvousTous.filter((rdv) => {
          const rdvDate = new Date(rdv.dateRDV);
          const currentDate = new Date();

          return (
            rdv.status === "encour" &&
            rdvDate.getMonth() === currentDate.getMonth() &&
            rdvDate.getFullYear() === currentDate.getFullYear()
          );
        });

        setListRendezvous(list);
        break;
      }

      case optionsRecherccher === "tous les rendez-vous" &&
        optionsStatus == 2: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "confirmer";
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du jour" &&
        optionsStatus == 2: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "confirmer" && rdv.dateRDV === getCurrentDate();
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du mois" &&
        optionsStatus == 2: {
        const list = listrendezvousTous.filter((rdv) => {
          const rdvDate = new Date(rdv.dateRDV);
          const currentDate = new Date();
          return (
            rdv.status === "confirmer" &&
            rdvDate.getMonth() === currentDate.getMonth() &&
            rdvDate.getFullYear() === currentDate.getFullYear()
          );
        });

        setListRendezvous(list);
        break;
      }

      case optionsRecherccher === "tous les rendez-vous" &&
        optionsStatus == 3: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "annuler";
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du jour" &&
        optionsStatus == 3: {
        const list = listrendezvousTous.filter((rdv) => {
          return rdv.status === "annuler" && rdv.dateRDV === getCurrentDate();
        });

        setListRendezvous(list);
        break;
      }
      case optionsRecherccher === "les rendez-vous du mois" &&
        optionsStatus == 3: {
        const list = listrendezvousTous.filter((rdv) => {
          const rdvDate = new Date(rdv.dateRDV);
          const currentDate = new Date();

          return (
            rdv.status === "annuler" &&
            rdvDate.getMonth() === currentDate.getMonth() &&
            rdvDate.getFullYear() === currentDate.getFullYear()
          );
        });

        setListRendezvous(list);
        break;
      }
    }
  };

  useEffect(() => {
    if (!dateDeb && !dateFin) {
      remplirRDVFiltrer(listrendezvousTous);
    }
    styl();
  }, [
    optionsStatus,
    setOptionStatus,
    optionsRecherccher,
    setOptionderechercher,
  ]);
  useEffect(() => {
    filtrerdate(listrendezvousToutes);
    styl();
  }, [
    dateDeb,
    setDateDeb,
    dateFin,
    setDateFin,
    optionsStatus,
    setOptionStatus,
  ]);
  const [patients, setPatients] = useState([]);
  const remplir = () => {
    const loadPatients = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const data = await fetchPatientsIdCab(CabinetId);
        data?.error ? setPatients([]) : setPatients(data);
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    };
    loadPatients();
  };
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredRendez = listrendezvous.filter((patient) =>
    `${patient?.Patient?.nom} ${patient?.Patient?.prenom} ${patient?.Patient?.tel}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const [stylee, setStylee] = useState({
    styl1: { color: "red" },
    styl2: { color: "black" },
    styl3: { color: "black" },
  });
  const styl = () => {
    if (optionsStatus == 1) {
      setStylee({
        styl1: { color: "darkblue", fontWeight: "bold" },
        styl2: { color: "black" },
        styl3: { color: "black" },
      });
    } else if (optionsStatus == 2) {
      setStylee({
        styl2: { color: "darkblue", fontWeight: "bold" },
        styl1: { color: "black" },
        styl3: { color: "black" },
      });
    } else if (optionsStatus == 3) {
      setStylee({
        ...stylee,
        styl3: { color: "darkblue", fontWeight: "bold" },
        styl2: { color: "black" },
        styl1: { color: "black" },
      });
    }
  };
  return (
    <>
      <div className="row column_title ">
        <div className="col-md-12 ">
          <div
            className={
              Login().roles === "medecin"
                ? "page_title medcin"
                : Login().roles === "secretaire"
                ? "page_title secretair"
                : "page_title "
            }
          >
            <center>
              {" "}
              <h2>Rendez Vous</h2>
              <div className="option">
                <div className="optionchild">
                  {" "}
                  <button
                    style={stylee.styl1}
                    onClick={() => {
                      setOptionStatus(1);
                    }}
                  >
                    en cours{" "}
                  </button>
                </div>
                <div className="optionchild">
                  {" "}
                  <button
                    style={stylee.styl2}
                    onClick={() => {
                      setOptionStatus(2);
                    }}
                  >
                    confirmer
                  </button>
                </div>
                <div className="optionchild">
                  {" "}
                  <button
                    style={stylee.styl3}
                    onClick={() => {
                      setOptionStatus(3);
                    }}
                  >
                    annuler
                  </button>
                </div>
              </div>
            </center>
          </div>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <div className="rendezvous mobileInf">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className="rh"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un patient"
              />
              <select
                value={optionsRecherccher}
                className="select"
                onChange={(e) => {
                  setOptionderechercher(e.target.value);
                }}
              >
                <option value="tous les rendez-vous">
                  tous les rendez-vous
                </option>
                {!dateDeb && !dateFin && (
                  <>
                    <option value="les rendez-vous du jour">
                      {" "}
                      les rendez-vous du jour
                    </option>
                    <option value="les rendez-vous du mois">
                      {" "}
                      les rendez-vous du mois
                    </option>
                  </>
                )}
              </select>
              <div className="rdv">
                {" "}
                <input
                  className="date"
                  type="date"
                  onChange={(e) => {
                    setDateDeb(e.target.value);
                    setOptionderechercher(1);
                  }}
                  placeholder="date début"
                />
                <label htmlFor="">date début</label>
              </div>
              <div className="rdv">
                {" "}
                <input
                  className="date"
                  type="date"
                  onChange={(e) => {
                    setDateFin(e.target.value);
                    setOptionderechercher(1);
                  }}
                  placeholder="date fin"
                />
                <label htmlFor="">date fin</label>
              </div>
            </div>
            <div className="nouveau">
              <button
                onClick={() => {
                  remplir();
                  changeFormRendezV();
                }}
              >
                {" "}
                <FontAwesomeIcon className="nouvwu-icon" icon={faPlus} />{" "}
                Nouveau
              </button>
            </div>
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nom & Prénom</th>
                  <th className="mobileCabMed">Téléphone</th>
                  <th>motif</th>
                  <th>date</th>
                  <th className="mobileCabMed">heure</th>
                  <th>status</th>
                  <th>type </th>
                  <th className="mobileCabMed">details </th>
                  <th colSpan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRendez.map((item) => (
                  <tr key={item.id}>
                    <td onClick={() => {}}>
                      {item?.Patient?.nom + " " + item?.Patient?.prenom}
                    </td>
                    <td className="mobileCabMed" onClick={() => {}}>
                      {item?.Patient?.tel}
                    </td>
                    <td>{item?.motif}</td>
                    <td>{item.dateRDV}</td>
                    <td className="mobileCabMed">{item.heureRDV}</td>
                    <td>{item?.status}</td>
                    <td>{item.type}</td>
                    <td className="mobileCabMed">{item.details}</td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => {
                            changeFormSuppRDV();
                            setRendezvous(item);
                          }}
                          className="supp"
                          icon={faStarHalfStroke}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => {
                            changeFormRv();
                            setRendezvous(item);
                            remplir();
                          }}
                          className="modifier"
                          icon={faPencilAlt}
                        />
                      </button>
                    </td>

                    <td>
                      <button>
                        <FontAwesomeIcon
                          className="modifier"
                          icon={faFolder}
                          onClick={() => {
                            dossier(item.Patient);
                          }}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <SuppRDV
        fromSuppRDV={fromSuppRDV}
        changeFormSuppRDV={changeFormSuppRDV}
        rendezvous={rendezvous}
        remplirRDV={remplirRDV}
      />
      <ModifierRendezVous
        changeFormRv={changeFormRv}
        formRv={formRv}
        rendezvoues={rendezvous}
        setRendvous={setRendezvous}
        remplirRDV={remplirRDV}
        changeValidForm={changeValidForm}
        patients={patients}
        setLoading={setLoading}
      />
      <AjouterRdv
        patients={patients}
        changeFormRendezV={changeFormRendezV}
        formRendezV={formRendezV}
        changeValidForm={changeValidForm}
        remplirRDV={remplirRDV}
        setLoading={setLoading}
      />
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
        loading={loading}
      />
    </>
  );
};
export default RendezVous;
