import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashbordcss/salledattent.css";
import {
  faTrash,
  faPencilAlt,
  faFolder,
  faCheckCircle,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../_helpers/Tokin";
import { fetchSalle, updateSalle } from "../../utils/apis3";
import AjouterAsalle from "./salledattent/ajouterAsalle";
import { fetchPatientsIdCab } from "../../utils/apis";
import SppSalle from "./salledattent/SppSalle";
import ModifierSalle from "./salledattent/ModifierSalle";
import { Login } from "../_helpers/service";
import Valider from "./patient/valider";
import io from "socket.io-client";

const Salledattent = () => {
  const [salles, setSalles] = useState([]);
  const [salle, setSalle] = useState({});
  const CabinetId = useCabinetId();
  const [fromsalle, setFromSalle] = useState(false);
  const changeFormsalle = () => {
    setFromSalle(!fromsalle);
  };
  const [fromsalleMod, setFromSalleMod] = useState(false);
  const changeFormsalleMod = () => {
    setFromSalleMod(!fromsalleMod);
  };

  const [fromSuppSalle, setFromSuppSalle] = useState(false);
  const changeFormSuppSalle = () => {
    setFromSuppSalle(!fromSuppSalle);
  };

  const remplirSalle = () => {
    setLoading(true);
    const fetchSalles = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const resp = await fetchSalle(CabinetId);
        setSalles(resp);
        // console.log("paa", resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("salle", err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchSalles();
  };
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

  const updateSalles = async (salle) => {
    try {
      if (!CabinetId) {
        return;
      }
      const rsp = await updateSalle({ ...salle, status: "terminer" });
      remplirSalle();
    } catch (err) {
      console.error("error de update de salle", err);
    }
  };
  const nav = useNavigate();
  const dossier = (Patient) => {
    localStorage.setItem("patient", JSON.stringify(Patient));
    nav("/dashboard/dossiersmedicaux/patient/information/");
  };

  useEffect(() => {
    remplirSalle();
  }, []);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSalle = salles.filter((patient) =>
    `${patient?.Patient?.nom} ${patient?.Patient?.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

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
              <h2>Salle D'attent</h2>
            </center>
          </div>
        </div>
      </div>
      <div
        style={{ position: "relative" }}
        className={
          Login().roles === "medecin"
            ? "mobileInf medcinee mobileInf "
            : "mobileInf "
        }
      >
        <div className="salle-content">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un patient"
              />
            </div>

            <div className="nouveau">
              <button
                onClick={() => {
                  changeFormsalle();

                  remplir();
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
                  <th>nom & prenom </th>
                  <th>telephone</th>
                  <th className="mobileCabMed">motif</th>
                  <th>date</th>
                  <th>heure d'arriver</th>
                  <th className="mobileCabMed">l'état de santé</th>
                  <th className="mobileCabMed">type</th>
                  <th colSpan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSalle &&
                  filteredSalle.map((items) => (
                    <tr key={items?.id}>
                      <td style={{ textAlign: "center" }}>
                        {items?.Patient?.nom} {items?.Patient?.prenom}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        {items?.Patient?.tel}
                      </td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items?.motif}
                      </td>
                      <td style={{ textAlign: "center" }}>{items?.date}</td>
                      <td style={{ textAlign: "center" }}>{items?.heureDAR}</td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items?.situation}
                      </td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items?.type}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            updateSalles(items);
                          }}
                        >
                          <FontAwesomeIcon
                            className="terminer"
                            icon={faCheckCircle}
                          />
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            changeFormSuppSalle();
                            setSalle(items);
                          }}
                        >
                          <FontAwesomeIcon className="supp" icon={faTrash} />
                        </button>
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            changeFormsalleMod();
                            setSalle(items);
                            remplir();
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faPencilAlt}
                          />
                        </button>
                      </td>
                      <td>
                        <button style={{ color: "blue", fontSize: "20px" }}>
                          <FontAwesomeIcon
                            className="ajouterbt"
                            icon={faFolder}
                            onClick={() => {
                              dossier(items.Patient);
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
      <AjouterAsalle
        fromsalle={fromsalle}
        changeFormsalle={changeFormsalle}
        patients={patients}
        remplirSalle={remplirSalle}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SppSalle
        fromSuppSalle={fromSuppSalle}
        changeFormSuppSalle={changeFormSuppSalle}
        remplirSalle={remplirSalle}
        salle={salle}
      />

      <ModifierSalle
        fromsalleMod={fromsalleMod}
        changeFormsalleMod={changeFormsalleMod}
        patients={patients}
        remplirSalle={remplirSalle}
        salle={salle}
        setSalle={setSalle}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <Valider
        loading={loading}
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
      />
    </>
  );
};

export default Salledattent;
