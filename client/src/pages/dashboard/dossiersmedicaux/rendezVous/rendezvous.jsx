import React, { useEffect, useState } from "react";

import {
  faPlus,
  faPencilAlt,
  faFolder,
  faStarHalfStroke,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../Rendezvous/Rendezvous.css";

import { fetchRendezVousPaientId } from "../../../../utils/apis3";
import { useCabinetId } from "../../../_helpers/Tokin";
import Ajouterrendezvoues from "../../patient/ajouterrendezvouez";
import Valider from "../../patient/valider";
import SuppRDV from "../../Rendezvous/SuppRDV";
import ModifierRendezVous from "./modifierRendezVous";

const RendezVous = () => {
  const [fromSuppRDV, setFromSuppRDv] = useState(false);
  const changeFormSuppRDV = () => {
    setFromSuppRDv(!fromSuppRDV);
  };

  const [rendezvous, setRendezvous] = useState();
  const CabinetId = useCabinetId();
  const [formRv, setFormRv] = useState(false);
  const changeFormRv = () => {
    setFormRv(!formRv);
  };
  const [formRdv, setFormRdv] = useState(false);
  const changeFormRdv = () => {
    setFormRdv(!formRdv);
  };
  const [listrendezvous, setListRendezvous] = useState([]);
  const [listrendezvousTous, setListRendezvousTous] = useState([]);
  const remplirRDV = () => {
    setLoading(true);
    if (!CabinetId) {
      return;
    }
    const selectRDV = async () => {
      try {
        const resp = await fetchRendezVousPaientId(
          JSON.parse(localStorage.getItem("patient")).id
        );
        setListRendezvous(resp);
        setListRendezvousTous(resp);
        // console.log(resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
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
  const remplirRDVJ = () => {
    const list = listrendezvousTous.filter((rdv) => {
      return rdv.dateRDV === getCurrentDate();
    });
    setListRendezvous(list);
  };
  const remplirRDVMois = () => {
    const list = listrendezvousTous.filter((rdv) => {
      const rdvDate = new Date(rdv.dateRDV);
      const currentDate = new Date();

      return (
        rdvDate.getMonth() === currentDate.getMonth() &&
        rdvDate.getFullYear() === currentDate.getFullYear()
      );
    });

    setListRendezvous(list);
  };
  const [optionsRecherccher, setOptionderechercher] = useState(1);
  useEffect(() => {
    if (optionsRecherccher == 1) {
      remplirRDV();
    } else if (optionsRecherccher == 2) {
      remplirRDVJ();
    } else if (optionsRecherccher == 3) {
      remplirRDVMois();
    }
  }, [optionsRecherccher, setOptionderechercher]);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");
  const filteredRendez = listrendezvous.filter((patient) =>
    `${patient.dateRDV}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Rendez vous</h2>
        </center>
      </div>
      <div style={{ position: "relative" }}>
        <div className="rendezvous mobileInf">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className="rh"
                type="date"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un patient"
              />
              <div className="rdv">
                <input
                  type="radio"
                  name="rd"
                  value="1"
                  className="radio"
                  checked={optionsRecherccher == 1}
                  onChange={(e) => {
                    setOptionderechercher(e.target.value);
                  }}
                />
                <label className="lab" htmlFor="">
                  {" "}
                  tous les rendez vous
                </label>
              </div>
              <div className="rdv">
                <input
                  type="radio"
                  name="rd"
                  value="2"
                  className="radio"
                  onChange={(e) => {
                    setOptionderechercher(e.target.value);
                  }}
                />{" "}
                <label className="lab" htmlFor="">
                  jour
                </label>
              </div>
              <div className="rdv">
                {" "}
                <input
                  type="radio"
                  name="rd"
                  value="3"
                  className="radio"
                  onChange={(e) => {
                    setOptionderechercher(e.target.value);
                  }}
                />{" "}
                <label className="lab" htmlFor="">
                  mois
                </label>
              </div>
            </div>
            <div className="nouveau">
              <button
                onClick={() => {
                  changeFormRv();
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
                  <th>motif</th>
                  <th>date</th>
                  <th className="mobileCabMed">heure</th>
                  <th>status</th>
                  <th>type </th>
                  <th className="mobileCabMed">details </th>
                  <th colSpan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRendez.map((item) => (
                  <tr key={item.id}>
                    <td>{item.motif}</td>
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
                            changeFormRdv();
                            setRendezvous(item);
                          }}
                          className="modifier"
                          icon={faPencilAlt}
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
      <Ajouterrendezvoues
        changeFormRv={changeFormRv}
        formRv={formRv}
        patienId={JSON.parse(localStorage.getItem("patient"))}
        changeValidForm={changeValidForm}
        remplirRDV={remplirRDV}
        setLoading={setLoading}
      />
      <ModifierRendezVous
        changeFormRv={changeFormRdv}
        formRv={formRdv}
        rendezvoues={rendezvous}
        setRendvous={setRendezvous}
        remplirRDV={remplirRDV}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppRDV
        fromSuppRDV={fromSuppRDV}
        changeFormSuppRDV={changeFormSuppRDV}
        rendezvous={rendezvous}
        remplirRDV={remplirRDV}
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
