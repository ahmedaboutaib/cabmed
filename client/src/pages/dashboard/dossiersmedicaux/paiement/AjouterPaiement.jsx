import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterPaiemnt.css";
import { createPaiement, createVisites } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
const AjouterPaiement = ({
  fromPaiement,
  changeFormPaiement,
  remplirPaiement,
  services,
  changeValidForm,
  setLoading,
}) => {
  // "impaye",
  const [paiement, setPaiement] = useState({
    prix: "",
    date: new Date(),
    methode: "",
    status: "impaye",
    description: "",
    PatientId: "",
  });
  const TableVisite = (id) => {
    const visites = visite.map((el) => {
      return { ServiceId: el.id, PaiementId: id };
    });
    return visites;
  };
  const createAllVisiter = async (vist) => {
    try {
      const response = await createVisites(vist);
      setVisite([]);
    } catch (err) {
      console.error("error de visite", err);
    }
  };

  const [visite, setVisite] = useState([]);
  function handleServiceCheck(id, prix, checked) {
    if (checked) {
      setVisite([...visite, { id: id, prix: prix }]);
    } else {
      setVisite(visite.filter((service) => service.id !== id));
    }
  }

  const CabinetId = useCabinetId();
  const createPaiements = async () => {
    setLoading(true);
    try {
      const paim = {
        ...paiement,
        PatientId: JSON.parse(localStorage.getItem("patient")).id,
        prix: visite.reduce((acc, service) => acc + service.prix, 0),
      };

      const resp = await createPaiement(paim);
      setPaiement({
        prix: "",
        date: new Date(),
        methode: "",
        status: "impaye",
        description: "",
        PatientId: "",
      });
      createAllVisiter(TableVisite(resp.id));
      remplirPaiement();
      changeFormPaiement();
      setTimeout(() => {
        setLoading(false);
        changeValidForm();
      }, 1000);
      //console.log("bbbbbbb :", TableVisite(resp.id));
    } catch (err) {
      console.error("erro de creation de paiement !", err);
    }
  };
  const sbmitPaiement = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    createPaiements();
  };

  return (
    <>
      {fromPaiement && (
        <div className="paiement">
          <div id="popup" class="paiemnt-popup">
            <div class="paiemnt-popup-content">
              <div className="h3">
                <center>
                  <h3>Ajouter Paiement</h3>
                </center>
              </div>
              <span className="sup-close" onClick={changeFormPaiement}>
                &times;
              </span>
              <div className="paya">
                <form action="" onSubmit={(event) => sbmitPaiement(event)}>
                  <label>
                    Cocher les services :<span className="obligatoir">**</span>
                  </label>

                  <div className="service">
                    {services.map((item) => (
                      <div key={item.id}>
                        <div className="lable-input">
                          {" "}
                          <label>
                            {item.nom} {"  "}:
                          </label>
                          <input
                            type="checkbox"
                            value={item.id}
                            checked={visite.some(
                              (service) => service.id === item.id
                            )}
                            onChange={(e) => {
                              handleServiceCheck(
                                item.id,
                                item.prix,
                                e.target.checked
                              );
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
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
                  >
                    <option value="">sélectionner methode de paiement</option>
                    <option value="especes">Esespeces</option>
                    <option value="carte_bancaire">Carte Bancaire</option>
                  </select>

                  <label htmlFor="">Description :</label>
                  <textarea
                    onChange={(event) =>
                      setPaiement({
                        ...paiement,
                        description: event.target.value,
                      })
                    }
                    value={paiement.description}
                    placeholder="Ajoutez des description ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      Valider
                    </button>
                    <button
                      onClick={changeFormPaiement}
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
        </div>
      )}
    </>
  );
};

export default AjouterPaiement;
/**
 *  {" "}
                  <div className="service">
                    {services &&
                      services.map((items) => (
                        <>
                          <label>{items.nom}:</label>
                          <input onChange={(e)=>{}} type="checkbox" value={items.id} />
                        </>
                      ))}
              
                  </div>
 */
