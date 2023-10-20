import React, { useEffect, useState } from "react";
import "./dashbordcss/confurmerPaiment.css";
import { useCabinetId } from "../_helpers/Tokin";
import { fetchPaiementIMpaye, updatePaiementpaye } from "../../utils/apis2";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Login } from "../_helpers/service";
import Valider from "./patient/valider";
import { docGenerator } from "../../utils/printerService";
const Paiement = () => {
  const [paiements, setPaiements] = useState([]);
  const CabinetId = useCabinetId();
  const [payerr, setPayerr] = useState(false);
  const chengerPayer = () => {
    setPayerr(!payerr);
  };
  const [paiement, setPaiement] = useState({
    prix: "",
    date: "",
    methode: "",
    status: "impaye",
    description: "",
    PatientId: "",
  });
  const [loading, setLoading] = useState(false);
  const remplirPaiement = () => {
    setLoading(true);
    const fetchPaimentIMpayes = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const resp = await fetchPaiementIMpaye(CabinetId);
        setPaiements(resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("error de paiement impayer");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchPaimentIMpayes();
  };

  const sbmitPaiement = (event) => {
    event.preventDefault();
  };
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const payer = async (paiement) => {
    setLoading(true);
    try {
      if (!CabinetId) {
        return;
      }
      const resp = await updatePaiementpaye({ ...paiement, status: "paye" });
      remplirPaiement();
      chengerPayer();
      setTimeout(() => {
        setLoading(false);
        changeValidForm();
      }, 1000);
    } catch (err) {
      console.error("error de payer");
    }
  };

  useEffect(() => {
    remplirPaiement();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPaiement = paiements.filter((patient) =>
    `${patient.Patient.nom} ${patient.Patient.prenom} ${patient.dateRDV}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
  const transferPaiements = (paiements) => {
    if (!paiements || !Array.isArray(paiements)) {
      console.error("Invalid paiements object:", paiements);
      return null; // or however you want to handle this case
    }

    const newPaiements = paiements.map((payment) => {
      if (!payment.Patient) {
        console.error("Invalid Patient object:", payment);
        return null; // or however you want to handle this case
      }

      return {
        ...payment,
        nom: payment.Patient.nom,
        prenom: payment.Patient.prenom,
      };
    });

    return newPaiements;
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
              <h2>Paiement</h2>
            </center>
          </div>
        </div>
      </div>
      <div className="confurmerPaiement">
        <div className="mobileInf">
          {" "}
          <div className="flex justify-between m-2">
            <div className="rechercher ">
              <input
                className=" "
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher un patient"
              />
            </div>
            <div
              onClick={() =>
                docGenerator(
                  "List des paiements",
                  ["nom", "prenom", "methode", "date", "status", "prix"],
                  transferPaiements(filteredPaiement)
                )
              }
              className="text-center rounded-md  flex  items-center p-2 bg-blue-400 font-semibold text-white"
            >
              imprimer
            </div>
          </div>
          <div className="table">
            <table>
              <thead>
                <tr>
                  {" "}
                  <th>nom & prenom </th>
                  <th className="mobileCabMed">telephone</th>
                  <th>methode</th>
                  <th>date</th>
                  <th>status</th>
                  <th>montant</th>
                  <th className="mobileCabMed">description</th>
                  <th colSpan="1">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaiement &&
                  filteredPaiement.map((items) => (
                    <tr key={items.id}>
                      <td style={{ textAlign: "center" }}>
                        {items?.Patient?.nom} {items?.Patient?.prenom}
                      </td>

                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items?.Patient?.tel}
                      </td>

                      <td style={{ textAlign: "center" }}>{items?.methode}</td>
                      <td style={{ textAlign: "center" }}>{items?.date}</td>
                      <td style={{ textAlign: "center" }}>{items?.status}</td>
                      <td style={{ textAlign: "center" }}>{items?.prix} DH</td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items?.description}
                      </td>
                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setPaiement(items);
                            chengerPayer();
                          }}
                        >
                          <FontAwesomeIcon
                            className="payer"
                            icon={faCreditCard}
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
      {payerr && (
        <div id="popup" class="payer-popup">
          <div class="payer-popup-content">
            <div className="h3">
              <center>
                <h3>Payer</h3>
              </center>
            </div>
            <span className="payer-close" onClick={chengerPayer}>
              &times;
            </span>
            <div className="pay">
              <form action="" onSubmit={(event) => sbmitPaiement(event)}>
                <label>Date :</label>
                <input
                  type="date"
                  onChange={(event) =>
                    setPaiement({
                      ...paiement,
                      date: event.target.value,
                    })
                  }
                  value={paiement.date}
                />
                <label>Methode :</label>
                <select
                  onChange={(event) =>
                    setPaiement({
                      ...paiement,
                      methode: event.target.value,
                    })
                  }
                  value={paiement.methode}
                >
                  <option value="">sélectionner methode de paiement</option>
                  <option value="especes">Esespeces</option>
                  <option value="carte_bancaire">Carte Bancaire</option>
                </select>

                <div className="div-button">
                  <button
                    onClick={() => {
                      payer(paiement);
                    }}
                    className="btn-v"
                    type="submit"
                  >
                    Valider Paiement
                  </button>
                  <button
                    onClick={chengerPayer}
                    className="btn-n"
                    type="submit"
                  >
                    Annule
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
        loading={loading}
      />
    </>
  );
};

export default Paiement;
