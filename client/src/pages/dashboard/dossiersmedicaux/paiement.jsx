import React, { useEffect, useState } from "react";
import {
  faTrash,
  faInfoCircle,
  faPencilAlt,
  faMoneyCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCabinetId } from "../../_helpers/Tokin";
import {
  fetchPaiement,
  fetchService,
  updatePaiementpaye,
} from "../../../utils/apis2";
import AjouterPaiement from "./paiement/AjouterPaiement";
import Modifierpaiement from "./paiement/Modifierpaiement";
import SuppPaiement from "./paiement/SuppPaiement";
import DeatilPaiment from "./paiement/DetailPaiement";
import Valider from "../patient/valider";
import { docGenerator } from "../../../utils/printerService";
const Paiement = () => {
  const [paiements, setPaiements] = useState([]);
  const [selectedPaiement, setSelectedPaiement] = useState([]);
  const [paiement, setPaiement] = useState({});
  const [fromPaiement, setFromPaiment] = useState(false);
  const changeFormPaiement = () => {
    setFromPaiment(!fromPaiement);
  };
  const [fromPaiementMod, setFromPaimentMod] = useState(false);
  const changeFormPaiementMod = () => {
    setFromPaimentMod(!fromPaiementMod);
  };
  const [fromPaiementSupp, setFromPaimentSupp] = useState(false);
  const changeFormPaiementSupp = () => {
    setFromPaimentSupp(!fromPaiementSupp);
  };
  const [fromPaiementDetail, setFromPaimentDetail] = useState(false);
  const changeFormPaiementDetail = () => {
    setFromPaimentDetail(!fromPaiementDetail);
  };
  const [visite, setVisite] = useState([]);

  const TableVisite = (services, id) => {
    const visites = services.map((el) => {
      return { prix: el.prix, ServiceId: el.id, PaiementId: id };
    });

    setVisite(visites);
    //  console.log("visite", visite);
  };

  const CabinetId = useCabinetId();
  const remplirPaiement = () => {
    setLoading(true);
    const fetchPaiements = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const resp = await fetchPaiement(
          JSON.parse(localStorage.getItem("patient")).id
        );
        setPaiements(resp);
        // console.log("paa", resp);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (err) {
        console.error("paiement", err);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      }
    };
    fetchPaiements();
  };

  const [services, setServices] = useState([]);
  const fetchServices = async () => {
    setLoading(true);
    try {
      const resp = await fetchService(CabinetId);
      setServices(resp);
      //console.log("service :", services);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (err) {
      console.error("error de service", err);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };
  const [payerr, setPayerr] = useState(false);
  const chengerPayer = () => {
    setPayerr(!payerr);
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
  const sbmitPaiement = (e) => {
    e.preventDefault();
  };
  const [loading, setLoading] = useState(false);
  const [validForm, setValidForm] = useState(false);
  const changeValidForm = () => {
    setValidForm(!validForm);
  };

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPaiement = paiements.filter((pa) =>
    `${pa.id}`.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <div className="h3 dosserMed">
        <center>
          <h2>Paiement</h2>
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
                  changeFormPaiement();
                  fetchServices();
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
                  <th>Référence</th>
                  <th>Montant</th>
                  <th className="mobileCabMed">Methode</th>
                  <th className="mobileCabMed">Date</th>
                  <th>status</th>
                  <th colspan="4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPaiement &&
                  filteredPaiement.map((items) => (
                    <tr>
                      <td style={{ textAlign: "center" }}>{items.id}</td>
                      <td style={{ textAlign: "center" }}>{items.prix} DH</td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items.methode}
                      </td>
                      <td
                        className="mobileCabMed"
                        style={{ textAlign: "center" }}
                      >
                        {items.date}
                      </td>
                      <td style={{ textAlign: "center" }}>{items.status}</td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            changeFormPaiementSupp();
                            setPaiement(items);
                          }}
                        >
                          <FontAwesomeIcon className="supp" icon={faTrash} />
                        </button>
                      </td>

                      <td style={{ textAlign: "center" }}>
                        <button
                          onClick={() => {
                            setPaiement(items);
                            fetchServices();
                            TableVisite(items.Services, items.id);
                            changeFormPaiementMod();
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
                            setServices(items.Services);
                            changeFormPaiementDetail();
                          }}
                        >
                          <FontAwesomeIcon
                            className="detail"
                            icon={faInfoCircle}
                          />
                        </button>
                      </td>
                      <td
                        style={{
                          textAlign: "center",
                          color: "rgb(147, 147, 240)",
                          fontSize: "20px",
                        }}
                      >
                        <button
                          onClick={() => {
                            chengerPayer();
                            setPaiement(items);
                          }}
                        >
                          {/**faSprayCanSparkles */}
                          <FontAwesomeIcon
                            className="argent"
                            icon={faMoneyCheck}
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
      <AjouterPaiement
        changeFormPaiement={changeFormPaiement}
        fromPaiement={fromPaiement}
        remplirPaiement={remplirPaiement}
        services={services}
        changeValidForm={changeValidForm}
        setLoading={setLoading}
      />
      <Modifierpaiement
        fromPaiementMod={fromPaiementMod}
        changeFormPaiementMod={changeFormPaiementMod}
        remplirPaiement={remplirPaiement}
        services={services}
        paiement={paiement}
        setPaiement={setPaiement}
        visite={visite}
        changeValidForm={changeValidForm}
        setVisite={setVisite}
        setLoading={setLoading}
      />
      <SuppPaiement
        changeFormPaiementSupp={changeFormPaiementSupp}
        fromPaiementSupp={fromPaiementSupp}
        remplirPaiement={remplirPaiement}
        paiement={paiement}
      />
      <DeatilPaiment
        services={services}
        changeFormPaiementDetail={changeFormPaiementDetail}
        fromPaiementDetail={fromPaiementDetail}
        setLoading={setLoading}
      />
      <Valider
        validForm={validForm}
        changeValidForm={changeValidForm}
        setValidForm={setValidForm}
        loading={loading}
      />
      {payerr && (
        <div id="popup" class="payer-popup">
          <div class="payer-popup-content">
            <span className="payer-close" onClick={chengerPayer}>
              &times;
            </span>
            <div className="h3">
              <center>
                <h3>Payer</h3>
              </center>
            </div>
            <div className="paya">
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
    </>
  );
};
export default Paiement;
