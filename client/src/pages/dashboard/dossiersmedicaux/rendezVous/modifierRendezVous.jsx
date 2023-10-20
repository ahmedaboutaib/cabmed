import React, { useState } from "react";

import "../../dashbordcss/patientcss.css";
import { useCabinetId } from "../../../_helpers/Tokin";
import { ModiferRendezVous } from "../../../../utils/apis";

const ModifierRendezVous = ({
  formRv,
  changeFormRv,
  rendezvoues,
  setRendvous,
  remplirRDV,
  changeValidForm,
  setLoading,
}) => {
  /// pour ajouter rendez vouez
  const CabinetId = useCabinetId();

  // fonction pour arreter submite et charger a la BD
  const onEnregestrerRDV = (event) => {
    setLoading(true);
    event.preventDefault();
    if (!CabinetId) {
      return;
    }
    const ModifierRendez = async () => {
      try {
        const data = await ModiferRendezVous(rendezvoues);
        changeFormRv();
        remplirRDV();
        setTimeout(() => {
          changeValidForm();
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error loading patients:", error);
      }
    };
    ModifierRendez();
  };

  // ----
  return (
    <>
      {formRv && (
        <div className="ajouterrendezvous">
          <div id="popup" class="popup">
            <div class="popup-content">
              <div className="h3">
                <center>
                  <h3>Modifier Rendez Vous</h3>
                </center>
              </div>
              <span
                className="close"
                onClick={() => {
                  changeFormRv();
                }}
              >
                &times;
              </span>
              <div className="ajouter-patient">
                <form onSubmit={(event) => onEnregestrerRDV(event)}>
                  <div className="">
                    <label for="date">
                      Date : <span className="obligatoir">**</span>
                    </label>
                    <input
                      id="date"
                      type="date"
                      onChange={(event) =>
                        setRendvous({
                          ...rendezvoues,
                          dateRDV: event.target.value,
                        })
                      }
                      placeholder="jj/mm/aaaa"
                      value={rendezvoues.dateRDV}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="heure">
                      Heure : <span className="obligatoir">**</span>
                    </label>
                    <input
                      id="heure"
                      type="time"
                      placeholder="hh:mm"
                      onChange={(event) => {
                        setRendvous({
                          ...rendezvoues,
                          heureRDV: event.target.value,
                        });
                      }}
                      value={rendezvoues.heureRDV}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="motif">Motif :</label>
                    <input
                      id="motif"
                      type="text"
                      onChange={(event) => {
                        setRendvous({
                          ...rendezvoues,
                          motif: event.target.value,
                        });
                      }}
                      value={rendezvoues.motif}
                    />
                  </div>
                  <div className="mb-4">
                    <label for="type">Type :</label>
                    <select
                      value={rendezvoues.type}
                      onChange={(event) => {
                        setRendvous({
                          ...rendezvoues,
                          type: event.target.value,
                        });
                      }}
                    >
                      <option value="">
                        Selectionner un type de renez vous{" "}
                      </option>
                      <option value="consultaion">Consultaion</option>
                      <option value="contrôle">contrôle</option>
                      <option value="contre visite">contre visite</option>
                    </select>
                  </div>

                  <div className="mb-4">
                    <label for="details">Détails :</label>
                    <textarea
                      id="details"
                      onChange={(event) =>
                        setRendvous({
                          ...rendezvoues,
                          details: event.target.value,
                        })
                      }
                      value={rendezvoues.details}
                      placeholder="Ajoutez des détails ici "
                    ></textarea>
                  </div>
                  <div className="div-button">
                    <button
                      disabled={
                        !rendezvoues.PatientId ||
                        !rendezvoues.dateRDV ||
                        !rendezvoues.heureRDV
                          ? true
                          : false
                      }
                      className="btn-v"
                      type="submit"
                    >
                      {" "}
                      Valider
                    </button>

                    <button
                      className="btn-a"
                      onClick={() => {
                        changeFormRv();
                      }}
                      type="button"
                    >
                      Annuler
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
export default ModifierRendezVous;
