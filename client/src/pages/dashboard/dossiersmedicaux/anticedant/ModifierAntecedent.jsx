import React, { useState, useEffect } from "react";

import { modifierAntecedent } from "../../../../utils/apis3";
import { useCabinetId } from "../../../_helpers/Tokin";

const ModifierAntecedent = ({
  formantecedentmodifier,
  changeFormAntecedentmodifier,
  remplirAntecedent,
  antecedent,
  setAntecedent,
  changeValidForm,
  setLoading,
}) => {
  const CabinetId = useCabinetId();

  const sbmitantecedentmodifier = (event) => {
    setLoading(false);
    event.preventDefault();
    const modifierantecedent = async () => {
      try {
        if (!CabinetId) {
          return;
        }
        const response = await modifierAntecedent(antecedent);
        changeFormAntecedentmodifier();
        remplirAntecedent();
        setAntecedent({
          id: null,
          nom: null,
          date: null,
          traitement: null,
          desc: null,
          PatientId: null,
        });
        setTimeout(() => {
          setLoading(false);
          changeValidForm();
        }, 1000);
      } catch (error) {
        console.error("error creation de examenphysique", error);
      }
    };
    modifierantecedent();
  };

  return (
    <>
      {formantecedentmodifier && (
        <div className="ajouterconsultation">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Antecedent </h3>
                </center>
              </div>
              <span className="close" onClick={changeFormAntecedentmodifier}>
                &times;
              </span>
              <div className="consult">
                <form
                  action=""
                  onSubmit={(event) => sbmitantecedentmodifier(event)}
                >
                  <label>Nom :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        nom: event.target.value,
                      })
                    }
                    value={antecedent.nom}
                  />
                  <label>Date :</label>
                  <input
                    type="date"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        date: event.target.value,
                      })
                    }
                    value={antecedent.date}
                  />
                  <label htmlFor="">Traitement :</label>
                  <input
                    type="text"
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        traitement: event.target.value,
                      })
                    }
                    value={antecedent.traitement}
                  />

                  <label htmlFor="">Description :</label>
                  <textarea
                    onChange={(event) =>
                      setAntecedent({
                        ...antecedent,
                        desc: event.target.value,
                      })
                    }
                    value={antecedent.desc}
                    placeholder="Ajoutez des description ici "
                  ></textarea>
                  <div className="div-button">
                    <button className="btn-v" type="submit">
                      valider
                    </button>
                    <button
                      onClick={changeFormAntecedentmodifier}
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
export default ModifierAntecedent;
