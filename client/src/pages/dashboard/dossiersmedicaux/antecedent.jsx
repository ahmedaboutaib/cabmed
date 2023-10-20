import React, { useEffect, useState } from "react";
import "../dashbordcss/consultation.css";
import {
  faTrash,
  faPlus,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchAntecedent } from "../../../utils/apis3";
import Valider from "../patient/valider";
import AjouterAntecedent from "./anticedant/AjouterAntecedent";
import ModifierAntecedent from "./anticedant/ModifierAntecedent";
import SuppAnecedent from "./anticedant/SuppAnecedent";

const Antecedent = ({}) => {
  const [antecedents, setAntecedents] = useState([]);
  const [formantecedent, setFormAntecedent] = useState(false);
  const changeFormAntecedent = () => {
    setFormAntecedent(!formantecedent);
  };
  const [formantecedentmodifier, setFormAntecedentmodifier] = useState(false);
  const changeFormAntecedentmodifier = () => {
    setFormAntecedentmodifier(!formantecedentmodifier);
  };
  const [formantecedentsupp, setFormAntecedentsupp] = useState(false);
  const changeFormAntecedentsuppr = () => {
    setFormAntecedentsupp(!formantecedentsupp);
  };
  const [antecedent, setAntecedent] = useState({});

  const [id, setId] = useState();
  const CabinetId = useCabinetId();
  const remplirAntecedent = () => {
    setLoading(true);
    const fetchAntecedents = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const PatientId = JSON.parse(localStorage.getItem("patient")).id;
        setId(PatientId);
        const response = await fetchAntecedent(PatientId);
        setAntecedents(response);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("error de selection des antecedent", error);
      }
    };
    fetchAntecedents();
  };

  useEffect(() => {
    remplirAntecedent();
  }, []);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredAntecedent = antecedents.filter((ant) =>
    `${ant.date} ${ant.nom}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Antecedent</h2>
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
                placeholder="Rechercher un antecedent"
              />
            </div>

            <div className="nouveau">
              <button onClick={changeFormAntecedent}>
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
                  <th>nom</th>
                  <th>date</th>
                  <th>traitement</th>
                  <th className="mobileCabMed">description</th>
                  <th colspan="2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAntecedent &&
                  filteredAntecedent.map((items) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{items.nom}</td>
                      <td style={{ textAlign: "center" }}>{items.date}</td>
                      <td style={{ textAlign: "center" }}>
                        {items.traitement}
                      </td>
                      <td className="mobileCabMed">{items.desc}</td>
                      <td style={{ textAlign: "center" }}>
                        <button>
                          <FontAwesomeIcon
                            className="supp"
                            icon={faTrash}
                            onClick={() => {
                              changeFormAntecedentsuppr();
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
                              changeFormAntecedentmodifier();
                              setAntecedent(items);
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
      <AjouterAntecedent
        changeFormAntecedent={changeFormAntecedent}
        formantecedent={formantecedent}
        id={id}
        changeValidForm={changeValidForm}
        remplirAntecedent={remplirAntecedent}
        setLoading={setLoading}
      />
      <ModifierAntecedent
        setAntecedent={setAntecedent}
        antecedent={antecedent}
        changeFormAntecedentmodifier={changeFormAntecedentmodifier}
        formantecedentmodifier={formantecedentmodifier}
        remplirAntecedent={remplirAntecedent}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppAnecedent
        changeFormAntecedentsuppr={changeFormAntecedentsuppr}
        formantecedentsupp={formantecedentsupp}
        remplirAntecedent={remplirAntecedent}
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
export default Antecedent;
