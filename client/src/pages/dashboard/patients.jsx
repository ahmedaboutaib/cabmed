import React, { useState } from "react";
import { fetchPatients, fetchPatientsIdCab } from "../../utils/apis";
import { Link, useNavigate } from "react-router-dom";
import "./dashbordcss/patientcss.css";
import {
  faTrash,
  faPlus,
  faPencilAlt,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Ajouter from "./patient/ajouter";
import Ajouterrendezvoues from "./patient/ajouterrendezvouez";
import Supprimer from "./patient/supprimer";
import Modifier from "./patient/modifier";

import useAuth from "../../hooks/useAuth";
import { useCabinetId } from "../_helpers/Tokin";
import AjouterAsalle from "./patient/ajouterAsalleDattent";
import Valider from "./patient/valider";

//----
const Patients = () => {
  const nav = useNavigate();
  const { Login } = useAuth();
  const authAdmin = () => {
    return nav("/dashboard/dossiersmedicaux/patient/information/");
  }; /*
  
  
   return Login()?.roles === "medecin"
      ? nav("/dashboard/dossiersmedicaux/patient/information/")
      : "";
  */

  const [patients, setPatients] = useState([]);
  // pour pop-up create patient
  const [showForm, setShowForm] = useState(false);
  const toggleForm = () => {
    setShowForm(!showForm);
  };
  // pour pop de rendez vous
  const [formRv, setFormRv] = useState(false);
  const changeFormRv = () => {
    setFormRv(!formRv);
  };

  // pour requiper  un patient
  const [patienId, setPatienId] = useState({});
  //pour supp
  const [suppForm, setSuppForm] = useState(false);
  const changeSuppForm = () => {
    setSuppForm(!suppForm);
  };
  //pour modifier
  const [modForm, setModForm] = useState(false);
  const changeModForm = () => {
    setModForm(!modForm);
  };
  const CabinetId = useCabinetId();
  const [modifier, setModifier] = useState({});
  const [fromsalle, setFromSalle] = useState(false);
  const changeFormsalle = () => {
    setFromSalle(!fromsalle);
  };
  const remplir = () => {
    setLoading(true);
    const loadPatients = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const data = await fetchPatientsIdCab(CabinetId);
        //  console.log("resp :  ", data);
        data?.error ? setPatients([]) : setPatients(data);

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
  }, []);
  const [loading, setLoading] = useState(false);

  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [patient, setPatient] = useState({});
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
              Login().roles === "medecin"
                ? "page_title medcin"
                : Login().roles === "secretaire"
                ? "page_title secretair"
                : "page_title admin"
            }
          >
            <center>
              {" "}
              <h2>Patients </h2>
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
        <div className="patient">
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
              <button onClick={toggleForm}>
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
                  <th className="mobileCabMed">Email</th>
                  <th className="mobileCabMed">Adresse</th>
                  <th>Téléphone</th>
                  <th colSpan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((item) => (
                  <tr key={item.id}>
                    <td
                      onClick={() => {
                        authAdmin();
                        localStorage.setItem("patient", JSON.stringify(item));
                      }}
                    >
                      {item.nom + " " + item.prenom}
                    </td>

                    <td
                      className="mobileCabMed"
                      onClick={() => {
                        authAdmin();
                        localStorage.setItem("patient", JSON.stringify(item));
                      }}
                    >
                      {item.email}
                    </td>

                    <td
                      className="mobileCabMed"
                      onClick={() => {
                        authAdmin();
                        localStorage.setItem("patient", JSON.stringify(item));
                      }}
                    >
                      {item.adresse}
                    </td>

                    <td
                      onClick={() => {
                        authAdmin();
                        localStorage.setItem("patient", JSON.stringify(item));
                      }}
                    >
                      {item.tel}
                    </td>

                    <td>
                      <button>
                        <FontAwesomeIcon
                          onClick={() => {
                            changeSuppForm();
                            setPatienId(item);
                          }}
                          className="supp"
                          icon={faTrash}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className="ajouterbt"
                          icon={faPlus}
                          onClick={() => {
                            changeFormRv();
                            setPatienId(item);
                          }}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className="modifier"
                          onClick={() => {
                            changeModForm();
                            setModifier(item);
                          }}
                          icon={faPencilAlt}
                        />
                      </button>
                    </td>
                    <td>
                      <button>
                        <FontAwesomeIcon
                          className="ajouterSalle"
                          icon={faPlusCircle}
                          onClick={() => {
                            changeFormsalle();
                            setPatient(item);
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
      <Ajouter
        showForm={showForm}
        toggleForm={toggleForm}
        remplir={remplir}
        setShowForm={setShowForm}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <Ajouterrendezvoues
        toggleForm={toggleForm}
        changeFormRv={changeFormRv}
        formRv={formRv}
        patienId={patienId}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <Supprimer
        patienId={patienId}
        suppForm={suppForm}
        changeSuppForm={changeSuppForm}
        remplir={remplir}
        setLoading={setLoading}
      />
      <Modifier
        modifier={modifier}
        setModifier={setModifier}
        modForm={modForm}
        changeModForm={changeModForm}
        remplir={remplir}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <AjouterAsalle
        fromsalle={fromsalle}
        patient={patient}
        changeFormsalle={changeFormsalle}
        changeValidForm={changeValidForm}
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
export default Patients;
