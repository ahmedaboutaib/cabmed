import React, { useEffect, useState } from "react";
import "../dashbordcss/consultation.css";
import {
  faTrash,
  faInfoCircle,
  faPencilAlt,
  faPrint,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { fetchCertaficat } from "../../../utils/apis2";
import AjouterCertificat from "./certificat/ajouterCertificat";
import SuppCertificat from "./certificat/suppCertificat";
import ModifierCertificat from "./certificat/modifierCertificat";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchTypeCertificat } from "../../../utils/apis3";
import ImprimerCertificat from "../imprimer/ImprimerCertificat";
import { Login } from "../../_helpers/service";
import Valider from "../patient/valider";

const Certificat = () => {
  const [certificat, setCertificat] = useState({
    dateDub: null,
    dateFin: null,
    type: null,
    description: null,
    raison: null,
    PatientId: null,
    TypeCertificatId: null,
  });
  const [certificats, setCertificats] = useState([]);

  const [formcertificat, setFormcertificat] = useState(false);
  const changeFormCertificat = () => {
    setFormcertificat(!formcertificat);
  };

  const [formcertificatsupp, setFormcertificatsupp] = useState(false);
  const changeFormCertificatsupp = () => {
    setFormcertificatsupp(!formcertificatsupp);
  };

  const [formcertificatMod, setFormcertificatMod] = useState(false);
  const changeFormCertificatMod = () => {
    setFormcertificatMod(!formcertificatMod);
  };
  const remplirCertificat = () => {
    setLoading(true);
    const fetchCertaficats = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const PatientId = JSON.parse(localStorage.getItem("patient")).id;

        const response = await fetchCertaficat(PatientId);

        setCertificats(response);
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
    fetchCertaficats();
  };
  const [id, setId] = useState();
  useEffect(() => {
    remplirCertificat();
  }, []);

  const CabinetId = useCabinetId();
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredCertificat = certificats.filter((con) =>
    con.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Certificat</h2>
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
                placeholder="Rechercher un certificat"
              />
            </div>

            <div className="nouveau">
              <button onClick={changeFormCertificat}>
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
                  <th>type</th>
                  <th>date debut</th>
                  <th>Nb jours/semaines</th>
                  <th colspan="3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCertificat &&
                  filteredCertificat.map((items) => (
                    <tr>
                      <td style={{ textAlign: "left" }}>{items?.type}</td>
                      <td style={{ textAlign: "center" }}>{items.dateDub}</td>
                      <td style={{ textAlign: "center" }}>
                        {items?.nombre} {items?.typeTemps}
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            changeFormCertificatsupp();
                            setId(items.id);
                          }}
                        >
                          <FontAwesomeIcon className="supp" icon={faTrash} />
                        </button>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setCertificat(items);
                            changeFormCertificatMod();
                          }}
                        >
                          <FontAwesomeIcon
                            className="modifier"
                            icon={faPencilAlt}
                          />
                        </button>
                      </td>
                      <td>
                        {" "}
                        <ImprimerCertificat
                          cert={items}
                          user={Login()?.user}
                        />{" "}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <AjouterCertificat
        formcertificat={formcertificat}
        changeFormCertificat={changeFormCertificat}
        remplirCertificat={remplirCertificat}
        id={id}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <SuppCertificat
        formcertificatsupp={formcertificatsupp}
        changeFormCertificatsupp={changeFormCertificatsupp}
        remplirCertificat={remplirCertificat}
        id={id}
      />
      <ModifierCertificat
        formcertificatMod={formcertificatMod}
        changeFormCertificatMod={changeFormCertificatMod}
        remplirCertificat={remplirCertificat}
        certificat={certificat}
        setCertificat={setCertificat}
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
export default Certificat;
