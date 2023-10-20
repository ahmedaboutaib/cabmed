import React, { useEffect, useState } from "react";
import "../dashbordcss/consultation.css";
import {
  faTrash,
  faPlus,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchConsultaion } from "../../../utils/apis2";
import AjouterConsultation from "./consultation/ajouterconsultation";
import ModifierConsultation from "./consultation/modifierconsultation";
import SuppConsultation from "./consultation/suppconsultation";
import Valider from "../patient/valider";

const Consultation = ({}) => {
  const [consultations, setConsultations] = useState([]);
  const [formconsultaion, setFormConsultaion] = useState(false);
  const changeFormConsultaion = () => {
    setFormConsultaion(!formconsultaion);
  };
  const [formconsultaionmodifier, setFormConsultaionmodifier] = useState(false);
  const changeFormConsultaionmodifier = () => {
    setFormConsultaionmodifier(!formconsultaionmodifier);
  };
  const [formconsultaionsupp, setFormConsultaionsupp] = useState(false);
  const changeFormConsultaionsuppr = () => {
    setFormConsultaionsupp(!formconsultaionsupp);
  };
  const [consultaion, setConsultation] = useState({});

  const [id, setId] = useState();
  const CabinetId = useCabinetId();

  const remplirConsultation = () => {
    setLoading(true);
    const fetchConsultaions = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const PatientId = JSON.parse(localStorage.getItem("patient")).id;
        setId(PatientId);
        const response = await fetchConsultaion(PatientId);

        setConsultations(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error de selection des consultaion", error);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchConsultaions();
  };

  useEffect(() => {
    remplirConsultation();
  }, []);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredConsultation = consultations.filter((con) =>
    `${con.dateCon} ${con.motif}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Consultaion</h2>
        </center>
      </div>
      <div style={{ position: "relative" }} className="mobileInf">
        <div className="consultation-content">
          <div className="nouveau-rechercher">
            <div className="rechercher">
              {" "}
              <input
                className=""
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un consultaion"
              />
            </div>

            <div className="nouveau">
              <button onClick={changeFormConsultaion}>
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
                  <th>heure</th>
                  <th className="mobileCabMed">description</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultation &&
                  filteredConsultation.map((items) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{items.motif}</td>
                      <td style={{ textAlign: "center" }}>{items.dateCon}</td>
                      <td style={{ textAlign: "center" }}>{items.heureCon}</td>
                      <td className="mobileCabMed">{items.descriptionCon}</td>
                      <td style={{ textAlign: "center" }}>
                        <button>
                          <FontAwesomeIcon
                            className="supp"
                            icon={faTrash}
                            onClick={() => {
                              changeFormConsultaionsuppr();
                              setId(items.id);
                            }}
                          />
                        </button>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button>
                          <FontAwesomeIcon
                            className="modifier"
                            onClick={() => {
                              changeFormConsultaionmodifier();
                              setConsultation(items);
                            }}
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
      <AjouterConsultation
        formconsultaion={formconsultaion}
        changeFormConsultaion={changeFormConsultaion}
        id={id}
        remplirConsultation={remplirConsultation}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <ModifierConsultation
        consultaion={consultaion}
        setConsultation={setConsultation}
        changeFormConsultaionmodifier={changeFormConsultaionmodifier}
        formconsultaionmodifier={formconsultaionmodifier}
        remplirConsultation={remplirConsultation}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppConsultation
        changeFormConsultaionsuppr={changeFormConsultaionsuppr}
        formconsultaionsupp={formconsultaionsupp}
        remplirConsultation={remplirConsultation}
        id={id}
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
export default Consultation;
