import React, { useEffect, useState } from "react";
import "../dashbordcss/consultation.css";
import {
  faTrash,
  faInfoCircle,
  faPencilAlt,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { fetchOrdonnance, fetchMedicament } from "../../../utils/apis2";
import AjouterOrdonnance from "./ordonnace/ajouterOrdonnance";
import SupprimerOrd from "./ordonnace/supprimerOrd";
import DetailOrd from "./ordonnace/detailOrd";
import { useCabinetId } from "../../_helpers/Tokin";
import Medicament from "./ordonnace/Medicament";
import ModifierOrdonance from "./ordonnace/ModifierOredannce";
import Valider from "../patient/valider";

const Ordonnance = () => {
  const [formOrdonnance, setFormOrdonnance] = useState(false);
  const changeFormOrdonnance = () => {
    setFormOrdonnance(!formOrdonnance);
  };
  const [fromOrdsupp, setFormOrdsupp] = useState(false);
  const changeFormOrd = () => {
    setFormOrdsupp(!fromOrdsupp);
  };
  const CabinetId = useCabinetId();
  const [fromOrdDetail, setFromOrdDetail] = useState(false);
  const changeFormDetail = () => {
    setFromOrdDetail(!fromOrdDetail);
  };
  const [fromOrdMod, setFromOrdMod] = useState(false);
  const changeFormMod = () => {
    setFromOrdMod(!fromOrdMod);
  };
  const [formType, setFormType] = useState(false);
  const changeFormType = () => {
    setFormType(!formType);
  };
  const [ordonnances, setOrdonnances] = useState([]);
  const remplirOrdannance = async () => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }
      const response = await fetchOrdonnance(
        JSON.parse(localStorage.getItem("patient")).id
      );
      setOrdonnances(response);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("error de selection d'ordonnance", error);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const [medicaments, setMedicaments] = useState([]);

  const remplirMedicament = async () => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }
      const response = await fetchMedicament(CabinetId);

      setMedicaments(response);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("error de selection d'ordonnance'", error);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const [detail, setDetail] = useState();
  const [id, setId] = useState();
  const [ord, setOrd] = useState("");
  useEffect(() => {
    remplirOrdannance();
  }, []);
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrds = ordonnances.filter((ord) =>
    `${ord.id} `.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Ordonnance</h2>
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
                placeholder="Rechercher un paiement"
              />
            </div>

            <div className="nouveau">
              <button
                onClick={() => {
                  changeFormOrdonnance();
                  remplirMedicament();
                  setId(JSON.parse(localStorage.getItem("patient")).id);
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
                  {" "}
                  <th>Reference</th>
                  <th>Date</th>
                  <th colspan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrds &&
                  filteredOrds.map((items) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{items.id}</td>
                      <td style={{ textAlign: "center" }}>{items.dateOrd}</td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            changeFormOrd();
                            setId(items.id);
                          }}
                        >
                          <FontAwesomeIcon className="supp" icon={faTrash} />
                        </button>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setDetail(items.Medicaments);
                            changeFormMod();
                            setId(items.id);
                            remplirMedicament();
                            setOrd(items);
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faPencilAlt}
                          />
                        </button>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setDetail(items);
                            changeFormDetail();
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faInfoCircle}
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
      <AjouterOrdonnance
        changeFormOrdonnance={changeFormOrdonnance}
        formOrdonnance={formOrdonnance}
        remplirOrdannance={remplirOrdannance}
        medicaments={medicaments}
        id={id}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SupprimerOrd
        changeFormOrd={changeFormOrd}
        fromOrdsupp={fromOrdsupp}
        remplirOrdannance={remplirOrdannance}
        id={id}
      />
      <DetailOrd
        detais={detail}
        changeFormDetail={changeFormDetail}
        fromOrdDetail={fromOrdDetail}
      />
      <ModifierOrdonance
        detais={detail}
        setDetail={setDetail}
        changeFormMod={changeFormMod}
        fromOrdMod={fromOrdMod}
        remplirOrdannance={remplirOrdannance}
        medicaments={medicaments}
        id={id}
        changeFormType={changeFormType}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />

      <Medicament
        changeFormType={changeFormType}
        formType={formType}
        remplirType={remplirMedicament}
        typee={medicaments}
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
export default Ordonnance;
