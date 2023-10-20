import React, { useEffect, useState } from "react";
import "../../dashbordcss/ajouterPaiemnt.css";
import { createVisites, updatePaiement } from "../../../../utils/apis2";
import { useCabinetId } from "../../../_helpers/Tokin";
const AjouterPaiement = ({
  fromPaiementMod,
  changeFormPaiementMod,
  remplirPaiement,
  services,
  paiement,
  setPaiement,
  visite,
  setVisite,
  changeValidForm,
  setLoading,
}) => {
  // "impaye",

  function handleServiceCheck(id, prix, checked) {
    if (checked) {
      setVisite([
        ...visite,
        { ServiceId: id, prix: prix, PaiementId: paiement.id },
      ]);
    } else {
      setVisite(visite.filter((service) => service.ServiceId !== id));
    }
  }

  const modifierPaiement = async () => {
    setLoading(true);
    try {
      const resp = await updatePaiement({
        ...paiement,
        prix: visite.reduce((acc, service) => acc + service.prix, 0),
      });
      if (resp) {
        const response = await createVisites(visite);
      }
      remplirPaiement();
      changeFormPaiementMod();
      setTimeout(() => {
        setLoading(true);
        changeValidForm();
      }, 1000);
    } catch (err) {
      console.error("error de modification paiemtn !!", err);
    }
  };

  const CabinetId = useCabinetId();

  const sbmitPaiement = (event) => {
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    modifierPaiement();
    console.log("dddd", visite);
  };

  return (
    <>
      {fromPaiementMod && (
        <div className="paiement">
          <div id="popup" class="paiemnt-popup">
            <div class="paiemnt-popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Paiement</h3>
                </center>
              </div>
              <span className="sup-close" onClick={changeFormPaiementMod}>
                &times;
              </span>
              <div className="paya">
                <form action="" onSubmit={(event) => sbmitPaiement(event)}>
                  <label>
                    Cocher les services : <span className="obligatoir">**</span>
                  </label>

                  <div className="service">
                    {services.map((item) => (
                      <div key={item.id}>
                        <div className="lable-input">
                          {" "}
                          <label>{item.nom}:</label>
                          <input
                            type="checkbox"
                            value={item.id}
                            checked={visite.some(
                              (service) => service.ServiceId === item.id
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
                    value={paiement.methode}
                    onChange={(event) =>
                      setPaiement({
                        ...paiement,
                        methode: event.target.value,
                      })
                    }
                  >
                    {" "}
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
                      valider
                    </button>
                    <button
                      onClick={changeFormPaiementMod}
                      className="btn-n"
                      type="submit"
                    >
                      annule
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
