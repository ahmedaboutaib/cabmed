import React, { useState } from "react";
import { fetchPatients, fetchPatientsIdCab } from "../../utils/apis";
import { Link } from "react-router-dom";
import "./dashbordcss/dossiermedicaux.css";

import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../_helpers/Tokin";
import { Login } from "../_helpers/service";
import Valider from "./patient/valider";

const Dossiersmedicaux = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const CabinetId = useCabinetId();
  const remplir = () => {
    setLoading(true);
    const loadPatients = async () => {
      try {
        const data = await fetchPatientsIdCab(CabinetId);
        setPatients(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading patients:", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    loadPatients();
  };

  React.useEffect(() => {
    remplir();
  }, []); //patients, recherche
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter((patient) =>
    `${patient.nom} ${patient.prenom}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="row column_title ">
        <div className="col-md-12 ">
          <div
            className={
              Login().roles === "medecin" ? "page_title medcin" : "page_title "
            }
          >
            <center>
              {" "}
              <center>
                {" "}
                <h2>Dossier Médicaux</h2>
              </center>
            </center>
          </div>
        </div>
      </div>
      <div className="">
        <div className="dossiermMdicaux">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              <input
                className=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un patient"
              />
            </div>
          </div>

          <div className="table">
            <table>
              <thead>
                <tr>
                  <th>Nom & Prénom</th>
                  <th className="mobileCabMed">Email</th>
                  <th>Téléphone</th>
                  <th colSpan="1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((item) => (
                  <tr>
                    <td>{item.nom + " " + item.prenom}</td>

                    <td className="mobileCabMed">{item.email}</td>

                    <td>{item.tel}</td>

                    <td className="td-info-icon">
                      <Link
                        onClick={() => {
                          localStorage.setItem("patient", JSON.stringify(item));
                        }}
                        to="patient/information/"
                      >
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="info-icon"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Valider loading={loading} />
    </>
  );
};
export default Dossiersmedicaux;
