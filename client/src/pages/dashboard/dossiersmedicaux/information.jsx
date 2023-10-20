import React, { useEffect, useState } from "react";
import "../dashbordcss/information.css";
import { fetchExamenPhysique } from "../../../utils/apis2";
import AjouterExamenPhysique from "./examenphysique/ajouterExamenphysique";
import ModifierExamenPhysique from "./examenphysique/modifierexamenphusique";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchOnePatient } from "../../../utils/apis";
import Modifier from "../patient/modifier";
import Valider from "../patient/valider";
const Information = () => {
  // pour pop-up de l'ajou
  const [formEmPh, SetFormEmPh] = useState(false);
  const changeFormEmPh = () => {
    SetFormEmPh(!formEmPh);
  };
  //
  const [formEmPhmodifier, SetFormEmPhmodifer] = useState(false);
  const changeFormEmPhmodifier = () => {
    SetFormEmPhmodifer(!formEmPhmodifier);
  };
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [patient, setPatient] = useState({});
  const [patientExPh, setPatientExPh] = useState({
    poids: "",
    taille: "",
    dateExPh: "",
    temperature: "",
    pouls: "",
    pression_arterielle: "",
    clycemine: "",
    notes: "",
    PatientId: "",
  });
  const CabinetId = useCabinetId();

  const remplireExPH = () => {
    setLoading(true);
    const examenphysique = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const data = await fetchExamenPhysique(
          JSON.parse(localStorage.getItem("patient")).id
        );

        setPatientExPh(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error Examen Physique ", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    examenphysique();
  };
  const [modForm, setModForm] = useState(false);
  const changeModForm = () => {
    setModForm(!modForm);
  };
  const remplirPatient = (id) => {
    //setLoading(true);
    const fetchOnepatients = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const data = await fetchOnePatient(
          JSON.parse(localStorage.getItem("patient")).id
        );

        setPatient(data);
      } catch (error) {
        console.error("error Examen Physique ", error);
      }
    };
    fetchOnepatients();
  };

  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  useEffect(() => {
    const patientStore = JSON.parse(localStorage.getItem("patient"));

    if (patientStore != null) {
      remplirPatient(patientStore);
      remplireExPH();
    }
  }, []);
  return (
    <>
      <div className="mobileInf">
        <div className="information-pat">
          <div className="information-contient">
            <div className="info">
              <p className="titre">les infomations</p>
              <p className="info-parg">
                <span className="ent"> Nom: </span>
                <span>{patient.nom}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Prenom:</span>
                <span>{patient.prenom}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Reference Dossier Médicaux :</span>
                <span>{patient.referenceDossier}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Date_Naissance:</span>
                <span>{patient.dateNaissance}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Age:</span>
                <span>{calculateAge(patient.dateNaissance) || ""}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Sexe:</span>
                <span>{patient.genre}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Groupe Sanguin:</span>
                <span>{patient.groupeSanguin}</span>
              </p>

              <p className="info-parg">
                <span className="ent"> Email:</span>{" "}
                <span>{patient.email}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Némro Telephone 1:</span>{" "}
                <span>{patient.tel}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Némro Telephone 2:</span>
                <span>{patient.tel2}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Situation Familiale:</span>
                <span>{patient.situationFamiliale}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Profession:</span>
                <span>{patient.profession}</span>
              </p>
              <p className="info-parg">
                <span className="ent"> Adresse: </span>
                <span>{patient.adresse}</span>
              </p>
              <div className="div-modifier">
                <button onClick={changeModForm} className="modifier">
                  Modifier
                </button>
              </div>
            </div>
            <div className="examen">
              <p className="titre">Examen Physique</p>
              <p className="exam-parg">
                <span className="attiribute">poids:(kg)</span>{" "}
                <span className="valuer">{patientExPh.poids}</span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">temperature:(C)</span>{" "}
                <span className="valuer">{patientExPh.temperature}</span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">taille:(Cm)</span>{" "}
                <span className="valuer">{patientExPh.taille}</span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">pouls:(/1min)</span>{" "}
                <span className="valuer">{patientExPh.pouls}</span>
              </p>

              <p className="exam-parg">
                <span className="attiribute">pression arterielle:()</span>{" "}
                <span className="valuer">
                  {patientExPh.pression_arterielle}
                </span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">cylcemine:(g/l)</span>{" "}
                <span className="valuer">{patientExPh.clycemine}</span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">date:</span>{" "}
                <span className="valuer">{patientExPh.dateExPh}</span>
              </p>
              <p className="exam-parg">
                <span className="attiribute">notes:</span>{" "}
                <span className="valuer">{patientExPh.notes}</span>
              </p>
              <div className="div-modifier">
                {patientExPh.id == null && (
                  <button onClick={() => changeFormEmPh()} className="ajouter">
                    ajouter
                  </button>
                )}
                {patientExPh.id && (
                  <button
                    onClick={() => changeFormEmPhmodifier()}
                    className="modifier"
                  >
                    modifier
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <AjouterExamenPhysique
        formEmPh={formEmPh}
        changeFormEmPh={changeFormEmPh}
        remplireExPH={remplireExPH}
        id={patient.id}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <ModifierExamenPhysique
        patientExPh={patientExPh}
        remplireExPH={remplireExPH}
        formEmPhmodifier={formEmPhmodifier}
        changeFormEmPhmodifier={changeFormEmPhmodifier}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <Modifier
        modifier={patient}
        setModifier={setPatient}
        modForm={modForm}
        changeModForm={changeModForm}
        remplir={remplirPatient}
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
export default Information;
